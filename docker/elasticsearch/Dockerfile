FROM docker.elastic.co/elasticsearch/elasticsearch:7.3.1

RUN /usr/share/elasticsearch/bin/elasticsearch-plugin install --silent analysis-icu


RUN echo whoami
USER root
RUN sysctl -w vm.max_map_count=262144

COPY ./elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml

