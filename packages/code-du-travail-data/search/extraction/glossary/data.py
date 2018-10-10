import argparse
import json
import logging
import os
import re

from search import settings


logger = settings.get_logger(__name__)


GLOSSARY = []

# TESS.json => Thesaurus Travail Emploi Santé Solidarité.
JSON_FILE = os.path.join(settings.BASE_DIR, 'dataset/thesaurus/TESS.json')


def populate_glossary(json_file=JSON_FILE):
    """
    Extract a glossary from the TESS Thesaurus.

    Notes:
        This glossary is not being used yet.
        It is used to generate a file that is easier to read for a human.
    """
    multiple_spaces = r'\s+'
    single_space = ' '

    with open(json_file) as json_data:

        data = json.load(json_data)

        for item in data:

            term = item.get('term')
            definition = item.get('notes')

            if term and definition:

                # Cleanup text.
                definition = definition.replace('\n', ' ')
                definition = re.sub(multiple_spaces, single_space, definition).strip()

                GLOSSARY.append({
                    'term': term,
                    'definition': definition,
                })

        logger.debug('-' * 80)
        logger.debug(GLOSSARY)



if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    populate_glossary()

else:

    populate_glossary()
