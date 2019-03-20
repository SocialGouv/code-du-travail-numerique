import json
import logging
import os
import base64
import hashlib

from slugify import slugify

from search import settings
from search.indexing.strip_html import strip_html
from search.extraction.code_du_travail.cleaned_tags.data import CODE_DU_TRAVAIL_DICT
from search.extraction.fiches_ministere_travail.data import FICHES_MINISTERE_TRAVAIL
from search.extraction.themes_front.data import THEMES

logger = settings.get_logger(__name__)
logger.setLevel(logging.INFO)

CDTN_DOCUMENTS = []

def flatten(item):
    if isinstance(item, list):
        return ", ".join(item)
    return item

def parse_hash_tags(tags):
    newTags = []
    for key, value in tags.items():
        if isinstance(value, list):
            for entry in value:
                newTags.append(key + ":" + (str(entry) or ""))
        else:
            newTags.append(key + ":" + (str(value) or ""))
    return newTags

def hasher(text):
    return ("-" + base64.urlsafe_b64encode(
      hashlib.sha1(text).digest()[:10]).decode()
    ) if text else ""

# make a slug from given text and add short hashed suffix from given seed if any
def make_slug(text, seed):
    return slugify(text + str(
      hasher(
        ((text + seed).encode('utf-8'))
      )
    ), to_lower=True)


def populate_cdtn_documents():
    with open(os.path.join(settings.BASE_DIR, 'dataset/kali/kali.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from kali", len(data))
        for val in data:
            CDTN_DOCUMENTS.append({
                'source': 'kali',
                'slug': val['num'],
                'title': val['titre'],
                'text': f"IDCC {val['num']} {val['titre']}",
                'url': val['url'],
                'idcc': val['num'],
            })

    logger.info("Load %s documents from code-du-travail", len(CODE_DU_TRAVAIL_DICT))
    for val in CODE_DU_TRAVAIL_DICT.values():
        CDTN_DOCUMENTS.append({
            'source': 'code_du_travail',
            'text': val['bloc_textuel'],
            'slug': val['num'].lower(),
            'title': val['titre'],
            'html': val['html'],
            'path': val['path'],
            'themes': val['themes'],
            'date_debut': val['date_debut'],
            'date_fin': val['date_fin'],
            'url': val['url'],
        })

    with open(os.path.join(settings.BASE_DIR, 'dataset/fiches_service_public/fiches-sp-travail.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from fiches-service-public", len(data))
        for val in data:
            CDTN_DOCUMENTS.append({
                'date': val['date'],
                'raw': val['raw'],
                'slug': slugify(val['title'], to_lower=True),
                'source': 'fiches_service_public',
                'tags': val['tags'],
                'text': val['text'],
                'references_juridiques': val['references_juridiques'],
                'title': val['title'],
                'url': val['url'],
            })

    logger.info("Load %s documents from fiches-ministere-travail", len(FICHES_MINISTERE_TRAVAIL))
    for val in FICHES_MINISTERE_TRAVAIL:
        CDTN_DOCUMENTS.append({
            'source': 'fiches_ministere_travail',
            'slug': slugify(val['title'], to_lower=True),
            'text': val['text'],
            'anchor': val['anchor'],
            'html': val["html"],
            'title': val['title'],
            'url': val['url'],
            'date': val.get('date'),
        })

    for val in THEMES:
        CDTN_DOCUMENTS.append({
            'source': 'themes',
            'slug': val['slug'],
            'text': val['text'],
            'title': val['title'],
        })

    with open(os.path.join(settings.BASE_DIR, 'dataset/faq.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from faq", len(data))
        for val in data:
            faq_text = strip_html(val['reponse'])
            tags = parse_hash_tags(val.get("tags"))
            CDTN_DOCUMENTS.append({
                'source': 'faq',
                'slug': make_slug(val['question'], '-'.join(tags)),
                'text': faq_text,
                'html': val["reponse"],
                'title': val['question'],
                'tags': tags,
                'date': val.get('date'),
                'author':  val['source'] if 'source' in val else 'DIRRECTE',
            })

    with open(os.path.join(settings.BASE_DIR, 'dataset/faq-contributions.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from contributions", len(data))
        for val in data:
            faq_text = strip_html(val['reponse'])
            tags = parse_hash_tags(val.get("tags"))
            CDTN_DOCUMENTS.append({
                'source': 'faq',
                'slug': make_slug(val['question'], '-'.join(tags)),
                'text': faq_text,
                'html': val["reponse"],
                'title': val['question'],
                'tags': tags,
                'date': val.get('date_redaction'),
                'date_expiration': val.get('date_expiration'),
                'author': 'DIRRECTE',
            })
    with open(os.path.join(settings.BASE_DIR, 'dataset/faq-snippets.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from snippets", len(data))
        for val in data:
            faq_text = strip_html(val['reponse'])
            tags = parse_hash_tags(val.get("tags"))
            CDTN_DOCUMENTS.append({
                'source': 'snippet',
                'slug': slugify(val['question'], to_lower=True),
                'text': faq_text,
                'html': val["reponse"],
                'title': val['question'],
                'tags': tags,
                'date': val.get('date_redaction'),
                'references': val.get('references'),
                'date_expiration': val.get('date_expiration'),
                'author': val['redacteur'],
            })

    with open(os.path.join(settings.BASE_DIR, 'dataset/export-courriers.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from export-courriers.json", len(data))
        for val in data:
            tags = parse_hash_tags(val.get("tags"))
            CDTN_DOCUMENTS.append({
                'source': 'modeles_de_courriers',
                'title': val['titre'],
                'filename': val['filename'],
                'slug': slugify(val['titre'], to_lower=True),
                'text': ''.join(val['questions']),
                'html': val["html"],
                'tags': tags,
                'description': val.get('description'),
                'date': val.get('date_redaction'),
                'author':  val.get('redacteur'),
                'editor':  val.get('source'),
            })

    with open(os.path.join(settings.BASE_DIR, 'dataset/outils.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from outils.json", len(data))
        for val in data:
            CDTN_DOCUMENTS.append({
                'source': 'outils',
                'title': val['titre'],
                'slug': slugify(val['code'], to_lower=True),
                'text': ' '.join(val['questions']),
                'themes': val['themes'],
                'date': val.get('date'),
                'branche': val['branche'],
            })

populate_cdtn_documents()
