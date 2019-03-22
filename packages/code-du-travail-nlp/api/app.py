from flask import Flask
from flask import request
from flask import jsonify
from api.determinist_autosuggest import autoSuggestor

import os


data_dir = os.path.abspath(os.path.join(__file__, "../data"))
link_path = os.path.join(data_dir, "data.txt")
stops_path = os.path.join(data_dir, "stops.txt")

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
app.logger.info("Flask app started ")

auto = autoSuggestor(link_path, stops_path)

@app.route('/')
def hello():
    return 'suggest api'

@app.route('/api/suggest', methods=['GET'])
def suggest():
    input = request.args.get('q')
    results =  auto.auto_suggest_fast(input)
    results = [r[0] for r in results]
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
