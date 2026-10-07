# react + typescript + vite

this template provides a minimal setup to get react working in vite with hmr and some oxlint rules

currently, two official plugins are available:

- [@vitejs/plugin-react](https://GitHub.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://GitHub.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [swc](https://swc.rs/)

## react compiler

the react compiler is not enabled on this template because of its impact on dev & build performances. to add it, see [this documentation](https://react.dev/learn/react-compiler/installation)

## expanding the oxlint configuration

if you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeaware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowconstantexport": true }]
  }
}
```

see the [oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories