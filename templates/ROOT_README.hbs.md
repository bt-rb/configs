[comment]: # (NOTE: This file is generated and should not be modify directly. Update `templates/ROOT_README.hbs.md` instead)

# Configs

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

This repository contains common configurations for building Bridgetown websites.

## Usage

This repo is managed as a monorepo that is composed of many npm packages, where each package has its own `README` and documentation describing usage.

### Package Index

| Name | NPM | Size |
| ---- | --- | ---- |
{{#each jsPackageNames}}
| [{{this}}](packages/{{this}}) | [![npm version](https://badge.fury.io/js/%40btrb%2F{{this}}.svg)](https://badge.fury.io/js/%40btrb%2F{{this}}) | [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@btrb/{{this}}.svg)](https://img.shields.io/bundlephobia/minzip/@btrb/{{this}}.svg) |
{{/each}}
