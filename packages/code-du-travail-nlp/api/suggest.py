from flask import request
from flask import jsonify
from api.determinist_autosuggest import autoSuggestor
import os

def add_suggest(app, data_dir):

  link_path = os.path.join(data_dir, "data.txt")
  stops_path = os.path.join(data_dir, "stops.txt")
  auto = autoSuggestor(link_path, stops_path)

  @app.route('/api/suggest', methods=['GET'])
  def suggest():
      input = request.args.get('q')
      results =  auto.auto_suggest_fast(input)
      results = [r[0] for r in results]
      return jsonify(results)
