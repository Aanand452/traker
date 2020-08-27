FROM node:12

WORKDIR /app

COPY ./package.json .

RUN npm install yarn 

RUN yarn

COPY . .

EXPOSE 3000

CMD yarn workspace @sara/server watch:dev
