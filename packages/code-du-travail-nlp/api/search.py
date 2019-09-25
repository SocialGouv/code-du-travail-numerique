from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
import os

from .semsearch2 import SemSearch


def add_search(app):
    data_path = os.path.join(
        os.path.dirname(os.path.abspath(__name__)),
        "data"
    )
    content_path = os.path.join(data_path, 'content.json')
    queries_path = os.path.join(data_path, 'data.txt')
    stops_path = os.path.join(data_path, 'stops.txt')


    ss = SemSearch(content_path, stops_path)

    @app.route('/api/search', methods=['GET'])
    @cross_origin()
    def search():
        # maybe add a default to get (risky because of no exclude sources)
        query = request.args.get('q')
        exclude_sources = request.args.get("excludeSources")
        size = request.args.get("size")
        results = ss.predict_slugs(query)
        return jsonify(results)

    @app.route('/api/index', methods=['GET'])
    @cross_origin()
    def index():
        # maybe add a default to get (risky because of no exclude sources)
        title = request.args.get('title')
        context = request.args.get("context")
        results = ss.compute_batch_vectors(title, context)
        return jsonify(results)