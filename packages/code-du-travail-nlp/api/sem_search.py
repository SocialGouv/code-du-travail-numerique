import json
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import tf_sentencepiece
import unidecode

from typing import List

content_path = "./data/content.json"
stops_path = "./data/stops.txt"

cache_path = "~/Downloads"

stringvec = List[str]


class SemSearch():

    def __init__(self, content_path: str, stops_path: str):
        with open(content_path, "r") as f:
            content = list(filter(
                lambda row: "text" in row and "/" in row.get("slug"), json.load(f)))[:200]

        with open(stops_path, "r") as f:
            stops = f.read().splitlines()

        # make a hashtable for performance
        self.stops = {self.strip_accents(k): "" for k in stops}

        self.titles = [c["title"] for c in content]
        self.context = [c["text"] for c in content]
        self.slugs = [c["slug"] for c in content]

        self.load_graph()
        self.build_responses()

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

    def build_responses(self):
        responses = [(self.remove_stops(self.strip_accents(t)))
                     for t in self.titles]
        self.response_results = self.session.run(self.response_embeddings, {self.r_placeholder: responses,
                                                                            self.c_placeholder: self.context})

    def predict_slugs(self, query: str, exclude_sources: list = [], k: int = 10):
        query = self.remove_stops(self.strip_accents(query))
        questions = [query]

        self.question_results = self.session.run(
            self.question_embeddings, {self.q_placeholder: questions})
        res = np.inner(
            self.question_results["outputs"], self.response_results["outputs"])
        res_formatted = [{"slug": self.slugs[a],
                          "title": self.titles[a],
                          "score": res[0][a],
                          "source": self.slug2source(self.slugs[a])}
                         for a in res[0].argsort()[::-1]]
        res_filtered = self.filter_sources(res_formatted, exclude_sources)
        hits = [self._return_hit(d["slug"], d["title"], d["score"])
                for d in res_filtered][:k]
        # hits =  [self._return_hit(self.slugs[a], self.titles[a], res[0][a]) for a in res[0].argsort()[::-1]][:k]
        return {
            "hits": {
                "total": len(hits),
                "hits": hits
            },
            "facets": []
        }

    def filter_sources(self, slug_list, exclude_sources):
        if exclude_sources:
            return [s for s in slug_list if s["source"] not in exclude_sources.split(',')]
        else:
            return slug_list

    def slug2source(self, slug):
        source, _ = slug.split("/")[1:]
        return source.replace("-", "_").replace("fiche", "fiches")

    def _return_hit(self, slug: stringvec, title: stringvec, score: float):
        """simple utility to return a dict from slugs, titles and score"""
        source, slug_short = slug.split("/")[1:]
        return {
            "_source": {
                # need clean source in format fiches_service_public...
                "source": source.replace("-", "_").replace("fiche", "fiches"),
                "slug": slug_short,
                "title": title,
                # float necessary to make numpy float json serializable
                "_score_sem": float(score)
            },
            "_id": slug.replace("/", "")

        }

    def strip_accents(self, s: str):
        return unidecode.unidecode(s)

    def remove_stops(self, string: str):
        tokens = string.split()
        tokens_filtered = [
            t for t in tokens if self.stops.get(t.lower()) is None]
        return " ".join(tokens_filtered)

# _______________ utils to add api route


if __name__ == "__main__":
    ss = SemSearch(content_path, content_path)
    print(ss.predict_slugs("congés sans solde"))
