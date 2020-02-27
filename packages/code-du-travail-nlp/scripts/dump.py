import os
import json
import time
from api.sem_search import SemSearch
import logging

logger = logging.getLogger("nlp")
logger.setLevel(logging.INFO)

data_path = os.path.join(
    os.path.dirname(os.path.abspath(__name__)),
    "data"
)

stops_path = os.path.join(data_path, 'stops.txt')
dump_path = os.getenv("DATA_DUMP", os.path.join(data_path, 'dump.json'))


with open(dump_path, "r") as dump:
    documents = json.load(dump)
    start = time.time()
    logger.info("Init nlp dump 🦄")
    ss = SemSearch(stops_path)
    endSem = time.time()
    logger.info("SemSearch ready in {:.2f}sec⚡️".format(endSem - start))
    documents = [dict(d, text="") if d.get("source") == "themes" else d
                 for d in documents]
    for document in documents:
        if document.get("source") != "code_du_travail":
            document["title_vector"] = ss.embed_title_content_sample(
                document.get("title"), document.get("text"))

    with open(dump_path.replace(".json", ".tf.json"), 'w') as fp:
        json.dump(documents, fp, ensure_ascii=False, indent=2)
    end = time.time()
    logger.info("Dump with vectors done in {:.2f}sec 🤖".format(end-start))
