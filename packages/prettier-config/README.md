# `@btrb/prettier-config`

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE.md) [![npm version](https://badge.fury.io/js/%40btrb%2Fprettier-config.svg)](https://badge.fury.io/js/%40btrb%2Fprettier-config.svg)

Shared prettier config for building Bridgetown websites and plugins

## Installation

```bash
# npm
npm i --dev @btrb/prettier-config
# pnpm
pnpm add -D @btrb/prettier-config
# yarn
yarn add -D @btrb/prettier-config
```

## Usage

btrb’s shared prettier config comes bundled in `@btrb/prettier-config`.

To enable these rules, add a `prettier` property in your `package.json` and reference this shared config as follows:

```json
"prettier": "@btrb/prettier-config"
```
