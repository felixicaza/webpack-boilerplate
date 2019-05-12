# Webpack Environment

Environment for Front-end development using [Webpack](https://webpack.js.org/).

## Features

For dynamic development with HTML, it is configured with the [Pug template](https://pugjs.org/api/getting-started.html) engine. Besides [SASS](https://sass-lang.com/guide) for CSS processing.

In development Webpack is enabled with few modules for basic operation. In production, it is enabled code-splitting, as well as optimization of HTML files and compression of assets using Gzip and Brotli.

## Installation

With NPM

```bash
npm install
```

or Yarn

```bash
yarn install
```

## Usage

Development

```bash
npm run serve
```

Production

```bash
npm run build
```
