FROM node:18
WORKDIR /app
COPY . .
RUN npm install
ENV CI=false
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
