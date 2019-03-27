from flask import Flask
from api.suggest import add_suggest
from autosuggest import AutoSuggestor
import os

data_path = os.path.join(
  os.path.dirname(os.path.abspath(__name__)),
  "data"
)

def create_app():

  suggester = AutoSuggestor(
    queries_path=os.path.join(data_path, 'data.txt'),
    stops_path=os.path.join(data_path, 'stops.txt'),
    build_precount = False
  )

  app = Flask(__name__)
  app.config['JSON_AS_ASCII'] = False
  app.logger.info("Flask app started ")

  @app.route('/')
  def hello():
    return 'suggest api'

  add_suggest(app, suggester)

  return app


