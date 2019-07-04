FROM docker.elastic.co/elasticsearch/elasticsearch:7.2.0

RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install --silent analysis-icu

COPY ./elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml

