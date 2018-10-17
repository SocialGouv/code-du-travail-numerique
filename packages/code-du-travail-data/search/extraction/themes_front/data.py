import argparse
import json
import logging
import os

from pprint import pformat

from search import settings


logger = settings.get_logger(__name__)


JSON_FICHES = os.path.join(settings.BASE_DIR, 'dataset/themes2.json')

THEMES = []

def populate_theme(data):
    for item in data:
        logger.debug(item['title'])
        if item:
            text = item.get('text', '')
            if not text:
                logger.debug('No text found for title: %s\n%s', item['title'])

            slug = ''
            if isinstance(item['slug'], list):
                slug = '/'.join(item['slug'])
            else:
                slug = item['slug']

            theme = {
                'title': item['title'],
                'slug':  'themes/' + slug,
                'text': text,
            }
            THEMES.append(theme)

            # iterate over children
            if 'children' in item:
                populate_theme(item['children'])

def populate_themes(json_file=JSON_FICHES):

    with open(json_file) as json_data:

        data = json.load(json_data)
        populate_theme(data)

    logger.debug('-' * 80)
    logger.debug(pformat(THEMES))


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    populate_themes()

else:

    populate_themes()
