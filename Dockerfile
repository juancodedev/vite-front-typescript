FROM node:alpine
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@latest

# Configure pnpm
RUN pnpm config set store-dir /app/.pnpm-store

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Explicitly install MUI packages to ensure they're available
RUN pnpm install @mui/x-data-grid@^8.4.0 @mui/x-data-grid-generator@^8.4.0

# Install sweetalert2 dependencies
RUN pnpm install sweetalert2 sweetalert2-react-content

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 5173

# Start the application
CMD ["pnpm", "run", "dev"]
