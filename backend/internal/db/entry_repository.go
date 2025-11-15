package db

import (
	"context"
	"time"
)

type Entry struct {
	ID        int       `db:"id"`
	UserID    int       `db:"user_id"`
	EntryDate time.Time `db:"entry_date"`
	Thing1    string    `db:"thing_1"`
	Why1      string    `db:"why_1"`
	Thing2    string    `db:"thing_2"`
	Why2      string    `db:"why_2"`
	Thing3    string    `db:"thing_3"`
	Why3      string    `db:"why_3"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

type EntryRepository interface {
	ListEntries(ctx context.Context, userID int) ([]*Entry, error)
	GetEntryByDate(cts context.Context, userID int, entryDate time.Time) (*Entry, error)
	CreateEntry(ctx context.Context, entry *Entry) error
}
