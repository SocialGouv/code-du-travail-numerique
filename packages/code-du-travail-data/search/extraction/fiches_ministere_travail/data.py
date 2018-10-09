import argparse
import json
import logging
import os
import re

from pprint import pformat

from search import settings


logger = settings.get_logger(__name__)


JSON_FICHES = os.path.join(settings.BASE_DIR, 'dataset/fiches_ministere_travail/fiches-min-travail.json')

FICHES_MINISTERE_TRAVAIL = []

def populate_fiches_ministere_travail(json_file=JSON_FICHES):
    """
    Split each "fiche ministere travail" into multiple items: 1 item by subsection.
    In most of the cases, the subsection's title is formulated as a question.
    """

    with open(json_file) as json_data:

        data = json.load(json_data)

        for item in data:
            fiche_title = item['title']

            # Extract a prefix from the main fiche's title. It'll be used to avoid losing the context
            # by using the subsection's title alone.
            prefix_title = fiche_title

            if '(' in fiche_title and fiche_title.count('(') == 1:
                # If there is only one opening parenthesis, assume that the value between parenthesis
                # is an acronym: use it as the prefix.
                prefix_title = fiche_title[fiche_title.find('(') + 1:fiche_title.find(')')]
            elif ':' in fiche_title:
                # Otherwise use the part before the first colon.
                prefix_title = fiche_title.split(':')[0]

            prefix_title = ' '.join(prefix_title.split())  # Replace multiple spaces by a single space.

            for section in item['text_by_section']:

                section_title = section['title']

                # Remove '1)', '2)', '3)' etc.
                section_title = re.sub(r'\d\)', '', section_title)

                # Remove 'Question 1 : ', 'Question 2 : ' etc.
                section_title = re.sub(r'question\s?\d\s?:?\s?', '', section_title, flags=re.IGNORECASE)

                # Replace multiple spaces by a single space.
                section_title = ' '.join(section_title.split())

                if re.match(r'POUR ALLER PLUS LOIN', section_title, re.IGNORECASE):
                    continue

                if re.match(r'L.INFO EN PLUS', section_title, re.IGNORECASE):
                    continue

                if prefix_title not in section_title:

                    section_title = section_title[0].lower() + section_title[1:]  # Lowercase first char.
                    section_title = f"{prefix_title} : {section_title}"

                    for pattern in [
                        '5 questions réponses sur ',
                        '5 questions sur ',
                        '5 questions-réponses sur ',
                        '5 questions/réponses sur ',
                    ]:
                        section_title = section_title.replace(pattern, '')
                        section_title = section_title[0].upper() + section_title[1:]

                FICHES_MINISTERE_TRAVAIL.append({
                    'title': section_title,
                    'text': section['text'],
                    'html': item.get("html"),
                    'url': section['url'],
                })

    logger.debug('-' * 80)
    logger.debug(pformat(FICHES_MINISTERE_TRAVAIL))


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument('--verbose', '-v', action='store_true')
    args = parser.parse_args()

    if args.verbose:
        logger.setLevel(logging.DEBUG)

    populate_fiches_ministere_travail()

else:

    populate_fiches_ministere_travail()
