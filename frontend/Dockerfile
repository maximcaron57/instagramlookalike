FROM node:15.6.0

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --network-timeout 100000

COPY src src
COPY public public
COPY tsconfig.json .

EXPOSE 3000

COPY .storybook .storybook
COPY .eslintignore .
COPY .eslintrc.json .
COPY .prettierrc.json .

CMD ["yarn", "start"]
