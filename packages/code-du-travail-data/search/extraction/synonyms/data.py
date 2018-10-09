import argparse
import json
import logging
import os

from pprint import pformat

from search import settings


logger = settings.get_logger(__name__)


SYNONYMS = []

# Homemade synonyms.
# https://github.com/SocialGouv/code-du-travail-explorer/issues/56
JSON_SYNONYMS_FILE = os.path.join(settings.BASE_DIR, 'dataset/synonyms.json')

# TESS.json => Thesaurus Travail Emploi Santé Solidarité.
JSON_THESAURUS_FILE = os.path.join(settings.BASE_DIR, 'dataset/thesaurus/TESS.json')


def populate_synonyms():

    with open(JSON_SYNONYMS_FILE) as json_data:
        SYNONYMS.extend(json.load(json_data))

    # Extract synonyms from the TESS Thesaurus.
    with open(JSON_THESAURUS_FILE) as json_data:

        data = json.load(json_data)

        for item in data:

            if item.get('term') and item.get('equivalent'):
                SYNONYMS.append(f"{item['term']}, {item['equivalent']}")

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
