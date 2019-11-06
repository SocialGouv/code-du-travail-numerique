"""Encode a query string or a document with a dual encoder"""

import logging
import json
import tensorflow as tf
import tensorflow_hub as hub
import tf_sentencepiece
import time

stops_path = "../data/stops.txt"

cache_path = "~/Downloads"

logger = logging.getLogger("gunicorn.errror")


class SemSearch():

    def __init__(self, stops_path: str):
        logger.info("Init Semsearch.. 🦀")
        start = time.time()

        with open(stops_path, "r") as f:
            stops = f.read().splitlines()
            stops.extend(["travail",
                          "travailler",
                          "travaille"])

        # make a hashtable for performance
        strp = self.strip_accents
        self.stops = dict.fromkeys(map(strp, stops), "")

        self.load_graph()
        logger.info("loading graph 🕸")
        end = time.time()
        logger.info("SemSearch ready in {} secondes ✅".format(end-start))

    def load_graph(self):
        g = tf.Graph()
        with g.as_default():
            self.q_placeholder = tf.placeholder(tf.string, shape=[None])
            self.r_placeholder = tf.placeholder(tf.string, shape=[None])
            self.c_placeholder = tf.placeholder(tf.string, shape=[None])
            module = hub.Module(
                "https://tfhub.dev/google/universal-sentence-encoder-multilingual-qa/1")
            self.question_embeddings = module(
                dict(input=self.q_placeholder),
                signature="question_encoder", as_dict=True)

            self.response_embeddings = module(
                dict(input=self.r_placeholder,
                     context=self.c_placeholder),
                signature="response_encoder", as_dict=True)
            init_op = tf.group(
                [tf.global_variables_initializer(), tf.tables_initializer()])
        g.finalize()
        session = tf.Session(graph=g)
        session.run(init_op)
        self.session = session

    def preprocess(self, q: str):
        return self.remove_stops(q.lower())

    def predict_query_vector(self, query: str):
        """preprocess and encode a user query as a fixed length vector"""
        query = self.preprocess(query)
        questions = [query]

        self.question_results = self.session.run(
            self.question_embeddings, {self.q_placeholder: questions})

        return self.question_results["outputs"].squeeze().tolist()

    def compute_vector(self, string: str, context: str):
        cleanStr = self.preprocess(string)
        cleanContext = self.preprocess(context)
        out = self.session.run(self.response_embeddings,
                               {self.r_placeholder: [cleanStr],
                                self.c_placeholder: [cleanContext]})
        return out["outputs"].squeeze().tolist()

    def compute_batch_vectors(self, strings, contexts):
        cleanStr = [self.preprocess(s) for s in strings]
        cleanContext = [self.preprocess(c) for c in contexts]
        out = self.session.run(self.response_embeddings, {
                               self.r_placeholder: cleanStr,
                               self.c_placeholder: cleanContext})
        return out["outputs"].tolist()

    def remove_stops(self, string: str):
        tokens = string.split()
        tokens_filtered = [
            t for t in tokens if self.stops.get(t.lower()) is None]
        return " ".join(tokens_filtered)

# _______________ utils to add api route


if __name__ == "__main__":
    ss = SemSearch(stops_path)
