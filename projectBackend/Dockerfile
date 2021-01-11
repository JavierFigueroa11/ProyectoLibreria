FROM node:alpine

RUN mkdir -p /usr/src/app/api
WORKDIR /usr/src/app/api

COPY package.json /usr/src/app/api/

RUN npm install
COPY . /usr/src/app/api

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && node app.js

EXPOSE 5555