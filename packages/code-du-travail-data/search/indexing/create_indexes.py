import json
import logging
import os

import elasticsearch
from elasticsearch.helpers import bulk

from slugify import slugify

from search import settings
from search.extraction.code_du_travail.cleaned_tags.data import CODE_DU_TRAVAIL_DICT
from search.extraction.conventions_collectives_nationales.data import CONVENTIONS_COLLECTIVES
from search.extraction.fiches_ministere_travail.data import FICHES_MINISTERE_TRAVAIL
from search.extraction.fiches_service_public.data import FICHES_SERVICE_PUBLIC
from search.extraction.themes_front.data import THEMES
from search.indexing import analysis
from search.indexing.strip_html import strip_html

from search.indexing.mappings.code_du_travail_numerique import code_du_travail_numerique_mapping


console = logging.StreamHandler()
formatter = logging.Formatter(fmt='[%(levelname)s - %(funcName)s] %(message)s')
console.setFormatter(formatter)

logger = logging.getLogger(__name__)
logger.addHandler(console)
logger.setLevel(logging.INFO)


def parse_hash_tags(tags):
    newTags = []
    for key, value in tags.items():
        if isinstance(value, list):
            for entry in value:
                newTags.append(key + ":" + (str(entry) or ""))
        else:
          newTags.append(key + ":" + (str(value) or ""))
    return newTags

def get_es_client():
    """
    Configure the client for different environments.
    """
    hosts = [os.environ.get('ELASTICSEARCH_URL')]
    return elasticsearch.Elasticsearch(hosts=hosts)


def drop_index(index_name):
    es = get_es_client()
    if es.indices.exists(index=index_name):
        es.indices.delete(index=index_name)
        logger.info("Index `%s` dropped.", index_name)


def create_index(index_name, mapping_name, mapping):
    es = get_es_client()
    request_body = {
        'settings': {
            'number_of_shards': 1,
            'number_of_replicas': 0,
            'index': {
                'analysis': {
                    'filter': analysis.filters,
                    'analyzer': analysis.analyzers,
                    'tokenizer': analysis.tokenizers,
                },
            },
        },
        'mappings': {
            mapping_name: mapping,
        },
    }
    es.indices.create(index=index_name, body=request_body)
    logger.info("Index `%s` created.", index_name)


def chunks(l, n):
    """
    Yield successive n-sized chunks from l.
    """
    for i in range(0, len(l), n):
        yield l[i:i+n]


