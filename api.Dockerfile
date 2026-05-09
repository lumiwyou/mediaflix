FROM node:alpine as development
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
# Do not change order, src updates will cause reinstallation of dependencies again if COPY . . is before RUN
COPY . .
RUN npm run build

FROM node:alpine as production
ARG NODE_ENV=production
ARG NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci --only-production
COPY --from=development /usr/src/app/dist ./dist
CMD [ "node", "./dist/index.js" ]