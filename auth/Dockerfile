FROM node:4.2.6

RUN mkdir /src
WORKDIR /src

ADD ./package.json /src/package.json
RUN npm install

ADD . /src

EXPOSE 80

CMD node server.js