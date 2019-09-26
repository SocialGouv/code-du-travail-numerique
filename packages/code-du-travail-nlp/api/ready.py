from flask import jsonify
from flask_cors import CORS, cross_origin


def add_ready(app, nlp):
    @app.route('/api/ready', methods=['GET'])
    @cross_origin()
    def ready():
        return jsonify({'ready': nlp.is_ready, 'what': nlp.what})
