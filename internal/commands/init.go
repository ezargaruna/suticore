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

	fmt.Println("SUTI project initialized.")
}
