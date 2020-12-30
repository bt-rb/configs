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

To enable the preset, add a `babel` property in your `package.json` and reference this shared config as follows:

```json
{
  "babel": {
    "presets": ["@btrb/babel-preset"]
  }
}
```
