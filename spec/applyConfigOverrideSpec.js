var applyConfigOverride = require('../lib/applyConfigOverride');

describe('applyConfigOverride', function() {
    it('should override specified sections', function() {
        var options = {
            configOverride: {
                a: 'x',
                b: { c: 'y'}
            }
        };

        var c = applyConfigOverride({
            a: 'a',
            b: { c: 'b'}
        }, options);

        expect(c.a).toBe('x');
        expect(c.b.c).toBe('y');
    });

    it('should leave the non-overriden stuff alone', function() {
        var options = {
            configOverride: {
                a: 'x',
                b: { c: 'y '}
            }
        };

        var c = applyConfigOverride({
            a: 'a',
            b: { c: 'c ', d: 'f'},
            e: 'g'
        }, options);

        expect(c.b.d).toBe('f');
        expect(c.e).toBe('g');
    });
});
