import argparse
import logging
import sys

from search.indexing.cdtn_documents import CDTN_DOCUMENTS


console = logging.StreamHandler()
logger = logging.getLogger(__name__)
logger.addHandler(console)
logger.setLevel(logging.INFO)


# documents_slug_checker will return a list of dict of duplicate slugs from documents
# thanks to @adipasquale
# CDTN_DOCUMENTS = [
#   {'slug': 'blah1', 'source': 'truc'},
#   {'slug': 'blah1', 'source': 'truc'},
#   {'slug': 'blah2', 'source': 'truc'},
#   {'slug': 'blah1', 'source': 'truc'}
# ]

def documents_slug_checker():
    slugs = [f"{item['source']}/{item.['slug']}" for item in CDTN_DOCUMENTS]

    slugs_count = {item: slugs.count(item) for item in set(slugs)}

    return {slug: count for slug, count in slugs_count.items() if count > 1}


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    duplicate_slugs = documents_slug_checker()

    if duplicate_slugs:
        logger.debug("slug | count")
        logger.debug("-----|----")
        for slug, count in sorted(duplicate_slugs.items()):
            logger.debug("%s | %s", slug, count)

        sys.exit("document with same slugs detected")
