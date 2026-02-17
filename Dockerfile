FROM node:16.20.2-alpine
WORKDIR /var/www/app
ADD package.json .
ADD package-lock.json .
RUN npm install
ADD . .
ENV PORT 3000
ENV LIVERELOAD_PORT 35729
EXPOSE ${PORT}
EXPOSE ${LIVERELOAD_PORT}
