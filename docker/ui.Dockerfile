# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

COPY packages/marketplace-ui .

# RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install

RUN yarn install

WORKDIR /app/applications/marketplace-demo

# Expose the port that the application will run on
EXPOSE 3000

# # Start the application
CMD ["yarn", "dev"]