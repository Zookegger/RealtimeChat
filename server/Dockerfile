FROM node:22-alpine

# Set working directory to /app (common convention)
WORKDIR /app

# Copy package.json first for better layer caching
COPY package*.json ./ 

# Install dependencies
RUN npm install

# Copy entire server directory contents (including src)
COPY . .

# Expose server port
EXPOSE 5000

CMD ["npm", "start"]