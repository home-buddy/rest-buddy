'use strict';

var expect = require('chai').expect,
    RestBuddy = require('../dist/rest-buddy');

describe('Artifact built by webpack', function() {
    it('exports middleware', function() {
        var restBuddy = new RestBuddy('cars', {}, {});
        expect(restBuddy).to.have.property('middleware');
    });

    it('exports spec', function() {
        var restBuddy = new RestBuddy('cars', {}, {});
        expect(restBuddy).to.have.property('middleware');
    });
});
