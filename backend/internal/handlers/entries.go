package handlers

import (
	"errors"
	"net/http"
	"strconv"
)

type entryResponse struct {
	ID        int    `db:"id"`
	EntryDate string `db:"entry_date"`
	Thing1    string `db:"thing_1"`
	Why1      string `db:"why_1"`
	Thing2    string `db:"thing_2"`
	Why2      string `db:"why_2"`
	Thing3    string `db:"thing_3"`
	Why3      string `db:"why_3"`
	CreatedAt string `db:"created_at"`
	UpdatedAt string `db:"updated_at"`
}

type createEntryRequest struct {
	EntryDate string `db:"entry_date"`
	Thing1    string `db:"thing_1"`
	Why1      string `db:"why_1"`
	Thing2    string `db:"thing_2"`
	Why2      string `db:"why_2"`
	Thing3    string `db:"thing_3"`
	Why3      string `db:"why_3"`
}

func ListEntriesHandler(w http.ResponseWriter, r *http.Request) {
	//TODO
}

func CreateEntryHandler(w http.ResponseWriter, r *http.Request) {
	//TODO
}

func GetEntryDateHandler(w http.ResponseWriter, r *http.Request) {
	//TODO
}
