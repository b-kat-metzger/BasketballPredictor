from flask import Flask, request, jsonify
from flask_cors import CORS
import json, re
import pandas as pd

app = Flask(__name__)
CORS(app)

with open("players.json","r") as FILE:
    active_players = json.load(FILE)

player_stats_2024 = pd.read_csv('player_stats_2024.csv')

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

@app.route('/players/<int:player_id>',methods=['GET'])
def get_player_by_id(player_id):
    player = next((player for player in active_players if player['id']==player_id),None)
    if player:
        return jsonify(player)
    else:
        return jsonify({'error':'Player not found'}),404

@app.route('/players/<string:player_name>',methods=['GET'])
def get_player_by_name(player_name):
    # firstLast = re.findall('[A-Z][^A-Z]*',player_name)
    # return jsonify(firstLast)
    firstLast = player_name.split("_")
    full_name = " ".join(firstLast)
    player = next((player for player in active_players if player['full_name']==full_name.strip()),None)
    if player:
        return jsonify(player)
    else:
        return jsonify({'error':'Player not found'}),404

@app.route('/predict',methods=['POST'])
def predict():
    data = request.get_json()
    features = data.get('features',[])
    prediction = sum(int(feature) for feature in features)
    return jsonify({'prediction':prediction})


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)