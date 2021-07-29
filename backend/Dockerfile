FROM node:14-alpine AS build

COPY ["package.json", "yarn.lock", "./"]
RUN yarn --frozen-lockfile

ENV NODE_ENV production

COPY . .

RUN yarn build


FROM node:14-alpine

ENV NODE_ENV production

COPY ["package.json", "yarn.lock", "./"]
RUN yarn --production

COPY --from=build /dist /dist
COPY .env .
COPY credentials.json .

CMD ["node", "/dist/index.js"]