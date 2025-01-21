# Use a lightweight Node.js image
FROM node:18-alpine

# Install system dependencies required for Prisma and OpenSSL
RUN apk add --no-cache \
    openssl \
    bash \
    libc6-compat

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate --schema=src/prisma/schema.prisma

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]