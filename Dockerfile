FROM node:14-alpine
WORKDIR /app
COPY ./package.json .
RUN npm install -g nodemon
# RUN npm install debug
RUN npm install
COPY . .
RUN apk add openssl
RUN apk update && apk add bash
EXPOSE 8020

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

CMD npm run dev