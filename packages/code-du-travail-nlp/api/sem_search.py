import logging
import os
import requests
from requests import RequestException
import json
import unicodedata
import time
from typing import List

stops_path = "../data/stops.txt"

logger = logging.getLogger("gunicorn.errror")

tf_serve_host = os.environ['NLP_HOST']
tf_serve_path = "v1/models/sentqam"


def add_slash(c):
    c["slug"] = f"/{c['slug']}"
    return c


class SemSearch():

    def __init__(self, stops_path: str):
        self.logger = logging.getLogger("gunicorn.error")
        self.logger.info("Init Semsearch.. 🦀")

        with open(stops_path, "r") as f:
            stops = f.read().splitlines()

        # make a hashtable for performance
        strp = self.__strip_accents
        self.stops = dict.fromkeys(map(strp, stops), "")

        self.logger.info("Checking NLP service on " + tf_serve_host)
        try:
            r = requests.get(tf_serve_host+tf_serve_path)

            if r.status_code != requests.codes.ok:
                r.raise_for_status()
            else:
                self.logger.info("NLP service available")
        except RequestException:
            self.logger.error("Cannot access NLP endpoint")

    def __call_nlp(self, payload):
        full_path = tf_serve_host+tf_serve_path+":predict"
        try:
            r = requests.post(full_path,
                              data=json.dumps(payload))
            if r.status_code != requests.codes.ok:
                r.raise_for_status()
            else:
                return json.loads(r.text)['outputs']
        except RequestException:
            self.logger.error("Cannot access NLP endpoint")

    def __strip_accents(self, s: str):
        return unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode('utf-8')

    def __remove_stops(self, s: str):
        tokens = s.split()
        tokens_filtered = [
            t for t in tokens if self.stops.get(t.lower()) is None]
        return " ".join(tokens_filtered)

    def __preprocess_query(self, query: str):
        no_accent = self.__strip_accents(query)
        cleaned = self.__remove_stops(no_accent)
        return cleaned

    def __embed_title_content_tensor(self, titles: List[str], contents: List[str]):
        cleaned_titles = [self.__preprocess_query(s) for s in titles]
        payload = {"signature_name": "response_encoder",
                   "inputs": {"input": cleaned_titles, "context": contents}}
        return self.__call_nlp(payload)

    def embed_title_content_batch(self, titles: List[str], contents: List[str]):
        embedding = self.__embed_title_content_tensor(titles, contents)
        # return embedding as python list
        return embedding.numpy().tolist()

    def embed_title_content_sample(self, title: str, content: str):
        embedding = self.__embed_title_content_tensor([title], [content])
        # return embedding as python list
        return embedding[0].numpy().tolist()

    def embed_query(self, query: str):
        query = self.__preprocess_query(query)
        payload = {"signature_name": "question_encoder", "inputs": [query]}
        return self.__call_nlp(payload)[0]

# _______________ utils to add api route


if __name__ == "__main__":
    ss = SemSearch(stops_path)
