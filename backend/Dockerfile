FROM node:12.2.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
COPY ./src /app/src
COPY tsconfig.json /app/tsconfig.json
RUN npm run build
COPY ./models /app/models
EXPOSE 1337
CMD ["node", "./build/index.js"]