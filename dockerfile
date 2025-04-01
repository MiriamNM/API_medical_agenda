FROM node:18-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install --only=production

# Instala las dependencias de desarrollo para ts-node y typescript
RUN npm install --save-dev ts-node typescript

COPY . .

EXPOSE ${PORT}

# Ejecuta ts-node con el archivo server.ts
CMD ["npx", "ts-node", "src/server.ts"]

