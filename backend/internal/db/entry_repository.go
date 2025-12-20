package db

import (
	"context"
	"database/sql"
	"time"

	"github.com/EliasLd/Serenite/internal/crypto"
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

func ListEntries(userID int, encryptionKey string) ([]*Entry, error) {
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
		if entry.Thing1, err = crypto.Decrypt(entry.Thing1, encryptionKey); err != nil {
			return nil, err
		}
		if entry.Why1, err = crypto.Decrypt(entry.Why1, encryptionKey); err != nil {
			return nil, err
		}
		if entry.Thing2, err = crypto.Decrypt(entry.Thing2, encryptionKey); err != nil {
			return nil, err
		}
		if entry.Why2, err = crypto.Decrypt(entry.Why2, encryptionKey); err != nil {
			return nil, err
		}
		if entry.Thing3, err = crypto.Decrypt(entry.Thing3, encryptionKey); err != nil {
			return nil, err
		}
		if entry.Why3, err = crypto.Decrypt(entry.Why3, encryptionKey); err != nil {
			return nil, err
		}

		entries = append(entries, &entry)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return entries, nil
}

func GetEntryByDate(userID int, entryDate time.Time, encryptionKey string) (*Entry, error) {
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

	// Decipher entries
	if entry.Thing1, err = crypto.Decrypt(entry.Thing1, encryptionKey); err != nil {
		return nil, err
	}
	if entry.Why1, err = crypto.Decrypt(entry.Why1, encryptionKey); err != nil {
		return nil, err
	}
	if entry.Thing2, err = crypto.Decrypt(entry.Thing2, encryptionKey); err != nil {
		return nil, err
	}
	if entry.Why2, err = crypto.Decrypt(entry.Why2, encryptionKey); err != nil {
		return nil, err
	}
	if entry.Thing3, err = crypto.Decrypt(entry.Thing3, encryptionKey); err != nil {
		return nil, err
	}
	if entry.Why3, err = crypto.Decrypt(entry.Why3, encryptionKey); err != nil {
		return nil, err
	}

	return &entry, nil
}

func CreateEntry(entry *Entry, encryptionKey string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	// cipher each entry
	thing1Enc, err := crypto.Encrypt(entry.Thing1, encryptionKey)
	if err != nil {
		return err
	}
	why1Enc, err := crypto.Encrypt(entry.Why1, encryptionKey)
	if err != nil {
		return err
	}
	thing2Enc, err := crypto.Encrypt(entry.Thing2, encryptionKey)
	if err != nil {
		return err
	}
	why2Enc, err := crypto.Encrypt(entry.Why2, encryptionKey)
	if err != nil {
		return err
	}
	thing3Enc, err := crypto.Encrypt(entry.Thing3, encryptionKey)
	if err != nil {
		return err
	}
	why3Enc, err := crypto.Encrypt(entry.Why3, encryptionKey)
	if err != nil {
		return err
	}

	query := `
		INSERT INTO entries (user_id, entry_date, thing_1, why_1, thing_2, why_2, thing_3, why_3, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
		RETURNING id, created_at, updated_at
	`

	return DB.QueryRowContext(ctx, query,
		entry.UserID, entry.EntryDate,
		thing1Enc, why1Enc,
		thing2Enc, why2Enc,
		thing3Enc, why3Enc,
	).Scan(&entry.ID, &entry.CreatedAt, &entry.UpdatedAt)
}
