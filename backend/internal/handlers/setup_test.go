package handlers

import (
	"os"
	"testing"

	"github.com/EliasLd/Serenite/config"
	"github.com/EliasLd/Serenite/internal/testutil"
)

func TestMain(m *testing.M) {
	config.LoadConfig()
	code := m.Run()
	testutil.TeardownTestDB()
	os.Exit(code)
}
