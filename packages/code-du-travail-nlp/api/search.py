from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
import threading

from .sem_search import SemSearch


def load_in_background(is_ready, content_path, stops_path):
    ss = SemSearch(content_path, stops_path)
    is_ready.data['search'] = ss
    is_ready.ready['search'] = True


def add_search(app, is_ready, content_path, stops_path):

    thread = threading.Thread(target=load_in_background, args=(is_ready, content_path, stops_path))
    thread.start()

    @app.route('/api/search', methods=['GET'])
    @cross_origin()
    def search():
        is_ready.check_status('search')
        ss = is_ready.get('search')

        # maybe add a default to get (risky because of no exclude sources)
        query = request.args.get('q')
        exclude_sources = request.args.get("excludeSources")
        size = request.args.get("size")
        results = ss.predict_slugs(query, exclude_sources, size)
        return jsonify(results)
