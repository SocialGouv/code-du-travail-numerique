from flask import Flask

from .loader import load_nlp
import os, logging


def create_app():
    app = Flask(__name__)
    app.config['JSON_AS_ASCII'] = False
    gunicorn_logger = logging.getLogger("gunicorn.error")
    app.logger.handlers.extend(gunicorn_logger.handlers)
    app.logger.setLevel(gunicorn_logger.level)

    app.logger.info("🌶  Flask app started !")

    load_nlp(app)

    @app.route('/')
    def hello():
        return 'NLP api'
    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
