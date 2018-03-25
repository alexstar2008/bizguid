FROM node:9.5.0

RUN mkdir -p /bizguid
WORKDIR /bizguid

COPY package.json /bizguid
RUN npm run preinstall
RUN npm install

COPY . /bizguid
RUN chmod -R 777 /bizguid

EXPOSE 3005

CMD ['pm2','app.js']