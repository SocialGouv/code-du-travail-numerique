FROM elasticsearch:7.17.8

WORKDIR /usr/share/elasticsearch

RUN set -x \
  #
  && bin/elasticsearch-plugin install --silent analysis-icu \
  && bin/elasticsearch-keystore create \
  #
  ;

COPY ./elasticsearch.yml config/elasticsearch.yml
