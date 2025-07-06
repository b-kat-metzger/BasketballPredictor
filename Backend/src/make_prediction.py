import xgboost as xgb
import pandas as pd
import numpy as np

def make_prediction(home_team, away_team):
    model = xgb.Booster()
    model.load_model('xgboost_model.json')
    team_stats_df = pd.read_csv('team_stats_2024.csv')
    columns = ['HOME_TEAM','AWAY_TEAM','HOME_W_PCT','HOME_FGM_RANK','HOME_FG3M_RANK','HOME_PLUS_MINUS_RANK',
                'HOME_REB_RANK','HOME_AST_RANK','HOME_TOV_RANK','HOME_STL_RANK','HOME_BLK_RANK','HOME_PF_RANK',
                'HOME_PTS_RANK','HOME_DivisionRank','HOME_HOME_WINS','HOME_ROAD_WINS','HOME_CurrentHomeStreak',
                'HOME_CurrentRoadStreak','HOME_CurrentStreak','HOME_HighValueInjured','AWAY_W_PCT','AWAY_FGM_RANK',
                'AWAY_FG3M_RANK','AWAY_PLUS_MINUS_RANK','AWAY_REB_RANK','AWAY_AST_RANK','AWAY_TOV_RANK','AWAY_STL_RANK',
                'AWAY_BLK_RANK','AWAY_PF_RANK','AWAY_PTS_RANK','AWAY_DivisionRank','AWAY_HOME_WINS','AWAY_ROAD_WINS',
                'AWAY_CurrentHomeStreak','AWAY_CurrentRoadStreak','AWAY_CurrentStreak','AWAY_HighValueInjured'
                ]
    home_stats = team_stats_df.loc[team_stats_df['TEAM_ABBREVIATION']==home_team].add_prefix('HOME_')
    away_stats = team_stats_df[team_stats_df['TEAM_ABBREVIATION']==away_team].add_prefix('AWAY_')
    if home_stats.empty or away_stats.empty:
        return {'error':400}
    features = pd.concat([home_stats.reset_index(drop=True),away_stats.reset_index(drop=True)],axis=1)
    features = features.drop(columns=[col for col in features.columns if 'TEAM_ABBREVIATION' in col])
    features['HOME_TEAM'],features['AWAY_TEAM']=home_team,away_team
    for col in features.select_dtypes(exclude=np.number).columns.tolist():
        features[col] = features[col].astype('category')
    matchup = features[columns]
    dmatrix = xgb.DMatrix(matchup, enable_categorical = True)
    prediction = model.predict(dmatrix)[0]
    win_team = home_team if prediction>0.500 else away_team
    if win_team==away_team:
        prediction = 1.00-prediction
    return [{'win':win_team},{'W_PCT':float(prediction)}]