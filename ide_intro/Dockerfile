FROM node:18

WORKDIR /app

COPY package.json ./
COPY test.js .

EXPOSE 3000

CMD [ "node", "test.js" ]