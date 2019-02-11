from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello there !'

@app.route('/api/words')
def words():
    return 'query < %s >' % request.args.get('q', '')

if __name__ == "__main__":
    app.run(debug=True)
