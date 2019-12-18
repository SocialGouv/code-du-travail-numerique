from flask import request
from flask import jsonify
from flask_cors import cross_origin


class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


def add_index(app, nlp):

    @app.route('/api/index', methods=['GET', 'POST'])
    @cross_origin()
    def index():  # pylint: disable=unused-variable
        sem_search = nlp.get('search', check_ready=True)

        # maybe add a default to get (risky because of no exclude sources)
        data = request.json
        titles, contents = data.get("titles"), data.get("contexts")
        if not (titles and contents):
            message = """post data should have a titles and contexts keys and arrays of text values:
                        'titles':["hello world", "cdd"]
                        'contexts':["bonjour", "texte sur le cdd"]"""
            raise InvalidUsage(message, status_code=422)

        if len(titles) != len(contents):
            message = "titles and contexts arrays should\
             have the same length\
             found titles lenght: {} and contexts length: {}".format(len(titles), len(contents))
            raise InvalidUsage(message, status_code=422)

        results = sem_search.embed_title_content_batch(titles, contents)
        return jsonify(results)

    @app.errorhandler(InvalidUsage)
    def handle_invalid_usage(error):  # pylint: disable=unused-variable
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response
