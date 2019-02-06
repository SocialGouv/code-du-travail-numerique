import argparse
import logging
import sys

from search.indexing.cdtn_documents import CDTN_DOCUMENTS

console = logging.StreamHandler()
logger = logging.getLogger(__name__)
logger.addHandler(console)
logger.setLevel(logging.INFO)

DUPLICATE_SLUGS = []

def documents_slug_checker():
    slugs = list(map(lambda item: f"{item.get('source')}/{item.get('slug')}", CDTN_DOCUMENTS))
    slugsCount = list(map(lambda item: (item, slugs.count(item)), slugs))
    DUPLICATE_SLUGS = set(filter(lambda item: item[1] > 1, slugsCount))
    logger.debug("slug | count")
    logger.debug("-----|----")
    for slug, count in DUPLICATE_SLUGS:
        logger.debug("%s | %s", slug, count)

if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)


documents_slug_checker()

if len(DUPLICATE_SLUGS) > 0:
    sys.exit()
else:
    sys.exit("documents slug are not uniq ")
