from flask import request
from flask import jsonify
from flask_cors import cross_origin
import threading

from .sem_search import SemSearch


def load_in_background(nlp, app, content_path, stops_path):
    ss = SemSearch(content_path, stops_path)
    app.logger.info("🔋 sem_search ready")
    nlp.set('search', ss)


def add_search(app, nlp, content_path, stops_path):

    thread = threading.Thread(target=load_in_background, args=(
        nlp, app, content_path, stops_path))
    # thread.start()
    nlp.queue('search', thread)

    @app.route('/api/search', methods=['GET'])
    @cross_origin()
    def search():  # pylint: disable=unused-variable
        ss = nlp.get('search', check_ready=True)

        # maybe add a default to get (risky because of no exclude sources)
        query = request.args.get('q', default="")
        exclude_sources = request.args.get("excludeSources")
        size = request.args.get("size")
        results = ss.predict_slugs(query, exclude_sources, size)
        return jsonify(results)
