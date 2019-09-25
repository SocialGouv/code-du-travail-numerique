from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin


def add_index(app, ss):
    @app.route('/api/index', methods=['GET'])
    @cross_origin()
    def index():
        # maybe add a default to get (risky because of no exclude sources)
        title = request.args.get('title')
        context = request.args.get("context")
        results = ss.compute_batch_vectors(title, context)
        return jsonify(results)
