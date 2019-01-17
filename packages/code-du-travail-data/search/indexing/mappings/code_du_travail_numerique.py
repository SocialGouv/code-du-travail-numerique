code_du_travail_numerique_mapping = {
    'properties': {
        # Indicates the origin of the document, e.g. 'code_du_travail', 'fiches_service_public' etc.
        'source': {
            'type': 'text',
            'fielddata': True,
            'analyzer': 'keyword',
        },
        # The local document slug
        'slug': {
            'type': 'text',
            'analyzer': 'keyword',
        },
        # The source URL
        'url': {
            'type': 'text',
            'analyzer': 'keyword',
        },
        # A field that concatenate `title` and `text` fields.
        'all_text': {
            'type': 'text',
            'analyzer': 'standard',
            'store': True,
            'fields': {
                'french_stemmed': {
                    'type': 'text',
                    'analyzer': 'french_stemmed',
                },
                'french_exact': {
                    'type': 'text',
                    'analyzer': 'french_exact',
                },
                'shingle': {
                    'type': 'text',
                    'analyzer': 'shingle',
                },
                'french_light': {
                  'type': 'text',
                  'analyzer': 'french_light',
                },
                'french_heavy': {
                  'type': 'text',
                  'analyzer': 'french_heavy',
                }
            },
        },
        'title': {
            'type': 'text',
            'analyzer': 'standard',
            'fields': {
                'french_stemmed': {
                    'type': 'text',
                    'analyzer': 'french_stemmed',
                },
                'french_exact': {
                    'type': 'text',
                    'analyzer': 'french_exact',
                },
                'shingle': {
                    'type': 'text',
                    'analyzer': 'shingle',
                },
                'french_light': {
                  'type': 'text',
                  'analyzer': 'french_light',
                },
                'french_heavy': {
                  'type': 'text',
                  'analyzer': 'french_heavy',
                },
                # Useful to match articles by number, e.g. "R1227-7".
                'whitespace': {
                    'type': 'text',
                    'analyzer': 'whitespace',
                },
            },
        },
        'text': {
            'type': 'text',
            'analyzer': 'standard',
            'fields': {
                'french_stemmed': {
                    'type': 'text',
                    'analyzer': 'french_stemmed',
                },
                'french_exact': {
                    'type': 'text',
                    'analyzer': 'french_exact',
                },
                'shingle': {
                    'type': 'text',
                    'analyzer': 'shingle',
                },
                'french_light': {
                  'type': 'text',
                  'analyzer': 'french_light',
                },
                'french_heavy': {
                  'type': 'text',
                  'analyzer': 'french_heavy',
                }
            },
        },
        # Currently only available for `Fiches service public`.
        'tags': {
            'type': 'text',
            'analyzer': 'standard',
            'fields': {
                'french_stemmed': {
                    'type': 'text',
                    'analyzer': 'french_stemmed',
                },
                'french_exact': {
                    'type': 'text',
                    'analyzer': 'french_exact',
                },
                'shingle': {
                    'type': 'text',
                    'analyzer': 'shingle',
                },
                'keywords': {
                  'type': 'text',
                  'analyzer': 'keyword'
                }
            },
        },
        # Currently only available for `Code du travail`.
        'path': {
            'type': 'text',
            'analyzer': 'path_analyzer_custom',
            'fielddata': True,
            'fields': {
                'french_stemmed': {
                    'type': 'text',
                    'analyzer': 'french_stemmed',
                },
                'french_exact': {
                    'type': 'text',
                    'analyzer': 'french_exact',
                },
                'shingle': {
                    'type': 'text',
                    'analyzer': 'shingle',
                },
            },
        },
        'themes': {
          'type': 'text',
          'analyzer': 'keyword',
        },
        # currently available for idcc
        'idcc': {
            'type': 'text',
            'analyzer': 'keyword',
        },
        'ape': {
            'type': 'text',
            'analyzer': 'idcc_ape',
        },
    },
}
