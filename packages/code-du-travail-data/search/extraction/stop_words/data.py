import argparse
import json
import logging
import os

from pprint import pformat

from search import settings


logger = settings.get_logger(__name__)


STOP_WORDS = []

STOP_WORDS_FILE = os.path.join(settings.BASE_DIR, 'dataset/stop_words/stop_words.json')


def populate_stop_words():

    with open(STOP_WORDS_FILE) as json_data:
        STOP_WORDS.extend(json.load(json_data))

    logger.debug('-' * 80)
    logger.debug(pformat(STOP_WORDS, width=120))


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    populate_stop_words()

else:

    populate_stop_words()
