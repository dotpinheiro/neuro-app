FROM node:22

COPY . /www/app

RUN npm install -g @ionic/cli

WORKDIR /www/app
RUN npm install

EXPOSE 8100

CMD ["ionic","serve", "--external", "--public-host=neuroapp.sa.pinheiro.tech"]