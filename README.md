# Auto Resolver

    Simple Node style Dependency Injection

## Installation

    $ npm install auto-resolver

## Example

```js

//somewhere early on app startup

var resolver = require('auto-resolver');

resolver.registerResolver();

resolver.register('dateHelper', '.././helpers/dateHelper');
resolver.register('stringHelper', '.././helpers/stringHelper');

...

// some app module

const lodash = require('lodash');
const dateHelper = resolve('dateHelper');

```

## Why?

  Because DI is not main stream practice in Node, like in many other languages, but can be easilly added on top of standard node require.

## Status
  It is early development, so documentation is still missing.    

## License

  MIT