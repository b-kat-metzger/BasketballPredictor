from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import json, re, csv
import pandas as pd
from make_prediction import make_prediction

app = Flask(__name__)
CORS(app)
rateLimiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=['100 per hour']
)

with open("players.json","r") as FILE:
    active_players = json.load(FILE)
with open('teams.json','r') as FILE:
    teams = json.load(FILE)
player_stats_2024 = pd.read_csv('player_stats_2024.csv')


@app.route('/api/teams',methods=['GET'])
def get_teams():
    return teams

@app.route('/api/stats/players', methods=['GET'])
def get_players():
    page = int(request.args.get('page',1))
    card_limit = int(request.args.get('limit',50))
    sort_by = request.args.get('sort', "PPG")
    order = request.args.get('order', "desc")

    player_stats_sorted = player_stats_2024.sort_values(by=sort_by, ascending=(order=="asc")).copy()
    start = (page-1) * card_limit
    end = start + card_limit
    section_player_stats = player_stats_sorted.iloc[start:end]
    return jsonify(section_player_stats.to_dict(orient="records"))


@app.route('/api/predict',methods=['GET'])
@rateLimiter.limit("20 per minute")
def predict():
    home_team = str(request.args.get('home'))
    away_team = str(request.args.get('away'))
    prediction = make_prediction(home_team,away_team)
    return jsonify(prediction)

# ----------------- LEGACY ROUTES ----------------- #
# @app.route('/players/<int:player_id>',methods=['GET'])
# def get_player_by_id(player_id):
#     player = next((player for player in active_players if player['id']==player_id),None)
#     if player:
#         return jsonify(player)
#     else:
#         return jsonify({'error':'Player not found'}),404

# @app.route('/players/<string:player_name>',methods=['GET'])
# def get_player_by_name(player_name):
#     # firstLast = re.findall('[A-Z][^A-Z]*',player_name)
#     # return jsonify(firstLast)
#     firstLast = player_name.split("_")
#     full_name = " ".join(firstLast)
#     player = next((player for player in active_players if player['full_name']==full_name.strip()),None)
#     if player:
#         return jsonify(player)
#     else:
#         return jsonify({'error':'Player not found'}),404



if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)