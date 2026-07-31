package main

import (
	"fmt"
	"os"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("SUTI CLI")
		fmt.Println()
		fmt.Println("commands:")
		fmt.Println("  init")
		fmt.Println("  new")
		fmt.Println("  doctor")
		fmt.Println("  verify")
		return
	}

	switch os.Args[1] {

	case "init":
		fmt.Println("Initializing SUTI project...")

	case "doctor":
		fmt.Println("Repository OK")

	case "verify":
		fmt.Println("Verification not implemented")

	case "new":
		fmt.Println("Generator not implemented")

	default:
		fmt.Println("Unknown command:", os.Args[1])
	}
}
