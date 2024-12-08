FROM node:22 as build

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/www /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
