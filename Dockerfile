FROM node:carbon

#create app directory
WORKDIR /usr/src/app

COPY package*.json ./

#install dependencies
RUN npm install

#bundle app source

COPY . .

#port   
EXPOSE 8080
CMD [ "npm", "start" ]