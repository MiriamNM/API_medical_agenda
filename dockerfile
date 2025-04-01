FROM node:18-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

RUN npm install --save-dev typescript ts-node

COPY . .

EXPOSE 5050

CMD ["npx", "ts-node", "src/server.ts", "run", "start"]

