FROM node:14-alpine AS build

WORKDIR /app
ENV NODE_ENV production

COPY ["package.json", "yarn.lock", "./"]

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "/dist/index.js"]