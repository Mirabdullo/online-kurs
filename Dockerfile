FROM node:alpine

WORKDIR /src

COPY /*.json ./

COPY . .

RUN npm i && npm run build

EXPOSE 3005

CMD ["npm","run","start:dev"]
