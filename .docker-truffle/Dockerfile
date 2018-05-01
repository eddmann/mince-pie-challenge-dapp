FROM node:9.11-alpine
RUN mkdir -p /src
WORKDIR /src
RUN apk add -t .gyp --no-cache git python g++ make \
    && npm install -g truffle@4.1.x \
    && apk del .gyp
ENTRYPOINT ["truffle"]
