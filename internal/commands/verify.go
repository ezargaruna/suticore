package commands

import (
	"fmt"
	"os"
)

func Verify() {

	items := []string{
		"README.md",
		"LICENSE",
		"SYSTEM_MAP.md",
		"suti.yaml",

		"specificationes",
		"normae",
		"protocolla",
		"runtime",
		"implementationes",
		"investigationes",
		"projecta",
		"atlas",
		"templates",
	}

	issues := 0

	for _, item := range items {
		if _, err := os.Stat(item); err != nil {
			fmt.Printf("✗ %s\n", item)
			issues++
		} else {
			fmt.Printf("✓ %s\n", item)
		}
	}

	fmt.Println()

	if issues == 0 {
		fmt.Println("Repository OK")
	} else {
		fmt.Printf("%d issue(s) found\n", issues)
		os.Exit(1)
	}
}
