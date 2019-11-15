
import torch
import logging
import json
import unicodedata
import time
import torch
from fairseq.models.roberta import CamembertModel

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

        with open(stops_path, "r", encoding="utf-8") as f:
            stops = f.read().splitlines()

        # make a hashtable for performance
        strp = self.strip_accents
        self.stops = dict.fromkeys(map(strp, stops), "")

        self.load_graph()
        logger.info("loading graph 🕸")
        end = time.time()
        logger.info("SemSearch ready in {} secondes ✅".format(end-start))

    def load_graph(self):
        self.camembert = torch.hub.load('pytorch/fairseq', 'camembert.v0')

    def predict_query_vector(self, query: str):
        query = self.remove_stops(query)
        tokens = self.camembert.encode(query)
        return self.camembert.extract_features(tokens).squeeze().mean(axis=0).detach().numpy().tolist()

    def compute_vector(self, string):
        text = self.remove_stops(self.strip_accents(string))
        tokens = self.camembert.encode(text)
        return self.camembert.extract_features(tokens).squeeze().mean(axis=0).detach().numpy().tolist()

    def strip_accents(self, s: str):
        return unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode('utf-8')

    def remove_stops(self, string: str):
        tokens = string.split()
        tokens_filtered = [
            t for t in tokens if self.stops.get(t.lower()) is None]
        return " ".join(tokens_filtered)

# _______________ utils to add api route


if __name__ == "__main__":
    ss = SemSearch(stops_path)
