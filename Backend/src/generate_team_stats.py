from nba_api.stats.endpoints import leaguedashteamstats, leaguestandingsv3, teamgamelog,boxscoresummaryv2
import pandas as pd
import numpy as np
import json, csv, time


def set_injured_status(season, season_type, teams,players):
    teams = teams.copy()
    teams['HighValueInjured'] = 0
   
    for i, team_row in teams.iterrows():
        team_id = str(team_row['TEAM_ID'])
        inactive_players = set()
        injured_status_flag = 0

        last_3_games = teamgamelog.TeamGameLog(season=season,season_type_all_star=season_type,team_id=team_id).get_data_frames()[0].head(3)
        for game in last_3_games['Game_ID']:
            summary = boxscoresummaryv2.BoxScoreSummaryV2(game)
            inactive_df = summary.inactive_players.get_data_frame()

            for player in inactive_df['PLAYER_ID']:
                player_team = str(players.loc[players['PLAYER_ID']==player, 'TEAM_ID'].squeeze())
                if player_team==team_id:
                    inactive_players.add(player)
            time.sleep(0.6)
        for player in inactive_players:
            try:
                player_per = float(players.loc[players['PLAYER_ID']==player, 'PER'].squeeze())
                player_min = int(players.loc[players['PLAYER_ID']==player, 'MIN'].squeeze())

                if player_per > 25 and player_min > 750:
                    injured_status_flag = 1
                    break
            except (KeyError, ValueError):
                continue
        teams.loc[i,'HighValueInjured'] = injured_status_flag
    return teams

def get_team_stats(season, season_type, teams, players):

    print(f"Fetching team stats for {season}: {season_type}")
    columns = ['TEAM_ID', 'TEAM_ABBREVIATION','TEAM_NAME', 'W_PCT', 'FGM_RANK', 'FG3M_RANK', 'PLUS_MINUS_RANK', 'REB_RANK', 'AST_RANK',
     'TOV_RANK', 'STL_RANK', 'BLK_RANK', 'PF_RANK', 'PTS_RANK','DivisionRank', 'HOME_WINS', 'ROAD_WINS', 'CurrentHomeStreak',
     'CurrentRoadStreak', 'CurrentStreak', 'HighValueInjured']

    boxscore_stats = leaguedashteamstats.LeagueDashTeamStats(season=season, season_type_all_star=season_type, measure_type_detailed_defense='Base').get_data_frames()[0]
    league_standings = leaguestandingsv3.LeagueStandingsV3(season=season, season_type=season_type).get_data_frames()[0]

    league_standings[['HOME_WINS', 'HOME_LOSSES']] = league_standings['HOME'].str.split("-", expand=True).astype(int)
    league_standings['HOME_WIN_PCT'] = round(league_standings['HOME_WINS'] / (league_standings['HOME_WINS'] + league_standings['HOME_LOSSES']),2)

    league_standings[['ROAD_WINS', 'ROAD_LOSSES']] = league_standings['ROAD'].str.split("-", expand=True).astype(int)
    league_standings['ROAD_WIN_PCT'] = round(league_standings['ROAD_WINS'] / (league_standings['ROAD_WINS'] + league_standings['ROAD_LOSSES']),2)
    league_standings['TEAM_ID'] = league_standings['TeamID']
    league_standings = league_standings.drop(columns=['TeamID'])
    team_stats = pd.merge(boxscore_stats, league_standings, on='TEAM_ID')
    injured_standings = set_injured_status(season, season_type,teams,players)
    injured_standings = injured_standings.drop(columns='TEAM_NAME')
    team_stats = pd.merge(team_stats, injured_standings, on='TEAM_ID')

    return team_stats[columns]


if __name__ =='__main__':
    teams = pd.read_csv("teams.csv")
    players = pd.read_csv("player_stats_2024.csv")
    season_year = "2024-25"
    season_type = "Regular Season"
    team_stats = get_team_stats(season_year,season_type,teams,players)
    team_stats.to_csv("team_stats_2024.csv", index=False)