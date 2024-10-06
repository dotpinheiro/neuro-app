FROM node:22

COPY . /www/app

RUN npm install -g @ionic/cli

WORKDIR /www/app
RUN npm install

EXPOSE 8100

ENTRYPOINT ["ionic"]
CMD ["serve", "8100", "--address", "0.0.0.0"]