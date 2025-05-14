FROM node:alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

COPY package*.json .

RUN pnpm install

COPY . .

EXPOSE 3000
CMD ["pnpm", "run", "dev"]
