code_du_travail_numerique_mapping = {
    'properties': {
        # Indicates the origin of the document, e.g. 'code_du_travail', 'fiches_service_public' etc.
        'source': {
            'type': 'keyword',
        },
        # The local document slug
        'slug': {
            'type': 'keyword',
        },
        # The source URL
        'url': {
            'type': 'keyword',
        },
        'title': {
            'type': 'text',
            'fields': {
                'article_id': {
                  'type': 'text',
                  'analyzer': 'article_id_analyzer'
                },
                'french': {
                    'type': 'text',
                    'analyser': 'french_indexing',
                    'search_analyzer': 'french',
                },
                'french_stemmed': {
                    'type': 'text',
                    'analyzer': 'french_stemmed',
                },
            },
        },
        'text': {
            'type': 'text',
            'fields': {
                'french': {
                    'type': 'text',
                    'analyzer': 'french',
                },
                'french_stemmed': {
                    'type': 'text',
                    'analyzer': 'french_stemmed',
                },
            },
        },
        # Currently only available for `Fiches service public`.
        'tags': {
            'type': 'text',
            'analyzer': 'french',
            'fields': {
                'keywords': {
                    'type': 'text',
                    'analyzer': 'keyword',
                },
            },
        },
        # Currently only available for `Code du travail`.
        'path': {
            'type': 'text',
            'analyzer': 'french',
        },
        'themes': {
          'type': 'keyword',
        },
        'breadcrumbs': {
            'properties': {
              'label': {'type': 'text'},
              'slug': {'type': 'keyword'},
              'parent': {'type': 'keyword'},
            }
        },
        'theme': {
          'type': 'keyword'
        },
        # currently available for idcc
        'idcc': {
            'type': 'keyword',
            'fields': {
                'text': {
                  'type': 'text'
                }
            }
        },
        'ape': {
            'type': 'text',
            'analyzer': 'idcc_ape',
        },
    }
}
