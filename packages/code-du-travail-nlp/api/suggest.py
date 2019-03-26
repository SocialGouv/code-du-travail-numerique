from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin


def add_suggest(app, suggester):

  @app.route('/api/suggest', methods=['GET'])
  @cross_origin()
  def suggest():
      input = request.args.get('q')
      results =  suggester.auto_suggest_fast(input)
      results = [r[0] for r in results]
      return jsonify(results)
