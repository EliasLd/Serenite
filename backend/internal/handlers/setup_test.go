package handlers

import (
	"os"
	"testing"

	"github.com/EliasLd/Serenite/config"
	"github.com/EliasLd/Serenite/internal/testutil"
)

var testCfg *config.Config
var env_file_path string = "../../.env"

func TestMain(m *testing.M) {
	testCfg = config.LoadConfig(env_file_path)
	code := m.Run()
	testutil.TeardownTestDB()
	os.Exit(code)
}
