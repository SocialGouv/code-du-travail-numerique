import argparse
import logging
import os

from pprint import pformat

from search import settings


logger = settings.get_logger(__name__)

# Test with one Convention, ID = 2121.
IDCC = '2121'
IDCC_URL = (
    'https://www.legifrance.gouv.fr/'
    + 'affichIDCC.do;jsessionid=D43D7F474E361FB2FFCB390D491D6B4B.tplgfr38s_2'
    + '?idConvention=KALICONT000005635096'
)

CCN_DIR = os.path.join(settings.BASE_DIR, f'dataset/conventions_collectives_nationales/{IDCC}')

CONVENTIONS_COLLECTIVES = []

def populate_ccn():
    for filename in os.listdir(CCN_DIR):
        if filename.endswith('.txt'):
            with open(os.path.join(CCN_DIR, filename)) as txt_data:
                item = {
                    'url': IDCC_URL,
                    'idcc': IDCC,
                    'title': '',
                    'text': '',
                }
                for i, line in enumerate(txt_data):
                    if i == 0:
                        item['title'] = line
                        continue
                    item['text'] += line
                # Replace multiple spaces by a single space.
                item['text'] = ' '.join(item['text'].split())
                CONVENTIONS_COLLECTIVES.append(item)

    logger.debug('-' * 80)
    logger.debug(pformat(CONVENTIONS_COLLECTIVES, width=120))


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    populate_ccn()

else:

    populate_ccn()
