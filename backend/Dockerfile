FROM oven/bun:1.3.5-alpine

WORKDIR /app

COPY package.json  bun.lock ./

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "dev"]
