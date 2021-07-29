FROM node:14-alpine AS build 
WORKDIR /app

RUN apk update && apk add python make g++

 
COPY ["package.json", "yarn.lock", "./"] 
RUN yarn --frozen-lockfile 

COPY . . 
 
RUN yarn build 
 
 
FROM node:14-alpine 
WORKDIR /app
 
ENV NODE_ENV production 
 
COPY ["package.json", "yarn.lock", "./"] 
RUN yarn --production 
 
COPY --from=build /app/dist ./dist 
COPY .env . 
COPY credentials.json . 
 
CMD ["node", "/dist/index.js"]