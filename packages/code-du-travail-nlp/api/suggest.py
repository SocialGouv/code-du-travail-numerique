from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
import threading

from autosuggest import AutoSuggestor


def load_in_background(is_ready, queries_path, stops_path):
  suggester = AutoSuggestor(
          queries_path=queries_path,
          stops_path=stops_path,
          build_precount=False
      )
  is_ready.data['suggester'] = suggester
  is_ready.ready['suggester'] = True

def add_suggest(app, is_ready, queries_path, stops_path):

  thread = threading.Thread(target=load_in_background, args=(is_ready, queries_path, stops_path))
  thread.start()

  @app.route('/api/suggest', methods=['GET'])
  @cross_origin()
  def suggest():
    is_ready.check_status('suggester')
    suggester = is_ready.get('suggester')
    print("suggester is ready...")
    input = request.args.get('q')
    results =  suggester.auto_suggest_fast(input, nb_next_words=12)
    results = [r[0] for r in results]
    return jsonify(results)
