FROM node:14.16-alpine3.13

WORKDIR /app

USER node

COPY ./.next /app/.next
COPY ./package.json /app/

ENV NEXT_TELEMETRY_DISABLED=1

ENTRYPOINT ["yarn", "start"]
