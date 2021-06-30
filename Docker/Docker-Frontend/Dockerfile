FROM node:14.16.0-alpine as node

RUN mkdir -p /usr/src/schoolapp

WORKDIR /usr/src/schoolapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=node /usr/src/schoolapp/dist/activeschool/ /usr/share/nginx/html