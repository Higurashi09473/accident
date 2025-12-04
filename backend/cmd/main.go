package main

import (
	"accident/internal/storage"
	postgresql "accident/internal/storage/postgres"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"database/sql"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/go-chi/render"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "user"
	password = "password"
	dbname   = "mydatabase"
)

func main() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)

	postgresql.New(db)

	if err != nil {
		panic(err)
	}
	defer db.Close()

	r := chi.NewRouter()

	// A good base middleware stack
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	r.Post("/", func(w http.ResponseWriter, r *http.Request) {
		var arr []storage.Data
		body, _ := io.ReadAll(r.Body)
		if err := json.Unmarshal([]byte(body), &arr); err != nil {
			log.Println(err)
		}
		postgresql.AddData(db, arr)
	})

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		arr, err := postgresql.FetchData(db)
		if err != nil {
			log.Println(err)
		}
		render.JSON(w, r, arr)
	})

	

	http.ListenAndServe(":3333", r)
}
