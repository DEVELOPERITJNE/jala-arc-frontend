FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:stag

FROM nginx:alpine

# hapus default conf
RUN rm /etc/nginx/conf.d/default.conf

# copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy hasil build
# COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html/app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
