#Stage 1
############################################
FROM node:18-alpine3.17 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install 
COPY . .
RUN NODE_ENV=production npm run build

#Stage 2
#######################################
FROM nginx AS final
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
