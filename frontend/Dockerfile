FROM node:4.2.6

RUN mkdir /src
WORKDIR /src

RUN npm install -g bower

ADD ./package.json /src/package.json
RUN npm install

ADD ./bower.json /src/bower.json
ADD ./.bowerrc /src/.bowerrc
RUN bower install --allow-root

ADD . /src

EXPOSE 80

CMD node server.js