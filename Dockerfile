### STAGE 1: Build ###
FROM node:12.7-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM base AS build
RUN npm run build

FROM base AS dev
WORKDIR /app
ENTRYPOINT [ "npm", "run","start", "--", "--host", "0.0.0.0" ]

### STAGE 2: Run ### 
FROM nginx:1.17.1-alpine AS final
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/web /usr/share/nginx/html