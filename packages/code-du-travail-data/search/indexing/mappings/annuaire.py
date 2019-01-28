cdtn_annuaire_mapping = {
    'properties': {
        # Indicates the origin of the document, e.g. 'code_du_travail', 'fiches_service_public' etc.
        'source': {
            'type': 'keyword',
        },
        # The local document slug
        'slug': {
            'type': 'keyword',
        },
        'title': {
            'type': 'text',
            'analizer': 'french',
            'fields': {
              'french_stemmed': {
                'type': 'text',
                'analyzer': 'french_stemmed',
              }
            }
        },
        'type': {
            'type': 'keyword',
        },
        'address': {
            "properties": {
                "lignes": {"type": "text"},
                "code": {"type": "keyword"},
                "city": {"type": "text"},
            }
        },
        "coord": {
          'type': 'geo_point'
        },
        'tel': {
            'type': 'keyword',
        },
        'email': {
            'type': 'keyword',
        },
    },
}
