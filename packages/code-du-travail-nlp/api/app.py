from flask import Flask, request
from quest2keys.extract_keywords import SpacyExtractor


SPACY_FILTER_SOFT = ["NOUN","PROPN", "VERB", "X","ADJ", "ADV"]
se = SpacyExtractor(SPACY_FILTER_SOFT, "fr_core_news_md")

app = Flask(__name__)

app.logger.info("Flask app started")

@app.route('/')
def hello():
    return 'Hello there !'

@app.route('/api/quest2keys')
def words():
    question = request.args.get('q')
    return  se.filter_sent_spacy(question)

if __name__ == "__main__":
    app.run(debug=True)
