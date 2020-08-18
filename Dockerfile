FROM node:14

WORKDIR /app

COPY ./package.json .

RUN npm install yarn 

RUN rm -fr node_modules && yarn

COPY . .

EXPOSE 3000

CMD yarn watch:dev
