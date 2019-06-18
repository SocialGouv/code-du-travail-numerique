FROM python:3.7.2-stretch

ENV PYTHONIOENCODING="UTF-8"
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=.

WORKDIR /app

COPY requirements.txt .

RUN python -m venv venv
RUN . venv/bin/activate
RUN pip install -r requirements.txt

COPY ./dataset/code_du_travail/themes.csv ./dataset/code_du_travail/themes.csv
COPY ./dataset/code_du_travail/code-du-travail.json ./dataset/code_du_travail/code-du-travail.json
COPY ./dataset/fiches_ministere_travail/fiches-min-travail.json ./dataset/fiches_ministere_travail/fiches-min-travail.json
COPY ./dataset/stop_words/stop_words.json ./dataset/stop_words/stop_words.json
COPY ./dataset/synonyms/synonyms.json ./dataset/synonyms/synonyms.json
COPY ./dataset/annuaire/annuaire.data.json ./dataset/annuaire/annuaire.data.json
COPY ./dataset/kali/kali.json ./dataset/kali/kali.json
COPY ./dataset/fiches_service_public/fiches-sp-travail.json ./dataset/fiches_service_public/fiches-sp-travail.json
COPY ./dataset/themes/themes.json ./dataset/themes/themes.json
COPY ./dataset/faq.json ./dataset/faq.json
COPY ./dataset/faq-contributions.json ./dataset/faq-contributions.json
COPY ./dataset/faq-snippets.json ./dataset/faq-snippets.json
COPY ./dataset/export-courriers.json ./dataset/export-courriers.json
COPY ./dataset/outils.json ./dataset/outils.json

COPY ./search ./search

ENTRYPOINT ["python", "/app/search/indexing/create_indexes.py"]
