FROM node:carbon

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install typescript -g

COPY ./ ./

RUN tsc

EXPOSE 3009

CMD ["npm","start"]
