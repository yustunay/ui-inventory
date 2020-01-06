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
#CMD ng serve -c dev --host 0.0.0.0 --ssl true --ssl-key /home/vfnet/orbitant/workspace/ssl/config/orbitant.key --ssl-cert /home/vfnet/orbitant/workspace/ssl/config/orbitant.crt
#CMD ng serve -c dev --host 0.0.0.0 --ssl true --ssl-key /src/keys/orbitant.key --ssl-cert /src/keys/orbitant.crt
#CMD ng serve -c dev --host 0.0.0.0 --disableHostCheck true
CMD ng serve -c dev --host 0.0.0.0