def create_documents(index_name, type_name):
    es = get_es_client()
    body_data = []


    with open(os.path.join(settings.BASE_DIR, 'dataset/kali.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from kali", len(data))
        for val in data:
            body_data.append({
                'source': 'kali',
                'id': val['cid'],
                'slug': slugify(val['titre'], to_lower=True),
                'title': val['titre'],
                'all_text': val['titre'],
                'url': val['url'],
            })

    with open(os.path.join(settings.BASE_DIR, 'dataset/idcc-tags.json')) as idcc_tags_data:
        tags_data = json.load(idcc_tags_data)
        with open(os.path.join(settings.BASE_DIR, 'dataset/idcc.json')) as json_data:
            data = json.load(json_data)
            logger.info("Load %s documents from idcc", len(data))
            for key, val in data.items():
                title = "IDCC " + key + " : " +  val
                tags = []
                if tags_data.get(key) and tags_data.get(key).get("tags"):
                  tags += parse_hash_tags(tags_data.get(key).get("tags"))

                body_data.append({
                    'source': 'idcc',
                    'id': key,
                    'slug': key,
                    'title': title,
                    'tags':tags,
                    'all_text': title
                })

    logger.info("Load %s documents from code-du-travail", len(CODE_DU_TRAVAIL_DICT))
    for val in CODE_DU_TRAVAIL_DICT.values():
        body_data.append({
            'source': 'code_du_travail',
            'text': val['bloc_textuel'],
            'slug': slugify(val['titre'], to_lower=True),
            'title': val['titre'],
            'all_text': f"{val['titre']} {val['bloc_textuel']} {[tag.name for tag in val.get('tags', [])]}",
            'html': val['html'],
            'path': val['path'],
            'date_debut': val['date_debut'],
            'date_fin': val['date_fin'],
            'url': val['url'],
        })

    logger.info("Load %s documents from service-public", len(FICHES_SERVICE_PUBLIC))
    for val in FICHES_SERVICE_PUBLIC:
        body_data.append({
            'source': 'fiches_service_public',
            'text': val['text'],
            'slug': slugify(val['title'], to_lower=True),
            'title': val['title'],
            'html': val["html"],
            'all_text': f"{val['title']} {val['text']}",
            'tags': val['tags'],
            'url': val['url'],
        })

    logger.info("Load %s documents from fiches-ministere-travail", len(FICHES_MINISTERE_TRAVAIL))
    for val in FICHES_MINISTERE_TRAVAIL:
        body_data.append({
            'source': 'fiches_ministere_travail',
            'slug': slugify(val['title'], to_lower=True),
            'text': val['text'],
            'anchor': val['anchor'],
            'html': val["html"],
            'title': val['title'],
            'all_text': f"{val['title']} {val['text']}",
            'url': val['url'],
        })

    for val in THEMES:
        body_data.append({
            'source': 'themes',
            'slug': slugify(val['title'], to_lower=True),
            'text': val['text'],
            'all_text': f"{val['title']} {val['text']}",
            'title': val['title'],
        })

    with open(os.path.join(settings.BASE_DIR, 'dataset/faq.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from faq", len(data))
        for val in data:
            faq_text = strip_html(val['reponse'])
            tags = parse_hash_tags(val.get("tags"))
            body_data.append({
                'source': 'faq',
                'slug': slugify(val['question'], to_lower=True),
                'text': faq_text,
                'html': val["reponse"],
                'title': val['question'],
                'tags': tags,
                'author':  val['source'] if 'source' in val else 'DIRRECTE',
                'all_text': f"{val['question']} {faq_text} {val.get('tags', {}).get('theme','')} {val.get('tags', {}).get('branche','')}",
            })


    with open(os.path.join(settings.BASE_DIR, 'dataset/faq-conventions-collectives.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from faq-conventions-collectives.json", len(data))
        for val in data:
            faq_text = strip_html(val['reponse'])
            tags = parse_hash_tags(val.get("tags"))
            body_data.append({
                'source': 'faq',
                'slug': slugify(val['question'], to_lower=True),
                'text': faq_text,
                'html': val["reponse"],
                'title': val['question'],
                'tags': tags,
                'all_text': f"{val['question']} {faq_text} {val.get('tags', {}).get('theme','')} {val.get('tags', {}).get('branche','')}",
            })


    with open(os.path.join(settings.BASE_DIR, 'dataset/export-courriers.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from export-courriers.json", len(data))
        for val in data:
            body_data.append({
                'source': 'modeles_de_courriers',
                'title': val['titre'],
                'filename': val['filename'],
                'slug': slugify(val['titre'], to_lower=True),
                'text': ''.join(val['questions']),
                'html': val["html"],
                'all_text': f"{val['titre']} {' '.join(val['questions'])} {val['theme']} {val['type_de_contrat']} {val['profil']}",
          })

    with open(os.path.join(settings.BASE_DIR, 'dataset/outils.json')) as json_data:
        data = json.load(json_data)
        logger.info("Load %s documents from outils.json", len(data))
        for val in data:
            body_data.append({
                'source': 'outils',
                'title': val['titre'],
                'slug': slugify(val['code'], to_lower=True),
                'text': ' '.join(val['questions']),
                'themes': val['themes'],
                'date': val['date'],
                'branche': val['branche'],
                'all_text': f"{val['titre']} {' '.join(val['questions'])} {val['theme']} {val['type_de_contrat']}, {val['catégorie']}, {val['travailleur_particulier']}, {val['branche']}",
          })


    # with open(os.path.join(settings.BASE_DIR, 'dataset/code_bfc.json')) as json_data:
    #     data = json.load(json_data)
    #     for val in data:
    #         body_data.append({
    #             'source': 'code_bfc',
    #             'text': val['reponse'],
    #             'title': val['question'],
    #             'all_text': f"<p>{val['question']}</p>{val['reponse']}",
    #         })

    logger.info("Load %s documents from conventions-collectives", len(CONVENTIONS_COLLECTIVES))
    for val in CONVENTIONS_COLLECTIVES:
        body_data.append({
            'source': 'conventions_collectives',
            'text': val['text'],
            'slug': slugify(val['title'], to_lower=True),
            'title': f"{val['idcc']} - {val['title']}",
            'all_text': f"{val['idcc']} - {val['title']} {val['text']}",
            'url': val['url'],
        })

    actions = [
        {
            '_op_type': 'index',
            '_index': index_name,
            '_type': type_name,
            '_source': body,
        }
        for body in body_data
    ]
    logger.info('Loaded %s documents', len(body_data))
    for batch_action in chunks(actions, 1000):
        logger.info('Batch indexing %s documents', len(batch_action))
        bulk(es, batch_action)
    logger.info('Indexed %s documents', len(body_data))

if __name__ == '__main__':

    # Use 1 index by type, see:
    # https://www.elastic.co/blog/index-type-parent-child-join-now-future-in-elasticsearch

    name = 'code_du_travail_numerique'
    drop_index(name)
    create_index(index_name=name, mapping_name=name, mapping=code_du_travail_numerique_mapping)
    create_documents(index_name=name, type_name=name)
