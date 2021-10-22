FROM node:14.17-alpine3.13

WORKDIR /app

COPY ./scripts /app/scripts

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

COPY ./packages/code-du-travail-data/package.json /app/packages/code-du-travail-data/package.json
COPY ./packages/code-du-travail-data/prime-precarite/package.json /app/packages/code-du-travail-data/prime-precarite/package.json
COPY ./packages/code-du-travail-data/simulateurs/package.json /app/packages/code-du-travail-data/simulateurs/package.json
COPY ./packages/code-du-travail-data/tools/package.json /app/packages/code-du-travail-data/tools/package.json
COPY ./packages/react-fiche-service-public/package.json /app/packages/react-fiche-service-public/package.json
COPY ./packages/sources/package.json /app/packages/sources/package.json
COPY ./packages/slugify/package.json /app/packages/slugify/package.json
COPY ./packages/react-ui/package.json /app/packages/react-ui/package.json
COPY ./packages/code-du-travail-api/package.json /app/packages/code-du-travail-api/package.json
COPY ./packages/code-du-travail-frontend/package.json /app/packages/code-du-travail-frontend/package.json
COPY ./packages/code-du-travail-modeles/package.json /app/packages/code-du-travail-modeles/package.json

RUN yarn install --prod --frozen-lockfile && yarn cache clean

COPY ./lerna.json /app/lerna.json
COPY ./packages /app/packages

RUN yarn build

CMD [ "yarn", "workspace", "@cdt/frontend", "start" ]
