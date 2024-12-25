FROM node:20-alpine

WORKDIR /Form-validater


COPY package*.json ./


RUN npm install


COPY . . 


EXPOSE 3003


CMD ["npm" , "run" , "dev"]