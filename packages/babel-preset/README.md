# `@btrb/babel-preset`

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE.md) [![npm version](https://badge.fury.io/js/%40btrb%2Fbabel-preset.svg)](https://badge.fury.io/js/%40btrb%2Fbabel-preset.svg)

Shared Babel preset for Bridgetown sites.

## Installation

```bash
# npm
npm i --dev @btrb/babel-preset
# pnpm
pnpm add -D @btrb/babel-preset
# yarn
yarn add -D @btrb/babel-preset
```

## Usage

### `package.json`

```json
{
  "babel": {
    "presets": ["@btrb/babel-preset"]
  }
}
```

### Webpack

```js
{
  test: /\.(js|jsx)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@btrb/babel-preset"]
    },
  },
}
```

### Babel Config

```json
{
  "presets": [
    "@btrb/babel-preset"
  ]
}
```
