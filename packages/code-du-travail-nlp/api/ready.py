from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin


def add_not_ready(app):
    @app.route('/api/ready', methods=['GET'])
    @cross_origin()
    def ready():
        results = "not ready"
        return jsonify(results)

def add_ready(app):
    @app.route('/api/ready', methods=['GET'])
    @cross_origin()
    def not_ready():
        results = "ready"
        return jsonify(results)