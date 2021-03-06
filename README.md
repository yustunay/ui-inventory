# JARLOVEIN INVENTORY FRONTEND APPLICATION
For barcode scanner, (by Kataykin) "QR & Scanner POST & GET request to server" application is used.

## Create a Dockerfile
```
# base image
FROM node:12.14.0

# install chrome for protractor tests
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.21

# add app
COPY . /app

# start app
CMD ng serve -c dev --host 0.0.0.0
```

## Build The Image From Dockerfile
```
 docker build -t yustunay/inventory-ui .
```
## Run The Container With The Built Image
```
docker run -d --name inventory-ui -p 4200:4200 yustunay/inventory-ui:latest
```