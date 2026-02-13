FROM golang:1.16-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

RUN go mod tidy

COPY . .

RUN go install github.com/air-verse/air@latest

CMD ["air", ".air.toml"]
