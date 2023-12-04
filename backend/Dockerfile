FROM node:16-alpine

WORKDIR /app

COPY package.json ./
RUN npm install -g nodemon

RUN npm install

COPY . .

CMD ["node", "-r", "nodemon", "index.js"]x