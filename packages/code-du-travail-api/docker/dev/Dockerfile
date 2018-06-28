FROM node:9.11.2-alpine

COPY . /app

WORKDIR /app

RUN npm install

# In development: we mount the local source code in the container and start the main
# process through Nodemon so changes in code are taken into account automatically.
ENTRYPOINT ["npm", "run", "start.dev"]
