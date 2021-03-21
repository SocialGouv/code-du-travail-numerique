FROM node:14.16-alpine3.13

WORKDIR /app

USER node

# WARN(douglasduteil): whilelisted the docker monorepo vision
# see the root .dockerignore if you change this file !!!

# NOTE(douglasduteil): copy the production ready node_modules...
# As Next.js cannot be bundle with the ssr system we need all the dependencies...
# To ensure that the node_modules are correctly provided, we mirrot the monorepo structure
# Make sure to build this Dockerfile from the monorepo root !
#
# The node_modules to copy below can be generated with :
# $ yarn exec yarn-workspace-focus-install -- --cwd packages/code-du-travail-frontend --production
COPY ./node_modules /node_modules
COPY ./packages/code-du-travail-frontend/node_modules /app/node_modules

COPY ./packages/code-du-travail-frontend/public /app/public
COPY ./packages/code-du-travail-frontend/server /app/server
COPY ./packages/code-du-travail-frontend/.next /app/.next
COPY ./packages/code-du-travail-frontend/package.json /app/

ENV NEXT_TELEMETRY_DISABLED=1

ENTRYPOINT ["yarn", "start"]
