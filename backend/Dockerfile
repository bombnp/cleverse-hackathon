FROM node:14-alpine AS build

COPY ["package.json", "yarn.lock", "./"]
RUN yarn --frozen-lockfile

ENV NODE_ENV production

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "/dist/index.js"]