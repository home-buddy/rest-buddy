'use strict';

var _ = require('ls-lodash'),
    expect = require('chai').expect,
    embellishSpec = require('../lib/embellish-spec');

describe('embellishSpec', function() {
    describe('adds correct actions', function() {
        it('index', function() {
            var newSpec = embellishSpec('cars', {}, {index: _.noop});
            expect(newSpec).to.have.property('index');
            expect(newSpec).to.have.deep.property('index.method', 'GET');
            expect(newSpec).to.have.deep.property('index.url', '');
        });

        it('show', function() {
            var newSpec = embellishSpec('cars', {}, {index: _.noop});
            expect(newSpec).to.have.property('show');
            expect(newSpec).to.have.deep.property('show.method', 'GET');
            expect(newSpec).to.have.deep.property('show.url', ':car');
        });

        it('create', function() {
            var newSpec = embellishSpec('cars', {}, {index: _.noop});
            expect(newSpec).to.have.property('create');
            expect(newSpec).to.have.deep.property('create.method', 'POST');
            expect(newSpec).to.have.deep.property('create.url', '');
        });

        it('update', function() {
            var newSpec = embellishSpec('cars', {}, {index: _.noop});
            expect(newSpec).to.have.property('update');
            expect(newSpec).to.have.deep.property('update.method', 'PUT');
            expect(newSpec).to.have.deep.property('update.url', ':car');
        });

        it('destroy', function() {
            var newSpec = embellishSpec('cars', {}, {index: _.noop});
            expect(newSpec).to.have.property('destroy');
            expect(newSpec).to.have.deep.property('destroy.method', 'DELETE');
            expect(newSpec).to.have.deep.property('destroy.url', ':car');
        });
    });
});
