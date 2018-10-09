"""
Merge the Legilibre's `Code du travail` source with a set of "cleaned" tags
in a `CODE_DU_TRAVAIL_DICT` which will be used to populate Elasticsearch.

The work to obtain a set of "cleaned" tags was done on the basis of the extraction
made in `indexation/code_du_travail/eposeidon_tags`.

Usage:

1) Simply import the `CODE_DU_TRAVAIL_DICT`:

    from search.extraction.code_du_travail_load import CODE_DU_TRAVAIL_DICT

2) Or run the script standalone with the `--verbose` option for full debug info:

    pipenv run python indexation/code_du_travail_load.py --verbose
"""
import argparse
import json
import logging
import os
import re

from collections import namedtuple

from search import settings
from search.extraction.code_du_travail.cleaned_tags.tags import TAGS_DICT
from search.indexing.strip_html import strip_html


logger = settings.get_logger(__name__)


LEGIFRANCE_BASE_URL = 'https://www.legifrance.gouv.fr/affichCodeArticle.do'

JSON_LEGILIBRE = os.path.join(settings.BASE_DIR, 'dataset/code_du_travail/code-du-travail-2018-01-01.json')

CODE_DU_TRAVAIL_DICT = {}

EposeidonTag = namedtuple('EposeidonTag', ['name', 'path', 'levels'])


def make_tag(tag_str):
    """
    Parameters:
        - tag_str: a string of categories (also known as 'tags') delimited by a '>' char, e.g.:
               "Négociations collectives > Négociation collective, Accords > Maritime > Maritime"

    Returns an EposeidonTag namedtuple:
        EposeidonTag(
            name='Négociations collectives > Négo collective, Accords > Maritime > Maritime',
            path='/Négociations collectives/Négo collective, Accords/Maritime/Maritime',
            levels=4
        )
    """
    tags = tag_str.split('>')
    multiple_spaces = r'\s+'
    single_space = ' '
    # Replace multiple spaces and remove empty tags.
    tags = [re.sub(multiple_spaces, single_space, tag).strip() for tag in tags if tag]
    # This format is more easily read by humans.
    tags_as_str = (' > ').join(tags)
    # This format is used by Elasticsearch path_hierarchy's tokenizer.
    tags_as_path = '/%s' % ('/').join(tags)
    return EposeidonTag(name=tags_as_str, path=tags_as_path, levels=len(tags))


def populate_code_du_travail_dict(json_file=JSON_LEGILIBRE):
    with open(json_file) as json_data:
        data = json.load(json_data)
        inspect_code_du_travail_children(data['children'])


def inspect_code_du_travail_children(children):
    """
    Each children has the following structure and may contain 0 or more children
    with the same structure:
    {
        'type': 'article',
        'data': {
            'titre': 'Article D8254-7',
            'id': 'LEGIARTI000022357358',
            'section': 'LEGISCTA000018520564',
            'num': 'D8254-7',
            'etat': 'VIGUEUR',
            'date_debut': '2010-02-15',
            'date_fin': '2999-01-01',
            'type': 'AUTONOME',
            'nota': "<p>Décret n° 2009-1377 du 10 novembre 2009 article 7….</p>",
            'bloc_textuel': "<p><br/>Indépendamment de la procédure…</p>",
            'dossier': 'code_en_vigueur',
            'cid': 'LEGITEXT000006072050',
            'mtime': 1497984694
        },
        'children': […]
    }
    """
    for child in children:

        if child['type'] == 'article':

            article_num = child['data']['num']
            tag = TAGS_DICT.get(article_num)

            if not tag:
                logger.debug('%s found in Legilibre but NOT FOUND in cleaned tags.', article_num)
                continue

            CODE_DU_TRAVAIL_DICT[article_num] = {
                'titre': child['data']['titre'],
                'id': child['data']['id'],
                'section': child['data']['section'],
                'num': child['data']['num'],
                'etat': child['data']['etat'],  # 'ABROGE_DIFF', 'VIGUEUR', 'VIGUEUR_DIFF', 'MODIFIE'
                'date_debut': child['data']['date_debut'],
                'date_fin': child['data']['date_fin'],
                'nota': child['data']['nota'],  # In HTML.
                'bloc_textuel': strip_html(child['data']['bloc_textuel']),  # In HTML.
                'html': child['data']['bloc_textuel'] + (child['data']['nota'] or ""),  # In HTML.
                'cid': child['data']['cid'],
              #'tags': [make_tag(tag)],  # Stick to 1 tag for now.
                'path': make_tag(tag).path,
                'url': f"{LEGIFRANCE_BASE_URL}?idArticle={child['data']['id']}&cidTexte={child['data']['cid']}",
            }

        # Recursion: inspect children, if any.
        inspect_code_du_travail_children(child.get('children', []))


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    populate_code_du_travail_dict()

else:

    populate_code_du_travail_dict()
