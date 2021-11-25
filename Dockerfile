FROM node:14-stretch

ENV workdir /var/prod

WORKDIR ${workdir}

COPY *.json .
COPY src ./src

RUN npm install
RUN npm run build

EXPOSE 7000
CMD ["npm", "run", "start"]
