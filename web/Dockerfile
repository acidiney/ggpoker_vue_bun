FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build-only

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]