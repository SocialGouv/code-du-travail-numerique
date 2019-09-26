from flask import jsonify
from flask_cors import cross_origin


def add_ready(app, nlp):
    @app.route('/api/ready', methods=['GET'])
    @cross_origin()
    def ready():  # pylint: disable=unused-variable
        return jsonify({'ready': nlp.is_ready, 'what': nlp.what})
