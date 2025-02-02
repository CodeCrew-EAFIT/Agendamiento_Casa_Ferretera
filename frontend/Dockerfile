FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN NODE_ENV=production npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]