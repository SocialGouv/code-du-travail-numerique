"""
Merge the Legilibre's `Code du travail` source and the ePoseidon classification
in a `CODE_DU_TRAVAIL_DICT` which will be used to populate Elasticsearch.

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

from collections import defaultdict, namedtuple

from search import settings
from search.extraction.code_du_travail.eposeidon_tags.tags_cleaned import CLEANED_EPOSEIDON_TAGS
from search.extraction.code_du_travail.eposeidon_tags.tags_renamed import RENAMED_EPOSEIDON_TAGS


logger = settings.get_logger(__name__)


LEGIFRANCE_BASE_URL = 'https://www.legifrance.gouv.fr/affichCodeArticle.do'

JSON_EPOSEIDON = os.path.join(settings.BASE_DIR, 'dataset/code_du_travail/nomenclatures-20180413.json')
JSON_LEGILIBRE = os.path.join(settings.BASE_DIR, 'dataset/code_du_travail/code-du-travail-2018-01-01.json')

STATS = {
    'count_article': 0,
    # A dict of unique ePoseidon tags and how many times they are used.
    'eposeidon_tags': defaultdict(int),
    # A dict of unique ePoseidon tags and their associated articles.
    'eposeidon_tags_for_articles': defaultdict(list),
    # A dict of new tags used in ePoseidon and how many times they are used.
    # They must be renamed to look good in the UI.
    'eposeidon_new_tags_to_rename': defaultdict(int),
}

# A global dict where each key is the number of a `Code du travail`'s article
# and each value is a dict containing info about it.
CODE_DU_TRAVAIL_DICT = {}

# A global dict where each key is the number of a `Code du travail`'s
# article and each value is a set of one or more ePoseidon's tag.
# Python's sets are used to avoid duplicates:
# {
#     'R742-9': {
#         EposeidonTag(...),
#         EposeidonTag(...),
#     },
#     ...
# }
EPOSEIDON_TAGS_DICT = defaultdict(set)

EposeidonTag = namedtuple('EposeidonTag', ['source', 'name', 'path', 'levels'])


def make_tag(tags, source="Code du travail"):
    """
    Parameters:
        - tags: an array of tags extracted from ePoseidon attributes in this order: [Theme, SousTheme, Objet, Aspect]
        - source: a string of the source extracted from ePoseidon

    Returns an EposeidonTag namedtuple:
        EposeidonTag(
            source='Code du travail',
            name='Négociations collectives > Négo collective, Accords > Maritime > Maritime',
            path='/Négociations collectives/Négo collective, Accords/Maritime/Maritime',
            levels=4
        )
    """
    multiple_spaces = r'\s+'
    single_space = ' '
    # Replace multiple spaces and remove empty tags.
    tags = [re.sub(multiple_spaces, single_space, tag).strip() for tag in tags if tag]
    # This format is more easily read by humans.
    tags_as_str = (' > ').join(tags)
    # This format is used by Elasticsearch path_hierarchy's tokenizer.
    tags_as_path = '/%s' % ('/').join(tags)
    return EposeidonTag(source=source, name=tags_as_str, path=tags_as_path, levels=len(tags))


def populate_eposeidon_tags_dict(json_file=JSON_EPOSEIDON):
    """
    Populate `EPOSEIDON_TAGS_DICT` with "tags" extracted from the existing
    ePoseidon's codification of the `Code du travail`.
    """
    with open(json_file) as json_data:

        data = json.load(json_data)

        # Each key is a reference to an article.
        # An article can be related to multiple sources, e.g. article "1" can be:
        # - article 1 of "Décret n°2005-305 du 31 mars 2005"
        # - article 1 of "Règlement 561-2006 du 15 mars 2006 Transport routier Durée du travail"
        # etc.
        for article_num in data:

            for article in data[article_num]:

                source = article['attrs']['source']

                if not source:
                    logger.debug('Skipping item in article "%s" because its `source` was empty.', article_num)
                    continue

                if source != 'Code du travail':
                    # Skip everything not directly concerned by the `Code du travail` in ePoseidon
                    # because it's not available in the Legilibre's source.
                    logger.debug('Skipping item in article "%s" because its `source` is "%s".', article_num, source)
                    continue

                tags = [
                    article['Theme']['nom'],  # Level 1.
                    article['SousTheme']['nom'],  # Level 2.
                    article['Objet']['nom'],  # Level 3.
                    article.get('Aspect', {}).get('nom', ''),  # Level 4 (may not exist in the source file).
                ]
                tag = make_tag(tags, source)
                EPOSEIDON_TAGS_DICT[article_num].add(tag)

    # Correct ePoseidon tags.
    # Note: tags were corrected before being renamed.
    for key, cleaned_tags in CLEANED_EPOSEIDON_TAGS.items():
        EPOSEIDON_TAGS_DICT[key] = set([make_tag(tag) for tag in cleaned_tags])

    # Rename ePoseidon tags.
    for article_num in EPOSEIDON_TAGS_DICT.keys():
        renamed_tags = set()
        for tag in EPOSEIDON_TAGS_DICT[article_num]:
            try:
                new_tag_str = RENAMED_EPOSEIDON_TAGS[tag.name]
            except KeyError:
                # Do nothing, those tags must be renamed.
                STATS['eposeidon_new_tags_to_rename'][tag.name] += 1
                continue
            new_tag = make_tag(new_tag_str.split(' > '))
            renamed_tags.add(new_tag)
            STATS['eposeidon_tags'][new_tag.name] += 1
            STATS['eposeidon_tags_for_articles'][new_tag.name].append(article_num)

        EPOSEIDON_TAGS_DICT[article_num] = renamed_tags


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

            STATS['count_article'] = STATS['count_article'] + 1

            article_num = child['data']['num']
            eposeidon_tags = EPOSEIDON_TAGS_DICT.get(article_num)

            if not eposeidon_tags:
                logger.warning('%s found in Legilibre but NOT FOUND in ePoseidon.', article_num)
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
                'bloc_textuel': child['data']['bloc_textuel'],  # In HTML.
                'cid': child['data']['cid'],
                'tags': [tag for tag in eposeidon_tags],
                'url': f"{LEGIFRANCE_BASE_URL}?idArticle={child['data']['id']}&cidTexte={child['data']['cid']}",
            }

        # Recursion: inspect children, if any.
        inspect_code_du_travail_children(child.get('children', []))


def show_stats():

    if logger.isEnabledFor(logging.DEBUG):

        logger.debug('-' * 80)
        logger.debug('ePoseidon tags stats:')
        for key in sorted(STATS['eposeidon_tags'], key=STATS['eposeidon_tags'].get, reverse=True):
            logger.debug('%5s - %s', STATS['eposeidon_tags'][key], key)

        logger.debug('-' * 80)
        logger.debug('ePoseidon tags sorted and their associated articles:')
        for key in sorted(STATS['eposeidon_tags'].keys()):
            tags = ', '.join(STATS['eposeidon_tags_for_articles'][key])
            logger.debug('%s\t%s', key, tags)  # TAB separated.

        logger.debug('-' * 80)
        logger.debug('Number of articles: %s', STATS['count_article'])

    if STATS['eposeidon_new_tags_to_rename']:
        logger.error('-' * 80)
        logger.error('New ePoseidon tags that need to be renamed are sorted below:')
        for key in sorted(STATS['eposeidon_new_tags_to_rename'].keys()):
            logger.error('%s', key)


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    populate_eposeidon_tags_dict()
    populate_code_du_travail_dict()

    show_stats()

else:

    populate_eposeidon_tags_dict()
    populate_code_du_travail_dict()
