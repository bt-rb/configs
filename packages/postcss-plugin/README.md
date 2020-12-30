# `@btrb/postcss-plugin`

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE.md) [![npm version](https://badge.fury.io/js/%40btrb%2Fpostcss-plugin.svg)](https://badge.fury.io/js/%40btrb%2Fpostcss-plugin.svg)

Shared PostCSS plugin for Bridgetown sites

## Installation

```bash
# npm
npm i --dev @btrb/postcss-plugin
# pnpm
pnpm add -D @btrb/postcss-plugin
# yarn
yarn add -D @btrb/postcss-plugin
```

## Usage

How do you do the things??

## Features

This plugin wraps around the following PostCSS transformations:

- [`postcss-import`](https://github.com/postcss/postcss-import)
- [`postcss-calc`](https://github.com/postcss/postcss-calc)
- [`postcss-flexbugs-fixes`](https://github.com/luisrudge/postcss-flexbugs-fixes)
- [`postcss-selector-matches`](https://github.com/postcss/postcss-selector-matches)
- [`postcss-will-change`](https://github.com/postcss/postcss-will-change)
- [`autoprefixer`](https://github.com/postcss/autoprefixer)
- [`postcss-discard-comments`](https://github.com/ben-eb/postcss-discard-comments)

## Options

This plugin accepts a single option, `minimize`. Passing `minimize: true` will turn on CSS minification via [cssnano](https://cssnano.co).
