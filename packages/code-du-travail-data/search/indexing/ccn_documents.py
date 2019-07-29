import json
import logging
import os

from search import settings
logger = settings.get_logger(__name__)
logger.setLevel(logging.INFO)

CCN_DOCUMENTS = []

def populate_ccn_documents():
    with open(os.path.join(settings.BASE_DIR, 'dataset/conventions_collectives/ccn-documents.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from conventions collectives", len(data))
        for val in data:
            CCN_DOCUMENTS.append({
                'id': val['id'],
                'num': val.get('num'),
                'intOrdre': val.get('intOrdre'),
                'slug': val.get('slug'),
                'url': val.get('url'),
                'title': val.get('title'),
                'content': val.get('content'),
                'etat': val.get('etat'),
                'categorisation': val.get('categorisation'),
                'dateParution': val.get('dateParution'),
                'surtitre': val.get('surtitre'),
                'historique': val.get('historique'),
                'articles': val.get('articles'),
                'sections': val.get('sections')
            })

populate_ccn_documents()
