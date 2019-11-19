FROM docker.elastic.co/elasticsearch/elasticsearch:7.5.0

WORKDIR /usr/share/elasticsearch

RUN bin/elasticsearch-plugin install --silent analysis-icu

RUN  bin/elasticsearch-keystore create

COPY ./elasticsearch.yml  config/elasticsearch.yml

