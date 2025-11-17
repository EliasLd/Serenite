package db

import (
	"context"
	"database/sql"
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
	ListEntries(userID int) ([]*Entry, error)
	GetEntryByDate(userID int, entryDate time.Time) (*Entry, error)
	CreateEntry(entry *Entry) error
}

func ListEntries(userID int) ([]*Entry, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		SELECT id, user_id, entry_date, thing_1, why_1, thing_2, why_2, thing_3, why_3, created_at, updated_at
		FROM entries
		WHERE user_id = $1
		ORDER BY entry_date DESC
	`
	rows, err := DB.QueryContext(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var entries []*Entry
	for rows.Next() {
		var entry Entry
		err := rows.Scan(
			&entry.ID, &entry.UserID, &entry.EntryDate,
			&entry.Thing1, &entry.Why1,
			&entry.Thing2, &entry.Why2,
			&entry.Thing3, &entry.Why3,
			&entry.CreatedAt, &entry.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		entries = append(entries, &entry)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return entries, nil

}

func GetEntryByDate(userID int, entryDate time.Time) (*Entry, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var entry Entry
	query := `
		SELECT id, user_id, entry_date, thing_1, why_1, thing_2, why_2, thing_3, why_3, created_at, updated_at
		FROM entries
		WHERE user_id = $1 AND entry_date = $2	
	`
	err := DB.QueryRowContext(ctx, query, userID, entryDate).Scan(
		&entry.ID, &entry.UserID, &entry.EntryDate,
		&entry.Thing1, &entry.Why1,
		&entry.Thing2, &entry.Why2,
		&entry.Thing3, &entry.Why3,
		&entry.CreatedAt, &entry.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &entry, nil
}

func CreateEntry(entry *Entry) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		INSERT INTO entries (user_id, entry_date, thing_1, why_1, thing_2, why_2, thing_3, why_3, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
		RETURNING id, created_at, updated_at
	`

	return DB.QueryRowContext(ctx, query,
		entry.UserID, entry.EntryDate,
		entry.Thing1, entry.Why1,
		entry.Thing2, entry.Why2,
		entry.Thing3, entry.Why3,
	).Scan(&entry.ID, &entry.CreatedAt, &entry.UpdatedAt)
}
