FROM node:20.12.2

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY src .
COPY sh-files .
COPY tsconfig.json .


RUN npm install

RUN npm run build

CMD ["node", "dist/index.js"]