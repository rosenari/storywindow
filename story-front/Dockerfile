FROM node:12
WORKDIR /use/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

RUN npm run build
CMD npm run start