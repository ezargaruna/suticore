# SUTI.world · app prototype

This Vite app is a separate prototype for browsing repository documents.
It is not the public homepage and is not deployed by the Pages workflow.

The public, installable SUTI.world portal starts at the repository-root
`index.html`. Its styles, preference builder, icons, manifest, and offline
shell live in `site/` and the repository root. The Pages workflow copies only
those named public files.

## local app prototype

```sh
npm ci
npm run dev
npm run build
npm run lint
```

The app does not receive local user notes or connect to external services by
default. Review the source and deployment configuration before connecting it
to another data source.
