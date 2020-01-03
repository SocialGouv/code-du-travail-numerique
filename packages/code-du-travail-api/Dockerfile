FROM node:12.14-alpine3.10

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn --production --frozen-lockfile --no-cache

USER node

COPY ./node_modules/@cdt /app/node_modules/@cdt
COPY ./src /app/src

# COPY --from=cdtn-base-image /app/node_modules/@cdt/data...courrier-type /node_modules/@cdt/data...courrier-type

ENTRYPOINT ["yarn", "start"]
