"use strict";

var euclideanModulo = function euclideanModulo (dividend, divisor) {
    var remainder = dividend % divisor;

    return remainder < 0 ? remainder + Math.abs(divisor) : remainder;
};

var interpolation = {
    process: function (position, data, mode) {
        mode = (mode && !!this[mode] ? mode : 'linear');
        return this[mode](position, data);
    },
    rough: function (position, data) {
        if (data.length === 0) {
            return 0;
        }

        position = euclideanModulo(Math.round(position), data.length);

        if (position < 0) {
            position += data.length;
        }

        return data[position];
    },
    linear: function (position, data) {
        if (data.length === 0) {
            return 0;
        }

        var length = data.length,
            npos = Math.abs(euclideanModulo(position, length)),
            max = Math.ceil(npos),
            min = Math.floor(npos),
            ratio = npos - min;

        max = (max >= length) ? 0 : max;

        return data[max] * ratio + data[min] * (1 - ratio);
    },
    cosine: function (position, data) {
        if (data.length === 0) {
            return 0;
        }

        var length = data.length,
            npos = Math.abs(euclideanModulo(position, length)),
            max = Math.ceil(npos),
            min = Math.floor(npos),
            ratio = npos - min;

        max = (max >= length) ? 0 : max;

        ratio = (1 - Math.cos(ratio * Math.PI)) / 2;
        return data[max] * ratio + data[min] * (1 - ratio);
    },
    cubic: function (position, data) {
        if (data.length === 0) {
            return 0;
        }

        //TODO there is probably a way to make this more performant

        var length = data.length,
            pos0 = Math.floor(Math.abs(euclideanModulo(position - 1, length))),
            pos1 = Math.floor(Math.abs(euclideanModulo(position, length))),
            pos2 = Math.floor(Math.abs(euclideanModulo(position + 1, length))),
            pos3 = Math.floor(Math.abs(euclideanModulo(position + 2, length))),
            ratio = euclideanModulo(position, 1);

        var y0 = data[pos0],
            y1 = data[pos1],
            y2 = data[pos2],
            y3 = data[pos3];

        var a0, a1, a2, a3, ratio2;

        ratio2 = ratio * ratio;
        a0 = y3 - y2 - y0 + y1;
        a1 = y0 - y1 - a0;
        a2 = y2 - y0;
        a3 = y1;

        return a0 * ratio * ratio2 + a1 * ratio2 + a2 * ratio + a3;
    }
};

module.exports = interpolation;
