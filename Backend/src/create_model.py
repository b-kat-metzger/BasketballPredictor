import pandas as pd
import numpy as np
import xgboost as xgb
import time
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split

def build_model():
    games_df = pd.read_csv('final_gamelog_2024.csv')
    features = ['HOME_TEAM','AWAY_TEAM','HOME_W_PCT','HOME_FGM_RANK','HOME_FG3M_RANK','HOME_PLUS_MINUS_RANK',
                'HOME_REB_RANK','HOME_AST_RANK','HOME_TOV_RANK','HOME_STL_RANK','HOME_BLK_RANK','HOME_PF_RANK',
                'HOME_PTS_RANK','HOME_DivisionRank','HOME_HOME_WINS','HOME_ROAD_WINS','HOME_CurrentHomeStreak',
                'HOME_CurrentRoadStreak','HOME_CurrentStreak','HOME_HighValueInjured','AWAY_W_PCT','AWAY_FGM_RANK',
                'AWAY_FG3M_RANK','AWAY_PLUS_MINUS_RANK','AWAY_REB_RANK','AWAY_AST_RANK','AWAY_TOV_RANK','AWAY_STL_RANK',
                'AWAY_BLK_RANK','AWAY_PF_RANK','AWAY_PTS_RANK','AWAY_DivisionRank','AWAY_HOME_WINS','AWAY_ROAD_WINS',
                'AWAY_CurrentHomeStreak','AWAY_CurrentRoadStreak','AWAY_CurrentStreak','AWAY_HighValueInjured'
                ]
    
    X,y = games_df[features],games_df['HOME_WIN']
    cats = X.select_dtypes(exclude=np.number).columns.tolist()
    for col in cats: #converting string-type features into category type so that the rows can be converted into DMatrices
        X[col] = X[col].astype('category')
    X_train,X_test,y_train,y_test = train_test_split(X,y,random_state=11)
    dtrain_reg = xgb.DMatrix(X_train,y_train,enable_categorical=True)
    dtest_reg = xgb.DMatrix(X_test,y_test,enable_categorical=True)

    params = {
        "objective": "binary:logistic",
        "eval_metric":"logloss",
        "tree_method":"hist",
        "eta":0.005,
        "max_depth":6,
        "subsample":0.7,
        "colsample_bytree":0.6,
        "lambda":1,
        "gamma":1,
        "alpha":1,
        "seed":42
        }
    evals = [(dtrain_reg,'train'),(dtest_reg,'validation')]
    model = xgb.train(
        params=params,
        dtrain=dtrain_reg,
        num_boost_round=1000,
        evals=evals,
        early_stopping_rounds=75,
        verbose_eval=25
    )
    preds = model.predict(dtest_reg)

    rmse = mean_absolute_error(y_test,preds)
    print(f"RMSE: {rmse:2f}")
    # print(f'Model score: {model.get_score()}')

    model.save_model('xgboost_model.json')

if __name__=='__main__':
    start_time = time.time()
    build_model()
    end_time = time.time()
    elapsed_time = end_time-start_time
    print(f"XGBoost model trained in {elapsed_time:.2f} seconds; exported to 'xgboost_model.json'")
