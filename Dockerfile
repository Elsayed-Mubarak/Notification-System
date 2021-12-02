# Pull node image from docker hub
FROM node:14-stretch

#making sure that container isn't running as root
RUN addgroup  nodejs && adduser   -S -s  /bin/bash -g  nodejs nodejs
RUN chown nodejs:nodejs  /var/
USER nodejs

ENV workdir /var/prod

WORKDIR ${workdir}
COPY *.json .
# Copy existing application directory contents
COPY src ./src

# install all dependencies
RUN npm cache clean --force
RUN npm install
RUN npm run build

EXPOSE 7000
CMD ["npm", "run", "start"]
