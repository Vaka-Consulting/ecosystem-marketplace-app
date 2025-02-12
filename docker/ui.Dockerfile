# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

COPY packages/marketplace-ui .

COPY assets/public/ ./applications/marketplace-demo/public

COPY assets/collections.json ./applications/marketplace-demo/src/data/collections.json

# RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install

RUN yarn install

WORKDIR /app/applications/marketplace-demo

# Expose the port that the application will run on
EXPOSE 3000

# # Start the application
CMD ["bash", "-c", "yarn build  && yarn start"]