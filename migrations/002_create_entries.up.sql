CREATE TABLE entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL,
    thing_1 TEXT NOT NULL,
    why_1 TEXT NOT NULL,
    thing_2 TEXT NOT NULL,
    why_2 TEXT NOT NULL,
    thing_3 TEXT NOT NULL,
    why_3 TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, entry_date)
);
