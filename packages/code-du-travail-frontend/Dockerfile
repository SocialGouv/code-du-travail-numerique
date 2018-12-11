ARG BASE_IMAGE=socialgouv/code-du-travail-numerique:master

FROM ${BASE_IMAGE}

WORKDIR /app

ENTRYPOINT ["yarn", "workspace", "@cdt/frontend", "start"]
