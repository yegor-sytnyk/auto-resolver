var resolver = require('../resolver');
var expect = require('chai').expect;

describe('Auto Resolver', () => {
    before((done) => {
        resolver.registerResolver();

        resolver.loadIndex('./di.json');

        resolver.register('testHelper', {
            getValue() {
                return 5;
            }
        });
        done();
    });

    describe('happy path', function () {
        it('resolve overridden dependency', (done) => {
                var testHelper = resolve('testHelper');

                var value = testHelper.getValue();

                expect(value).to.be.equal(5);

                done();
            }
        );

        it('resolve multiple level dependencies', (done) => {
                var worker = resolve('worker');

                var hello = worker.sayHello('John');

                expect(hello).to.be.equal('Hello, John.');

                done();
            }
        );

        it('hot reload dependency', (done) => {
                resolver.register('textHelper', {
                   getPeriod() {
                       return '!';
                   }
                });

                resolver.cacheReload();

                var worker = resolve('worker');

                var hello = worker.sayHello('John');

                expect(hello).to.be.equal('Hello, John!');

                done();
            }
        );

        it('reload single dependency by path', (done) => {
                resolver.register('numberHelper', './mocks/numberHelperMock');

                resolver.cacheReload();

                var worker = resolve('worker');

                var num = worker.operation(2, 3);

                expect(num).to.be.equal(1001);

                done();
            }
        );

    });
});