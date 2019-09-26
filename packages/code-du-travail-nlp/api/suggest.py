from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
import threading

from autosuggest import AutoSuggestor


def load_in_background(nlp, app, queries_path, stops_path):
      suggester = AutoSuggestor(
          queries_path=queries_path,
          stops_path=stops_path,
          build_precount=False
      )
      app.logger.info("💡 suggestion ready")
      nlp.set('suggester', suggester)



def add_suggest(app, nlp, queries_path, stops_path):

  thread = threading.Thread(target=load_in_background, args=(nlp, app, queries_path, stops_path))
  nlp.queue('suggester', thread)

  @app.route('/api/suggest', methods=['GET'])
  @cross_origin()
  def suggest():
    suggester = nlp.get('suggester', check_ready=True)
    input = request.args.get('q')
    results =  suggester.auto_suggest_fast(input, nb_next_words=12)
    results = [r[0] for r in results]
    return jsonify(results)
