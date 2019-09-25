from flask import jsonify
from flask_cors import CORS, cross_origin


def add_search(app, is_ready):
    @app.route('/api/ready', methods=['GET'])
    @cross_origin()
    def ready():
        # maybe add a default to get (risky because of no exclude sources)
        return jsonify({'ready': bool(is_ready), 'what': is_ready.what})