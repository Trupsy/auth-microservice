FROM node:20.12.2

WORKDIR /app

# Uygulama bağımlılıklarını yükle (ilk çalıştırmada)
COPY ./package*.json .
COPY ./src .
COPY ./scripts .
COPY ./tsconfig.json .



# Uygulamayı başlat
CMD ["npm", "run", "start"]
