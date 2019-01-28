from search.extraction.synonyms.data import SYNONYMS

filters = {
    # Normalize acronyms so that no matter the format, the resulting token will be the same.
    # E.g.: SmiC => S.M.I.C. => SMIC => smic.
    'french_acronyms': {
        'type': 'word_delimiter',
        'catenate_all': True,
        'generate_word_parts': False,
        'generate_number_parts': False,
    },
    # Remove elision (l'avion => avion)
    # ne prend pas en compte la casse (L'avion = l'avion = avion)
    'french_elision': {
        'type': 'elision',
        'articles_case': True,
        'articles': [
            'l',
            'm',
            't',
            'qu',
            'n',
            's',
            'j',
            'd',
            'c',
            'jusqu',
            'quoiqu',
            'lorsqu',
            'puisqu',
            'parce qu',
            'parcequ',
            'entr',
            'presqu',
            'quelqu',
        ],
    },
    # liste de termes et leurs synonymes
    'french_synonyms': {
        'type': 'synonym',
        'ignore_case': True,
        'expand': True,
        'synonyms': SYNONYMS,
    },
    # Il existe 3 stemmer pour le francais french, light_french, minimal_french
    # light french et le median
    'french_stemmer': {
        'type': 'stemmer',
        'language': 'light_french',
    },
    'french_stop': {
        'type': 'stop',
        'stopwords': '_french_',
    },
}

analyzers = {
    'idcc_ape': {
        'tokenizer': 'whitespace',
    },
    'french_stemmed': {
        'tokenizer': 'icu_tokenizer',
        "char_filter": [
            "html_strip"
        ],
        'filter': [
            "french_elision",
            "icu_folding",
            "lowercase",
            "french_acronyms",
            "french_synonyms",
            "french_stop",
            "french_stemmer"
        ]
    },
    'french': {
        'tokenizer': 'icu_tokenizer',
        'filter': [
            'french_elision',
            'icu_folding',
            'french_stop',
            'french_stemmer',
        ],
    },
    'french_indexing': {
        'tokenizer': 'icu_tokenizer',
        "char_filter": ["startwith"],
        'filter': [
            'french_elision',
            'icu_folding',
            'french_stop',
            'french_stemmer',
        ],
    },
}


char_filters = {
    'startwith': {
        "type": "pattern_replace",
        "pattern": "^(.*)",
        "replacement": "__start__ $1"
    }
}
