#-*- encoding: utf-8 -*-

import argparse
import json
import logging
import os

from pprint import pformat

from search import settings


logger = settings.get_logger(__name__)


JSON_FICHES = os.path.join(settings.BASE_DIR, 'dataset/fiches_service_public/fiches-sp-travail.json')

FICHES_SERVICE_PUBLIC = []

def populate_fiches_service_public(json_file=JSON_FICHES):

    with open(json_file) as json_data:

        fiches = json.load(json_data)

        for fiche in fiches:
            FICHES_SERVICE_PUBLIC.append(fiche)

            logger.debug('-' * 80)
            logger.debug(pformat(fiche))


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    populate_fiches_service_public()

else:

    populate_fiches_service_public()
