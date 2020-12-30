# Contributing Guide

- [Contributing Guide](#contributing-guide)
  - [Commit Message Convention](#commit-message-convention)
  - [Project setup](#project-setup)
  - [New Package](#new-package)
  - [Workspace Commands](#workspace-commands)
  - [Release](#release)
  - [Help needed](#help-needed)

## Commit Message Convention

Commits should follow the [Conventional Commits spec](https://conventionalcommits.org/).

## Project setup

1. Fork and clone the repo
2. `yarn install` to install dependencies
3. Create a branch for your PR

> Tip: Keep your `main` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/bt-rb/configs
> git fetch upstream
> git branch --set-upstream-to=upstream/main main
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `main`
> branch to use the upstream main branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `main` branch.
> Whenever you want to update your version of `main`, do a regular `git pull`.

## New Package

Add a new package by running `yarn generate package` from the root of the repository and follow the prompt.

## Workspace Commands

>TODO: add more info here.

Prefix commands with the relevant workspace. You can view available workspaces by running `yarn workspaces list`.

Example:

```bash
yarn workspace @btrb/postcss-plugin add autoprefixer
```

## Release

Generate releases with `yarn release`.

## Help needed

Please checkout the the open issues.

Also, please watch the repo and respond to questions/bug reports/feature
requests!

Thanks!
