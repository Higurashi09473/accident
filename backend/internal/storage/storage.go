package storage

type Data struct {
	Id          int64     `json:"id"`
	Type        string    `json:"type"`
	District    string    `json:"district"`
	Severity    string    `json:"severity"`
	Timestamp   string    `json:"timestamp"`
	Coordinates []float64 `json:"coordinates"`
	Source      string    `json:"source"`
}

type GeoPoint struct {
	Type       string     `json:"type"`
	Geometry   Geometry   `json:"geometry"`
	Properties Properties `json:"properties"`
}

type Geometry struct {
	Type        string    `json:"type"`
	Coordinates []float64 `json:"coordinates"`
}

type Properties struct {
	Type      string `json:"type"`
	District  string `json:"district"`
	Severity  int64  `json:"severity"`
	Timestamp string `json:"timestamp"`
	Source    string `json:"source"`
}

type ResponseMost struct {
	Item string `json:"district"`
	Count   int64  `json:"amount"`
}
