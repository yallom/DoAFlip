FROM golang:1.25-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

RUN go mod tidy

COPY . .

RUN go install github.com/air-verse/air@latest

EXPOSE 8080

CMD ["air", ".air.toml"]
