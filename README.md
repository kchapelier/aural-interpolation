# Aural-Interpolation

[![Build Status](https://travis-ci.org/kchapelier/aural-interpolation.svg)](https://travis-ci.org/kchapelier/aural-interpolation) [![NPM version](https://badge.fury.io/js/aural-interpolation.svg)](http://badge.fury.io/js/aural-interpolation)

## Intent

This library provides multiple types of interpolation (linear, cosine and cubic) on a "wrapping" array.
This is particularily useful for the manipulation of audio buffers, waveshapers shapes and fixed enveloppes.

## Installing and testing

With [npm](http://npmjs.org) do:

```
npm install aural-interpolation
```

To run the test suite, run the following command:

```
npm test
```

## Public API

* interpolation.process(position, array, mode)
* interpolation.rough(position, array)
* interpolation.linear(position, array)
* interpolation.cosine(position, array)
* interpolation.cubic(position, array)

[Full API documentation](https://github.com/kchapelier/aural-interpolation/blob/master/API.md)

## Changelog

## 1.0.0 (2015.03.20) :

* First implementation.

[Full history](https://github.com/kchapelier/aural-interpolation/blob/master/CHANGELOG.md)

## Roadmap

* ...

## License

MIT
