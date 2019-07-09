FROM docker.elastic.co/elasticsearch/elasticsearch:7.2.0

RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install --silent analysis-icu

COPY ./elasticsearch/elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml

COPY ./dataset/synonyms/synonyms.txt /usr/share/elasticsearch/config/analysis/synonyms.txt
