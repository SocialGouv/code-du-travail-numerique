import json
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import tf_sentencepiece
import unidecode

from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin

from typing import List

content_path = "./data/content.json"
stops_path = "./data/stops.txt"
cache_path = "~/Downloads"

stringvec = List[str]

class SemSearch():

    def __init__(self, content_path: str, stops_path: str):
        with open(content_path,  "r") as f:
            content = json.load(f)

        with open(stops_path,  "r") as f:
            stops = f.read().splitlines()
    
        self.stops = {self.strip_accents(k):"" for k in stops} # make a hashtable for performance

        self.titles = [c["title"] for c in content]
        self.context = [c["text"] for c in content]
        self.slugs = [c["slug"] for c in content]

        self.load_graph()
        self.build_responses()

    def load_graph(self):
        g = tf.Graph()
        with g.as_default():
            self.q_placeholder = tf.placeholder(tf.string, shape = [None])
            self.r_placeholder = tf.placeholder(tf.string, shape = [None])
            self.c_placeholder = tf.placeholder(tf.string, shape = [None])
            module = hub.Module("https://tfhub.dev/google/universal-sentence-encoder-multilingual-qa/1")
            self.question_embeddings = module(
                                        dict(input=self.q_placeholder),
                                        signature="question_encoder", as_dict=True)

            self.response_embeddings = module(
                                        dict(input=self.r_placeholder,
                                            context=self.c_placeholder),
                                        signature="response_encoder", as_dict=True)
            init_op = tf.group([tf.global_variables_initializer(), tf.tables_initializer()])
        g.finalize()
        session = tf.Session(graph=g)
        session.run(init_op)
        self.session = session

    def build_responses(self):
        responses = [(self.remove_stops(self.strip_accents(t))) for t in self.titles]
        self.response_results = self.session.run(self.response_embeddings, {self.r_placeholder:responses,
                                                                            self.c_placeholder: self.context})
    def predict_slugs(self, query: str, k: int = 10):
        query = self.remove_stops(self.strip_accents(query))
        questions = [query]

        self.question_results = self.session.run(self.question_embeddings, {self.q_placeholder:questions})
        res = np.inner(self.question_results["outputs"], self.response_results["outputs"])
        hits =  [self._return_hit(self.slugs[a], self.titles[a], res[0][a]) for a in res[0].argsort()[::-1]][:k]
        return {
            "hits":{
                "total" : len(hits),
                "hits":hits
            },
            "facets":[]
        }

    def _return_hit(self, slug: stringvec, title: stringvec, score: float):
        """simple utility to return a dict from slugs, titles and score"""
        source, slug_short = slug.split("/")[1:]
        return {
            "_source":{
            "source":source.replace("-", "_").replace("fiche", "fiches"), # need clean source in format fiches_service_public...
            "slug":slug_short,
            "title": title,
            "_score_sem": float(score) # float necessary to make numpy float json serializable
            },
            "_id":slug.replace("/", "")

        }

    def strip_accents(self, s: str):
        return unidecode.unidecode(s)

    def remove_stops(self, string: str):
        tokens = string.split()
        tokens_filtered = [t for t in tokens if self.stops.get(t.lower()) is None]
        return " ".join(tokens_filtered)

#_______________ utils to add api route
def add_search(app, ss):
    @app.route('/api/search', methods=['GET'])
    @cross_origin()
    def search():
        query = request.args.get('q')
        results = ss.predict_slugs(query)
        return jsonify(results)

if __name__ == "__main__":
    ss = SemSearch(content_path, content_path)
    print(ss.predict_slugs("congés sans solde"))
    

