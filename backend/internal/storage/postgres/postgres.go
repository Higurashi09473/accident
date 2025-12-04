package postgresql

import (
	"accident/internal/storage"
	"database/sql"
	"fmt"
	"log"

	"github.com/lib/pq"
)

func New(db *sql.DB) error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS data(
			id integer unique,
			type TEXT,
			district TEXT,
			severity TEXT, 
			timestamp TIMESTAMPTZ,
			coordinates FLOAT8[], 
			source TEXT
	);`)
	if err != nil {
		log.Fatal("Ошибка при выполнении запроса:", err)
		return err
	}
	log.Println("Таблица 'data' успешно создана.")
	return nil
}

func AddData(db *sql.DB, arr []storage.Data) (error) {
	sqlStatement := `INSERT INTO data
		(id, type, district, severity, timestamp, coordinates, source)
		VALUES($1, $2, $3, $4, $5, $6, $7);`

	for _, item := range arr {
		_, err := db.Exec(sqlStatement, item.Id, item.Type, item.District, item.Severity, item.Timestamp, pq.Array(item.Coordinates), item.Source)
		if err != nil {
			log.Fatal("Ошибка при выполнении запроса:", err)
			return err
		}
	}
	log.Println("Успех")
	return nil
}

func FetchData(db *sql.DB) ([]storage.GeoPoint, error){
	sqlStatement := `SELECT type, coordinates, district, severity, timestamp, source
					FROM data;`
	// sqlStatement := `SELECT type, coordinates
	//  				FROM data;`
	
	rows, err := db.Query(sqlStatement)
	if err != nil {
		return nil, fmt.Errorf("query: %w", err)
	}
	
	var arr []storage.GeoPoint

	for rows.Next() {
		var severity string
		var point storage.GeoPoint 	
		point.Geometry.Type = "Point"
		point.Type = "Feature"
		if err := rows.Scan(&point.Properties.Type,  pq.Array(&point.Geometry.Coordinates), &point.Properties.District, &severity, &point.Properties.Timestamp, &point.Properties.Source); err != nil {
			return nil, err
		}

		if severity == "низкая" {
			point.Properties.Severity = 1
		} else if severity == "средняя"{
			point.Properties.Severity = 2
		}else if severity == "высокая"{
			point.Properties.Severity = 3
		}
		arr = append(arr, point)
	}
	return arr, nil
}