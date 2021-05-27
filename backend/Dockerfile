FROM node:15.6.0

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src src
COPY tsconfig.json .
COPY tsoa.json .

ENV PORT=4000
EXPOSE 4000

RUN yarn build:all

COPY migrate.json .
COPY .eslintignore .
COPY .eslintrc.json .
COPY .prettierrc.json .
COPY jest.config.js .

CMD ["yarn", "start"]
