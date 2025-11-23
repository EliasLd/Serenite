package handlers

import (
	"os"
	"testing"

	"github.com/EliasLd/Serenite/config"
	"github.com/EliasLd/Serenite/internal/testutil"
)

var testCfg *config.Config

func TestMain(m *testing.M) {
	testCfg = config.LoadConfig()
	code := m.Run()
	testutil.TeardownTestDB()
	os.Exit(code)
}
