from flask import jsonify
from flask_cors import CORS, cross_origin


def add_search(app, nlp):
    @app.route('/api/ready', methods=['GET'])
    @cross_origin()
    def ready():
        # maybe add a default to get (risky because of no exclude sources)
        return jsonify({'ready': nlp.is_ready, 'what': nlp.what})
