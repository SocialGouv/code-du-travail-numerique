import json
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import tf_sentencepiece

from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin

content_path = "./data/content.json"
cache_path = "~/Downloads"

class SemSearch():

    def __init__(self, content_path):
        with open(content_path,  "r") as f:
            content = json.load(f)
        
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
        self.response_results = self.session.run(self.response_embeddings, {self.r_placeholder:self.titles,
                                                                            self.c_placeholder: self.context})
    def predict_slugs(self, query, k = 10):
        questions = [query]
        self.question_results = self.session.run(self.question_embeddings, {self.q_placeholder:questions})
        res = np.inner(self.question_results["outputs"], self.response_results["outputs"])
        hits =  [self._return_hit(self.slugs[a], self.titles[a]) for a in res[0].argsort()[::-1]][:k]
        return {
            "hits":{
                "total" : len(hits),
                "hits":hits
            },
            "facets":[]
        }

    def _return_hit(self, slug, title):
        source, slug_short = slug.split("/")[1:]
        return {
            "_source":{
            "source":source.replace("-", "_").replace("fiche", "fiches"), # need clean source in format fiches_service_public...
            "slug":slug_short,
            "title": title
            },
            "_id":slug.replace("/", "")

        }

def add_search(app, ss):
    @app.route('/api/search', methods=['GET'])
    @cross_origin()
    def search():
      query = request.args.get('q')
      results = ss.predict_slugs(query)
      return jsonify(results)

if __name__ == "__main__":
    ss = SemSearch(content_path)
    print(ss.predict_slugs("congés sans solde"))
    

