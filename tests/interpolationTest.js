var interpolation = require('./../'),
    should = require('chai').use(require('./plugin/chai-math')).should();

describe('Rough interpolation (non-interpolation)', function () {
    var emptyArray = [],
        array = [1, 2],
        typedArray = new Int8Array([1, 2]);

    it('should return 0 on empty arrays', function () {
        interpolation.rough(1, emptyArray).should.equal(0);
    });

    it('should work correctly with an array', function () {
        interpolation.rough(0, array).should.equal(1);
        interpolation.rough(1, array).should.equal(2);
        interpolation.rough(0.2, array).should.equal(1);
        interpolation.rough(0.8, array).should.equal(2);
    });

    it('should work correctly with a typedarray', function () {
        interpolation.rough(0, typedArray).should.equal(1);
        interpolation.rough(1, typedArray).should.equal(2);
        interpolation.rough(0.2, typedArray).should.equal(1);
        interpolation.rough(0.8, typedArray).should.equal(2);
    });

    it('should support wrapping after', function () {
        interpolation.rough(2, array).should.equal(1);
        interpolation.rough(3, array).should.equal(2);
    });

    it('should support wrapping before', function () {
        interpolation.rough(-1, array).should.equal(2);
        interpolation.rough(-2, array).should.equal(1);
    });

    it('should wrap correctly with non integer positions', function () {
        interpolation.rough(0.2, array).should.equal(interpolation.rough(2.2, array));
        interpolation.rough(0.2, array).should.equal(interpolation.rough(-1.8, array));
    });
});

describe('Linear interpolation', function () {
    var emptyArray = [],
        array = [1, 2],
        typedArray = new Int8Array([1, 2]);

    it('should return 0 on empty arrays', function () {
        interpolation.linear(1, emptyArray).should.equal(0);
    });

    it('should work correctly with an array', function () {
        interpolation.linear(0, array).should.equal(1);
        interpolation.linear(1, array).should.equal(2);
        interpolation.linear(0.2, array).should.equalFloat(1.2);
        interpolation.linear(0.8, array).should.equalFloat(1.8);
    });

    it('should work correctly with a typedarray', function () {
        interpolation.linear(0, typedArray).should.equal(1);
        interpolation.linear(1, typedArray).should.equal(2);
        interpolation.linear(0.2, typedArray).should.equalFloat(1.2);
        interpolation.linear(0.8, typedArray).should.equalFloat(1.8);
    });

    it('should support wrapping after', function () {
        interpolation.linear(2, array).should.equal(1);
        interpolation.linear(3, array).should.equal(2);
    });

    it('should support wrapping before', function () {
        interpolation.linear(-1, array).should.equal(2);
        interpolation.linear(-2, array).should.equal(1);
    });

    it('should wrap correctly with non integer positions', function () {
        interpolation.linear(0.2, array).should.equalFloat(interpolation.linear(2.2, array));
        interpolation.linear(0.2, array).should.equalFloat(interpolation.linear(-1.8, array));
    });
});

describe('Cosine interpolation', function () {
    var emptyArray = [],
        array = [1, 2],
        typedArray = new Int8Array([1, 2]);

    it('should return 0 on empty arrays', function () {
        interpolation.cosine(1, emptyArray).should.equal(0);
    });

    it('should work correctly with an array', function () {
        interpolation.cosine(0, array).should.equal(1);
        interpolation.cosine(1, array).should.equal(2);
        interpolation.cosine(0.2, array).should.equalFloat(1.0954915028125263);
        interpolation.cosine(0.8, array).should.equalFloat(1.9045084971874737);
    });

    it('should work correctly with a typedarray', function () {
        interpolation.cosine(0, typedArray).should.equal(1);
        interpolation.cosine(1, typedArray).should.equal(2);
        interpolation.cosine(0.2, typedArray).should.equalFloat(1.0954915028125263);
        interpolation.cosine(0.8, typedArray).should.equalFloat(1.9045084971874737);
    });

    it('should support wrapping after', function () {
        interpolation.cosine(2, array).should.equal(1);
        interpolation.cosine(3, array).should.equal(2);
    });

    it('should support wrapping before', function () {
        interpolation.cosine(-1, array).should.equal(2);
        interpolation.cosine(-2, array).should.equal(1);
    });

    it('should wrap correctly with non integer positions', function () {
        interpolation.cosine(0.2, array).should.equalFloat(interpolation.cosine(2.2, array));
        interpolation.cosine(0.2, array).should.equalFloat(interpolation.cosine(-1.8, array));
    });
});

describe('Cubic interpolation', function () {
    var emptyArray = [],
        array = [1, 2],
        typedArray = new Int8Array([1, 2]);

    it('should return 0 on empty arrays', function () {
        interpolation.cubic(1, emptyArray).should.equal(0);
    });

    it('should work correctly with an array', function () {
        interpolation.cubic(0, array).should.equal(1);
        interpolation.cubic(1, array).should.equal(2);
        interpolation.cubic(0.2, array).should.equalFloat(1.104);
        interpolation.cubic(0.8, array).should.equalFloat(1.896);
    });

    it('should work correctly with a typedarray', function () {
        interpolation.cubic(0, typedArray).should.equal(1);
        interpolation.cubic(1, typedArray).should.equal(2);
        interpolation.cubic(0.2, typedArray).should.equalFloat(1.104);
        interpolation.cubic(0.8, typedArray).should.equalFloat(1.896);
    });

    it('should support wrapping after', function () {
        interpolation.cubic(2, array).should.equal(1);
        interpolation.cubic(3, array).should.equal(2);
    });

    it('should support wrapping before', function () {
        interpolation.cubic(-1, array).should.equal(2);
        interpolation.cubic(-2, array).should.equal(1);
    });

    it('should wrap correctly with non integer positions', function () {
        interpolation.cubic(0.2, array).should.equalFloat(interpolation.cubic(2.2, array));
        interpolation.cubic(0.2, array).should.equalFloat(interpolation.cubic(-1.8, array));
    });
});

describe('Delegation method (process)', function () {
    var array = [1, 2];

    it('should perform a lerp when no mode is provided', function () {
        interpolation.process(0.2, array).should.equalFloat(1.2);
    });

    it('should perform the interpolation specified by the mode', function () {
        interpolation.process(0.2, array, 'rough').should.equalFloat(1);
        interpolation.process(0.2, array, 'linear').should.equalFloat(1.2);
        interpolation.process(0.2, array, 'cosine').should.equalFloat(1.0954915028125263);
        interpolation.process(0.2, array, 'cubic').should.equalFloat(1.104);
    });
});
