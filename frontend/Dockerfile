FROM node 
WORKDIR /app
COPY yarn.lock yarn.lock 
COPY package.json package.json
RUN yarn install
COPY . .
CMD ["yarn", "build"]
 
