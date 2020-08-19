FROM node:12

WORKDIR /app

COPY ./package.json .

RUN npm install yarn 

RUN rm -fr node_modules && yarn

COPY . .

EXPOSE 3000

CMD cd packages/server/ && yarn watch:dev
