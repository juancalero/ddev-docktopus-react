[![tests](https://github.com/juancalero/ddev-docktopus-react/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/juancalero/ddev-docktopus-react/actions/workflows/tests.yml)
[![release](https://img.shields.io/github/v/release/juancalero/ddev-docktopus-react)](https://github.com/juancalero/ddev-docktopus-react/releases/latest)

# DDEV Docktopus React

React 19 + [Vite 7](https://vite.dev/) dev-server service for DDEV, taken from the [docktopus](https://github.com/juancalero/docktopus) stack, for decoupled or hybrid Drupal frontends.

If the project has no `frontend_react/` directory, the add-on scaffolds a minimal working app (React 19 + Vite 7, HMR, proxy to Drupal's JSON:API and to the Node API) — an existing `frontend_react/` is never touched.

> Part of [ddev-docktopus](https://github.com/juancalero/ddev-docktopus) — the meta add-on that installs the whole docktopus stack with one command.

## Installation

```
ddev add-on get juancalero/ddev-docktopus-react
ddev restart
```

The first `ddev start` runs `npm install` inside the container (skipped if `node_modules` already exists) and then the Vite dev server with hot reload.

## Usage

| | URL |
| --- | --- |
| Host (HTTP) | `http://<project>.ddev.site:15173` — also `ddev frontend` |
| Host (HTTPS) | `https://<project>.ddev.site:15174` |

The scaffold's `vite.config.js`:

- Proxies `/jsonapi/*` to `http://<project>.ddev.site` (Drupal JSON:API, with CORS headers).
- Proxies `/api/*` and `/hello` to `http://node:3000` (Node API from `ddev-docktopus-node-api`, if installed).
- Uses polling file watch (needed with Mutagen on Windows/macOS).

The scaffolded files carry a `#ddev-generated` marker; edit them freely and the add-on will respect your changes (re-running the install leaves them untouched).

For a production build run `npm run build` as usual (locally or with `ddev exec -s react npm run build`).

## Configuration

Router ports are set in `.ddev/.env.ddev-docktopus-react`:

| Variable | Default | Description |
| --- | --- | --- |
| `REACT_HTTP_PORT` | `15173` | Router port for the HTTP UI |
| `REACT_HTTPS_PORT` | `15174` | Router port for the HTTPS UI |

## Uninstallation

```
ddev add-on remove ddev-docktopus-react
ddev restart
```

The `frontend_react/` scaffold is removed only if every file still carries the `#ddev-generated` marker (i.e. you never edited it).

## License

GPL-2.0-or-later
