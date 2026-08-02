package commands

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

func Graph() {

	var dirs []string

	filepath.Walk(".", func(path string, info os.FileInfo, err error) error {

		if err != nil {
			return nil
		}

		name := info.Name()

		if strings.HasPrefix(name, ".git") {
			return filepath.SkipDir
		}

		if name == "suti" {
			return nil
		}

		if info.IsDir() {
			dirs = append(dirs, path)
		}

		return nil
	})

	sort.Strings(dirs)

	var out strings.Builder

	out.WriteString("# SYSTEM MAP\n\n")

	for _, d := range dirs {
		out.WriteString("- " + d + "\n")
	}

	os.WriteFile("SYSTEM_MAP.md", []byte(out.String()), 0644)

	fmt.Println("generated SYSTEM_MAP.md")
}
