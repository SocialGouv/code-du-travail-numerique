import logging
import json
import unicodedata
import time
from typing import List
import tensorflow.compat.v2 as tf
import tensorflow_hub as hub
from tensorflow_text import SentencepieceTokenizer

stops_path = "../data/stops.txt"

cache_path = "~/Downloads"

logger = logging.getLogger("gunicorn.errror")


def add_slash(c):
    c["slug"] = f"/{c['slug']}"
    return c


class SemSearch():

    def __init__(self, stops_path: str):
        logger.info("Init Semsearch.. 🦀")
        start = time.time()

        with open(stops_path, "r") as f:
            stops = f.read().splitlines()

        # make a hashtable for performance
        strp = self.__strip_accents
        self.stops = dict.fromkeys(map(strp, stops), "")

        self.__load_graph()
        logger.info("loading graph 🕸")
        end = time.time()
        logger.info("SemSearch ready in {} secondes ✅".format(end-start))

    def __load_graph(self):
        module = hub.load(
            'https://tfhub.dev/google/universal-sentence-encoder-multilingual-qa/3')
        self.model = module

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

        tf_titles = tf.constant(cleaned_titles)
        tf_contents = tf.constant(contents)

        # map document title as Answer and document content as Context in the QA model
        out = self.model.signatures['response_encoder'](
            input=tf_titles, context=tf_contents)

        return out["outputs"]

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
        tf_query = tf.constant([query])
        result = self.model.signatures['question_encoder'](
            tf_query)['outputs'][0].numpy().tolist()

        return(result)

# _______________ utils to add api route


if __name__ == "__main__":
    ss = SemSearch(stops_path)
