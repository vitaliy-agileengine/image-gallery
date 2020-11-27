FROM node:14.5.0-alpine


COPY package.json /app/
COPY package-lock.json /app/

WORKDIR /app

RUN npm install

COPY . /app

CMD ["npm", "run", "serve", "--host", "0.0.0.0"]
