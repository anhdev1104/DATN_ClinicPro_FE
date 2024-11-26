FROM node:20-alpine

WORKDIR /datn-clinicpro

ARG ENV

COPY package*.json ./

RUN yarn install

# Note: Make sure to pass ENV when building the image,
# otherwise, the COPY command below will fail because it won't find the .env.${ENV} file.
COPY . .
COPY .env.${ENV} .env

EXPOSE 8080

CMD ["yarn", "dev"]
