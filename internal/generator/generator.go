package generator

import (
	"os"
	"path/filepath"
	"strings"
)

func Generate(template, dir, name string) error {

	data, err := os.ReadFile(template)
	if err != nil {
		return err
	}

	content := strings.ReplaceAll(string(data), "{{name}}", name)

	path := filepath.Join(dir, name+".md")

	return os.WriteFile(path, []byte(content), 0644)
}
