FROM node:23-alpine3.20
WORKDIR /user/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm","start" ]

# docker build -t server .
# docker run -p 8000:8000 --name backend -d server