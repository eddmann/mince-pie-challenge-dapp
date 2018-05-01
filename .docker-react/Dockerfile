FROM node:9.11-alpine
RUN mkdir -p /src
WORKDIR /src
RUN apk --no-cache add bash ca-certificates wget git python make alpine-sdk
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://raw.githubusercontent.com/sgerrand/alpine-pkg-glibc/master/sgerrand.rsa.pub && \
  wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.27-r0/glibc-2.27-r0.apk && \
  apk add glibc-2.27-r0.apk && \
  rm -f glibc-2.27-r0.apk
RUN yarn global add create-react-app@1.5.2
EXPOSE 3000
