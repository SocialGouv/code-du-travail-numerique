from flask import request
from flask import jsonify
from flask_cors import cross_origin
import threading

from .sem_search import SemSearch


def load_in_background(nlp, app, stops_path):
    ss = SemSearch(stops_path)
    app.logger.info("🔋 sem_search ready")
    nlp.set("search", ss)


def add_search(app, nlp, stops_path):

    thread = threading.Thread(
        target=load_in_background, args=(nlp, app, stops_path))
    # thread.start()
    nlp.queue("search", thread)

    @app.route("/api/search", methods=["GET", "POST"])
    @cross_origin()
    def search():  # pylint: disable=unused-variable
        sem_search = nlp.get("search", check_ready=True)

        # maybe add a default to get (risky because of no exclude sources)
        query = request.args.get("q", default="")
        text = request.json or ""
        if text:
            results = sem_search.embed_title_content_sample(query, text)
        else:
            results = sem_search.embed_query(query)

        return jsonify(results)
