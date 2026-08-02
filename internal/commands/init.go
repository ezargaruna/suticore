package commands

import (
	"fmt"
	"os"
)

func Init() {

	dirs := []string{
		"specificationes",
		"normae",
		"protocolla",
		"runtime",
		"implementationes",
		"investigationes",
		"projecta",
		"atlas",
		"templates",
		"assets/css",
		"assets/js",
		"assets/img",
		"assets/fonts",
	}

	for _, dir := range dirs {
		if err := os.MkdirAll(dir, 0755); err != nil {
			fmt.Println(err)
			return
		}
	}

	if _, err := os.Stat("suti.yaml"); os.IsNotExist(err) {

		cfg := `project: SUTIcore
version: 0.1.0

language: en
license: MIT

runtime: sreteniya
`

		if err := os.WriteFile("suti.yaml", []byte(cfg), 0644); err != nil {
			fmt.Println(err)
			return
		}
	}

	fmt.Println("SUTI project initialized.")
}
