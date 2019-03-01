import logging
import os

import elasticsearch
from elasticsearch.helpers import bulk

from search.indexing import analysis

from search.indexing.cdtn_documents import CDTN_DOCUMENTS
from search.indexing.mappings.code_du_travail_numerique import code_du_travail_numerique_mapping

from search.indexing.mappings.annuaire import cdtn_annuaire_mapping
from search.indexing.annuaire_documents import ANNUAIRE_DOCUMENTS

console = logging.StreamHandler()
formatter = logging.Formatter(fmt='[%(levelname)s - %(funcName)s] %(message)s')
console.setFormatter(formatter)

logger = logging.getLogger(__name__)
logger.addHandler(console)
logger.setLevel(logging.INFO)

def flatten(item):
    if isinstance(item, list):
        return ", ".join(item)
    return item


def get_es_client():
    """
    Configure the client for different environments.
    """
    hosts = [os.environ.get('ELASTICSEARCH_URL')]
    return elasticsearch.Elasticsearch(hosts=hosts, timeout=60)


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
                    'char_filter': analysis.char_filters,
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


def create_documents(index_name, type_name, documents):
    es = get_es_client()
    actions = [
        {
            '_op_type': 'index',
            '_index': index_name,
            '_type': type_name,
            '_source': body,
        }
        for body in documents
    ]
    logger.info('Loaded %s documents', len(documents))
    for batch_action in chunks(actions, 1000):
        logger.info('Batch indexing %s documents', len(batch_action))
        bulk(es, batch_action)
    logger.info('Indexed %s documents', len(documents))

if __name__ == '__main__':

    # Use 1 index by type, see:
    # https://www.elastic.co/blog/index-type-parent-child-join-now-future-in-elasticsearch

    name = 'code_du_travail_numerique'
    drop_index(name)
    create_index(index_name=name, mapping_name=name, mapping=code_du_travail_numerique_mapping)
    create_documents(index_name=name, type_name=name, documents=CDTN_DOCUMENTS)

    name = 'cdtn_annuaire'
    drop_index(name)
    create_index(index_name=name, mapping_name=name, mapping=cdtn_annuaire_mapping)
    create_documents(index_name=name, type_name=name, documents=ANNUAIRE_DOCUMENTS)
