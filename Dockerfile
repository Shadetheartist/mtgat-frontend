FROM node:10.21

#vue serve default port
EXPOSE 8080

RUN npm install -g @vue/cli

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

CMD [ "npx", "vue-cli-service", "serve" ]
