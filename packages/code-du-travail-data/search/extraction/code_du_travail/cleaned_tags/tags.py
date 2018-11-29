#-*- encoding: utf-8 -*-

"""
Build a dict where each key is a reference of an article of the code du travail
and each value is its associated tag, e.g.:

    {
        'L1254-1': 'Contrat de travail > Autres cas de mise à disposition > Portage salarial > Portage salarial',
        'L1254-2': 'Contrat de travail > Autres cas de mise à disposition > Portage salarial > Portage salarial',
        …
    }

"""
import os
import csv

from search import settings
logger = settings.get_logger(__name__)


# This file contains tag humanly renamed. Source:
# https://github.com/SocialGouv/code-du-travail-explorer/blob/5071d9/src/data/themes.js
TAGS_CSV = os.path.join(settings.BASE_DIR, 'dataset/code_du_travail/themes.csv')


TAGS_DICT = {}


def get_cleaned_tags(csv_file=TAGS_CSV):

    with open(csv_file) as csv_data:
        tag_reader = csv.reader(csv_data, delimiter='\t')
        for i, row in enumerate(tag_reader):
            if len(row) < 3:
                logger.warning("theme.csv: cannot parse row %d", i)
            else:
                tag = row[1].strip()
                articles = [article.strip() for article in row[2].split(';')]
                for article in articles:
                    TAGS_DICT[article] = tag


get_cleaned_tags()
