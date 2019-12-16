import logging
import json
import unicodedata
import time
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
        strp = self.strip_accents
        self.stops = dict.fromkeys(map(strp, stops), "")

        self.load_graph()
        logger.info("loading graph 🕸")
        end = time.time()
        logger.info("SemSearch ready in {} secondes ✅".format(end-start))

    def load_graph(self):
        #g = tf.Graph()
        #with g.as_default():
        #self.q_variable = tf.Variable("init_q", "q")
        #self.r_variable = tf.placeholder("init_r", "r")
        #self.c_variable = tf.placeholder("init_c", "c")
        #module_url = "https://tfhub.dev/google/universal-sentence-encoder-multilingual-qa/3" #@param ["https://tfhub.dev/google/universal-sentence-encoder-multilingual-qa/3", "https://tfhub.dev/google/universal-sentence-encoder-qa/3"]
        module = hub.load('https://tfhub.dev/google/universal-sentence-encoder-multilingual-qa/3')
        self.model = module

        # self.model = hub.load(module_url)
        #self.question_embeddings = module.signatures['question_encoder'](self.q_variable)

        # module(
        # dict(input=self.q_placeholder),
        # signature="question_encoder", as_dict=True)

        #self.response_embeddings = module.signatures['response_encoder'](input=self.r_variable, context=self.c_variable)
        # self.response_embeddings = module(
        # dict(input=self.r_placeholder,
        #  context=self.c_placeholder),
        # signature="response_encoder", as_dict=True)
        #init_op = tf.group(
        #    [tf.global_variables_initializer(), tf.tables_initializer()])
        #g.finalize()
        #session = tf.Session(graph=g)

        #session.run(init_op)
        #self.session = session

    def predict_query_vector(self, query: str):
        query = self.remove_stops(self.strip_accents(query))
        tf_query = tf.constant([query])

        result = self.model.signatures['question_encoder'](tf_query)['outputs'][0].numpy().tolist()

        return(result)

        # self.question_results = self.session.run(
        # self.question_embeddings, {self.q_placeholder: questions})
        # return self.question_results["outputs"].squeeze().tolist()
    

    def compute_batch(self, strings, contexts):
        cleanStr = [self.remove_stops(self.strip_accents(s)) for s in strings]
            
        tf_title = tf.constant(cleanStr)
        tf_context = tf.constant(contexts)

        out = self.model.signatures['response_encoder'](input=tf_title, context=tf_context)
        return out["outputs"]

        # out = self.session.run(self.response_embeddings, {
                            #    self.r_placeholder: cleanStr, self.c_placeholder: contexts})

    def compute_batch_vectors(self, strings, contexts):
        return self.compute_batch(strings, contexts).numpy().tolist()

    def compute_vector(self, string, context):
        return self.compute_batch([string], [context])[0].numpy().tolist()

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
