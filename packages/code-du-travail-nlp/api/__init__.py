from flask import Flask
from api.suggest import add_suggest
from api.search import add_search
from api.index import add_index
from api.ready import add_not_ready, add_ready
from autosuggest import AutoSuggestor
from .semsearch2 import SemSearch
import os

data_path = os.path.join(
    os.path.dirname(os.path.abspath(__name__)),
    "data"
)
content_path = os.path.join(data_path, 'content.json')
queries_path = os.path.join(data_path, 'data.txt')
stops_path = os.path.join(data_path, 'stops.txt')


def create_app():
    app = Flask(__name__)
    
    @app.route('/')
    def hello():
        return 'NLP api'

    add_not_ready(app)

    suggester = AutoSuggestor(
        queries_path=queries_path,
        stops_path=stops_path,
        build_precount=False
    )

    app.config['JSON_AS_ASCII'] = False


    add_suggest(app, suggester)
    add_search(app)
    add_ready(app)
    add_index(app)
    app.logger.info("Flask app started ")
    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
