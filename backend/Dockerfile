FROM oven/bun:1.3.5-alpine

WORKDIR /app

COPY package.json  bun.lock ./

RUN bun install

COPY . .

RUN bunx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "bunx prisma migrate deploy && bun dev"]
