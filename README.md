# m7r-frontend

mentalizr web frontend

## Prerequisites

* `node` 16 with `npm` 8 included
* repository `m7r-web-components` checked out in same parent directory
* repository `m7r-frontend-project` dito

## Build

    $ npm install
    $ ./node_modules/.bin/webpack

## npm module dependency

An overview over the relationship between npm packages and application/development aspects:

### application dependencies

#### startbootstrap-sb-admin-2 theme

* startbootstrap-sb-admin-2
* popper.js
* jquery.js
* bootstrap Version 4.x (!)

#### m7r-web-components

* ../m7r-web-components (as a local package)

#### m7r application

* @types/bootstrap (just to interact with bootstrap programmatically)
* @types/jquery (dito)
* mustache
* @types/mustache
* bootstrap-icons

### dev dependencies

#### TypeScript

* tsc

#### webpack

* webpack
* webpack-cli
* ts-loader
* html-loader

#### mocha/chai unit testing

* mocha
* @types/mocha
* chai
* @types/chai
* ts-node

#### test coverage

* nyc

