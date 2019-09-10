from flask import Flask
from api.suggest import add_suggest
from api.search import add_search
from autosuggest import AutoSuggestor
from .sem_search import SemSearch
import os

data_path = os.path.join(
  os.path.dirname(os.path.abspath(__name__)),
  "data"
)
content_path = os.path.join(data_path, 'content.json')
queries_path=os.path.join(data_path, 'data.txt')
stops_path=os.path.join(data_path, 'stops.txt')

def create_app():
  suggester = AutoSuggestor(
    queries_path=queries_path,
    stops_path = stops_path,
    build_precount = False
  )

  ss = SemSearch(content_path, stops_path)

  app = Flask(__name__)
  app.config['JSON_AS_ASCII'] = False

  app.logger.info("Flask app started ")

  @app.route('/')
  def hello():
    return 'suggest api'

  add_suggest(app, suggester)
  add_search(app, ss)

  return app

app = create_app()
