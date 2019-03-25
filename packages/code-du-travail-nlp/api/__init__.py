from flask import Flask
from api.suggest import add_suggest
import os

def create_app():
  data_dir = os.path.abspath(os.path.join(__name__, "../data"))
  print("data %s", data_dir)

  app = Flask(__name__)
  app.config['JSON_AS_ASCII'] = False
  app.logger.info("Flask app started ")

  @app.route('/')
  def hello():
      return 'suggest api'

  add_suggest(app, data_dir)

  return app


