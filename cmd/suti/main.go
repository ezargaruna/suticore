package main

import (
	"os"

	"github.com/ezargaruna/suticore/internal/commands"
)

func main() {
	if len(os.Args) < 2 {
		commands.Doctor()
		return
	}

	switch os.Args[1] {
	case "init":
		commands.Init()

	case "new":
		commands.New(os.Args[2:])

	case "doctor":
		commands.Doctor()

	case "verify":
		commands.Verify()

	default:
		commands.Doctor()
	}
}
