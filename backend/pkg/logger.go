package pkg

import (
	"log/slog"
	"os"
)

func InitLogger(env string) func() {
	var handler slog.Handler
	var file *os.File
	var err error

	switch env {
	case "prod":
		file, err = os.OpenFile("app.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
		if err != nil {
			slog.Error("Failed to open log file", "error", err)
			handler = slog.NewJSONHandler(os.Stdout, nil)
		} else {
			handler = slog.NewJSONHandler(file, &slog.HandlerOptions{
				Level: slog.LevelInfo,
			})
		}

	default:
		handler = slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
			Level: slog.LevelDebug,
		})
	}

	logger := slog.New(handler)
	slog.SetDefault(logger)

	return func() {
		if file != nil {
			file.Close()
		}
	}
}
