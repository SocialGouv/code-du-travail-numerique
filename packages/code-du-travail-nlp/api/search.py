from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin


def add_search(app, ss):
    @app.route('/api/search', methods=['GET'])
    @cross_origin()
    def search():
        # maybe add a default to get (risky because of no exclude sources)
        query = request.args.get('q')
        exclude_sources = request.args.get("excludeSources")
        size = request.args.get("size")
        results = ss.predict_slugs(query, exclude_sources, size)
        return jsonify(results)
