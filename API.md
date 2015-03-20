# Aural-Interpolation - Public API

## Methods

### interpolation.rough(position, array)

Returns the closest element in the array relative to the given position.

```js
var interpolation = require('aural-interpolation');

console.log(interpolation.rough(1.2, [0, 1, 3]));
```

### interpolation.linear(position, array)

Performs a linear interpolation.

```js
var interpolation = require('aural-interpolation');

console.log(interpolation.linear(1.2, [0, 1, 3]));
```

### interpolation.cosine(position, array)

Performs a cosine interpolation.

```js
var interpolation = require('aural-interpolation');

console.log(interpolation.cosine(1.2, [0, 1, 3]));
```

### interpolation.cubic(position, array)

Performs a cubic interpolation.

```js
var interpolation = require('aural-interpolation');

console.log(interpolation.cubic(1.2, [0, 1, 3]));
```

### interpolation.process(position, array, mode)

Execute an interpolation, the type of interpolation is specified by the mode argument.

```js
var interpolation = require('aural-interpolation');

console.log(interpolation.process(1.2, [0, 1, 3], 'cosine'));
```

## Notes

* Per convention, an interpolation on an empty array returns 0.
* The array is considered to be wrapping on itself, meaning the position 5 on a 4 element is equivalent to the position 1 and the position -1 is equivalement to the position 3.
