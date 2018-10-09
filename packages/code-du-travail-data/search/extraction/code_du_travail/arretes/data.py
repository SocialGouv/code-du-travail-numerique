"""
TOFIX: A FAILED attempt at extracting "Arrêtés" data from ePoseidon.

Each item in the ePoseidon extract is an article and can be related
to multiple sources, e.g. article "1" can be:
- article 1 of "Arrêté du 30/10/2012"
- article 1 of "Arrêté du 2 décembre 1998"

But, there may be multiple "Arrêtés" with the same title, e.g. "Arrêté du 2 décembre 1998":
- https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000000391775&categorieLien=cid
- https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000000391774&categorieLien=id

In this case, there is nothing to distinguish articles with the same title.

It could be worth exploring:
- obtain another format for ePoseidon "Arrêtés" data
- found another data source for "Arrêtés"
"""
import argparse
import json
import logging
import os

from collections import defaultdict

from search import settings


logger = settings.get_logger(__name__)

JSON_EPOSEIDON = os.path.join(settings.BASE_DIR, 'dataset/code_du_travail/nomenclatures-20180413.json')

ARRETES_DICT = defaultdict(list)


def populate_dict(json_file=JSON_EPOSEIDON):

    with open(json_file) as json_data:

        data = json.load(json_data)

        # Each key is a reference to an article.
        # An article can be related to multiple sources, e.g. article "1" can be:
        # - article 1 of "Arrêté du 30/10/2012"
        # - article 1 of "Arrêté du 2 décembre 1998"
        # etc.
        for article_num in data:

            for article in data[article_num]:

                title = article['attrs']['source']

                if not title:
                    continue

                if not title.startswith('Arrêté'):
                    continue

                # Group together articles of a same "Arrêté" based on its title.
                ARRETES_DICT[title].append(article)

        for arretes in ARRETES_DICT.values():

            title = arretes[0]['attrs']['source']

            logger.debug('-' * 80)
            logger.debug(title)

            for i in sorted(arretes, key=lambda x: x['attrs']['identifiant']):
                # logger.debug(i['attrs']['identifiant'])
                logger.debug(i['attrs']['article'])
                # logger.debug(i['attrs']['debutValidite'])
                # logger.debug(i['attrs']['finValidite'])
                # logger.debug(i['Texte'])
                logger.debug(i['Objet']['nom'])
                logger.debug(i.get('SousTheme', {}).get('nom'))
                logger.debug(i.get('Theme', {}).get('nom'))


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    populate_dict()

else:

    populate_dict()
