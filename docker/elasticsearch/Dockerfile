FROM elasticsearch:7.13.4

WORKDIR /usr/share/elasticsearch

RUN bin/elasticsearch-plugin install --silent analysis-icu

RUN  bin/elasticsearch-keystore create

COPY ./elasticsearch.yml config/elasticsearch.yml
