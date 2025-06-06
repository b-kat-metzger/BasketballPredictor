from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.static import players
import pandas as pd
import time

def get_player_stats_for_season(player_id, season):
    try:
        stats = playercareerstats.PlayerCareerStats(player_id=player_id)
        df = stats.get_data_frames()[0]
        df = df[df['SEASON_ID']==f"{season}-{str(season+1)[-2::]}"]
        df = df[df['LEAGUE_ID']=='00']
        df['PPG'] = round(df['PTS'] / df['GP'],1)
        df['APG'] = round(df['AST'] / df['GP'],1)
        df['PER'] = round((df['FGM']*85.91
                           +df['STL'] * 53.897 + df['FG3M']*51.757
                           +df['FTM']*46.845 + df['BLK']*39.19
                           +df['OREB']*39.19+df['AST']*34.677+df['DREB']*14.707
                           -df['PF']*17.174-(df['FTA']-df['FTM'])*20.091
                           -(df['FGA']-df['FGM'])*39.190-df['TOV']*53.897) 
                           * (1/df['MIN']),1)
        df['FP'] = round(df['FG3M'] * 3 + df['FGM']*2 + df['FTM']+df['REB']*1.2+df['AST']*1.5+df['BLK']*2+df['STL']*2-df['TOV'])
        return df
    except Exception as e:
        print(f"Failed to get stats for player {player_id}: {e}")
        return pd.DataFrame()
    
def get_all_player_stats(season):
    all_players = players.get_active_players()
    all_stats = []
    print(f"Gathering player stats for season: {season}-{str(season+1)[-2::]}")
    for i, player in enumerate(all_players):
        print(f"[{i+1}/{len(all_players)}] Fetching stats for {player['full_name']} {player['id']}")
        stats_df = get_player_stats_for_season(player['id'], season)
        if not stats_df.empty:
            if len(stats_df)>1:
                stats_df.at[stats_df.index[-1], 'TEAM_ID'] = stats_df.at[stats_df.index[-2], 'TEAM_ID'].item()
                stats_df.at[stats_df.index[-1], 'TEAM_ABBREVIATION'] = stats_df.at[stats_df.index[-2], 'TEAM_ABBREVIATION']
            stats_df['FULL_NAME'] = player['full_name']
            all_stats.append(stats_df)
        time.sleep(0.6)
    final_df = pd.concat(all_stats, ignore_index=True)
    return final_df

if __name__ == '__main__':
    season_year = 2024
    regular_df = get_all_player_stats(season_year)
    regular_df = regular_df.drop_duplicates(subset=['PLAYER_ID', 'SEASON_ID'], keep='last')
    regular_df.to_csv(f"player_stats_{season_year}.csv", index=False)