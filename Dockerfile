#bin/bash
FROM ubuntu:20.04
MAINTAINER AVINASH
ENV DEBIAN_FRONTEND noninteractive
RUN apt update -y
RUN apt install curl nodejs npm -y
RUN npm install -g n
RUN n 12.22.12
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY . .
RUN npm install -g @angular/cli@12.2.17
RUN npm install -g @angular-devkit/schematics-cli
RUN npm install @angular/material
RUN npm i bootstrap
RUN npm i bootstrap --save -highchart
RUN npm i highcharts --save -angularhighchart
RUN npm i highcharts -angular --save -ng2filter
RUN npm i ng2 -search -filter
RUN npm i
CMD ng serve --host 0.0.0.0