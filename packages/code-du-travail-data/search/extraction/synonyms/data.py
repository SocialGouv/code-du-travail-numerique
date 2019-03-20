import argparse
import json
import logging
import os

from pprint import pformat

from search import settings


logger = settings.get_logger(__name__)


SYNONYMS = []

JSON_SYNONYMS_FILE = os.path.join(settings.BASE_DIR, 'dataset/synonyms/synonyms.json')


def populate_synonyms():

    with open(JSON_SYNONYMS_FILE) as json_data:
        SYNONYMS.extend(json.load(json_data))

    logger.debug('-' * 80)
    logger.debug(pformat(SYNONYMS, width=120))


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    populate_synonyms()

else:

    populate_synonyms()
