# First stage: build the application
FROM node:14 AS builder

# Set the working directory inside the Docker image
WORKDIR /app

# Copy package.json and package-lock.json to the Docker image
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the rest of the application code to the Docker image
COPY . .

# Build the application
RUN npm run build

# Second stage: run the application
FROM node:14-alpine AS runner

# Set the working directory inside the Docker image
WORKDIR /app

# Copy the built application from the first stage to the second stage
COPY --from=builder /app/dist ./dist

# Install production Node.js dependencies
COPY package*.json ./
RUN npm install --only=production

# Expose the port the application listens on
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
