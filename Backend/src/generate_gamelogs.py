from nba_api.stats.endpoints import leaguegamefinder
import pandas as pd
import numpy as np

def get_gamelogs(season,season_type):
    columns = ['GAME_ID','HOME_TEAM','AWAY_TEAM','HOME_WIN']
    print(f"Fetching gamelogs for {season}: {season_type}...")

    gamefinder = leaguegamefinder.LeagueGameFinder(season_nullable=season,season_type_nullable=season_type,league_id_nullable="00")
    games_df = gamefinder.get_data_frames()[0]
    games_df = games_df.drop_duplicates(subset='GAME_ID')
    games_df['IS_HOME'] = games_df['MATCHUP'].str.contains('vs.')

    split_matchup = games_df['MATCHUP'].str.replace('@','vs.').str.split('vs.',expand=True)
    split_matchup = split_matchup.apply(lambda col: col.str.strip())

    games_df['HOME_TEAM'] = split_matchup[0]
    games_df['AWAY_TEAM'] = split_matchup[1]
    away_mask = ~games_df['IS_HOME']
    games_df.loc[away_mask,['HOME_TEAM','AWAY_TEAM']]=games_df.loc[away_mask,['AWAY_TEAM','HOME_TEAM']].values
    games_df['HOME_WIN']=np.where((games_df['IS_HOME'])^(games_df['WL']=='W'),False,True)
    games_df = games_df[columns]
    games_df.to_csv('gamelog_2024.csv',index=False)
    print("Gamelog generated to 'gamelog_2024.csv'")
    return 201


def generate_team_stats():
    try:
        games_df = pd.read_csv('gamelog_2024.csv')
        team_stats_df = pd.read_csv("team_stats_2024.csv")
    except (FileNotFoundError):
        print("Unable to read files: 'gamelog_2024.csv', 'team_stats_2024.csv'. Ensure files are loaded by using generate_player_stats.py and generate_team_stats.py")
        return 404

    team_stats_df.drop(columns=['TEAM_ID','TEAM_NAME'],inplace=True)
    print(f"Generating team statistics for gamelogs...")
    games_with_home = games_df.merge(
        team_stats_df.add_prefix('HOME_'),
        left_on='HOME_TEAM',
        right_on='HOME_TEAM_ABBREVIATION',
        how='left'
    )
    games_with_home_away = games_with_home.merge(
        team_stats_df.add_prefix('AWAY_'),
        left_on='AWAY_TEAM',
        right_on='AWAY_TEAM_ABBREVIATION',
        how='left'
    )
    games_with_home_away.drop(columns=['HOME_TEAM_ABBREVIATION','AWAY_TEAM_ABBREVIATION'],inplace=True)
    games_with_home_away.to_csv("final_gamelog_2024.csv",index=False)
    print(f"Finished generating gamelogs!")
    return 201

if __name__ =='__main__':
    season = "2024-25"
    season_type = "Regular Season"
    get_gamelogs(season,season_type)
    generate_team_stats()
