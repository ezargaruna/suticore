package commands

import (
	"fmt"

	"github.com/ezargaruna/suticore/internal/generator"
)

func New(args []string) {

	if len(args) < 2 {
		fmt.Println("usage:")
		fmt.Println("  suti new specification NAME")
		fmt.Println("  suti new standard NAME")
		fmt.Println("  suti new protocol NAME")
		return
	}

	kind := args[0]
	name := args[1]

	var template, dir string

	switch kind {

	case "specification":
		template = "templates/specification.md"
		dir = "specificationes"

	case "standard":
		template = "templates/standard.md"
		dir = "normae"

	case "protocol":
		template = "templates/protocol.md"
		dir = "protocolla"

	default:
		fmt.Println("unknown type:", kind)
		return
	}

	if err := generator.Generate(template, dir, name); err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("created", dir+"/"+name+".md")
}
