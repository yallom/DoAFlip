FROM node:24-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install
RUN rm -rf node_modules && npm install

# Copy source code
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]