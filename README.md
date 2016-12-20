# Mix

Based on https://github.com/toddlucas/react-tsx-starter
I've added TSLint and postCSS to customise it to my tastes.



## Features

TO DO:
* Authenticate with spotify
* Select seed tracks
* Set search parameters
* Create a playlist from search results

DONE:


# Usage

You'll need a few frameworks and utilities to be installed before starting.

## Prerequisites

You'll need the following prior to setup:

* [Node.js](https://nodejs.org/) should be installed
* [TypeScript](http://www.typescriptlang.org/) version 1.6 or greater
* [Typings](https://github.com/typings/typings), the TypeScript Definition manager

## Setup

### Install Node modules

This will get all the packages required for development and run time,
as defined in the `package.json` file.

```
> npm update
```

### Install TypeScript definitions

Get the definition files that are used by the project.

```
> typings install
```

If you don't already having `typings` installed, you can install using npm (-g flag recommended).
This will pull down the typings files and put them into the `typings` directory, along with `index.d.ts`.
This file is included via a `///` comment by `src\server.ts` to resolve all application TypeScript references.

If you're using `tsd`, this project still contains `tsd.json` but it will be removed in the near future.
You can run the following command to install using `tsd`.

```
> tsd update --save
```

The `--save` flag is required to generate the `typings\tsd.d.ts` file,
You'll need to update `src\server.ts` and change `index.d.ts` to `tsd.d.ts`.

## Build

To run a full build, just run gulp with no arguments.

```
> gulp
```

## Development

Run watch and keep the console open. 

```
> gulp watch
```

Gulp will automatically rebuild when a source file or CSS file changes.

## Running

Run this command:

```
> cd www
> node server
```

Then open a browser and navigate to [http://localhost:3000](http://localhost:3000) to view.

## License

[BSD](https://github.com/toddlucas/react-tsx-starter/blob/master/LICENSE) (the same as React)
