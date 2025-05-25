from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open("players.json","r") as FILE:
    active_players = json.load(FILE)

@app.route('/players/<int:player_id>',methods=['GET'])
def get_player_by_id(player_id):
    player = next((player for player in active_players if player['id']==player_id),None)
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