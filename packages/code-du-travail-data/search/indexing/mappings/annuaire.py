cdtn_annuaire_mapping = {
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
        'title': {
            'type': 'text',
            'fields': {
              'french_stemmed': {
                'type': 'text',
                'analyzer': 'french_stemmed',
              },
              'french_exact': {
                'type': 'text',
                'analyzer': 'french_exact',
              },
            }
        },
        'type': {
            'type': 'text',
            'analyzer': 'keyword',
        },
        'address': {
            "properties": {
              "lignes": { "type": "text" },
              "code": { "type": "integer" },
              "city": { "type": "text" },
            }
        },
        "coord": {
          'type': 'geo_point'
        },
        'tel': {
            'type': 'text',
            'analyzer': 'keyword',
        },
        'email': {
            'type': 'text',
            'analyzer': 'keyword',
        },
    },
}
