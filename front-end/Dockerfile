FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY public/ public/
COPY index.html ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY src/ src/

CMD ["npm", "run", "dev"]