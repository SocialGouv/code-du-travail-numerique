from flask import Flask


from .loader import load_nlp
import os


def create_app():
    app = Flask(__name__)
    app.config['JSON_AS_ASCII'] = False

    app.logger.info("Flask app started ")

    load_nlp(app)

    @app.route('/')
    def hello():
        return 'NLP api'

    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
