'use strict';

var _ = require('ls-lodash'),
    expect = require('chai').expect,
    express = require('express'),
    request = require('supertest-as-promised'),
    createRouter = require('../lib/create-router');

describe('createRouter', function() {
    function getMockSpec(overrides) {
        return _.safeMerge({
            start: {
                method: 'GET',
                url: '/start'
            }
        }, overrides);
    }

    function getMockController(overrides) {
        return _.safeMerge({
            start: _.constant({status: 200, data: 'ok'})
        }, overrides);
    }

    it('throws on invalid resource name', function() {
        expect(_.partial(createRouter, 'BAD NAME', {}, {})).to.throw(/BAD NAME/);
    });

    it('throws when controller lacks action', function() {
        expect(_.partial(createRouter, 'cars', getMockSpec(), {})).to.throw(/cars.*start/);
    });

    it('creates a router middleware', function() {
        var app = express().use(createRouter('cars', getMockSpec(), getMockController()));
        return request(app).get('/cars/start').expect(200, {status: 200, data: 'ok'});
    });

    it('validates request body against jsonschema', function() {
        // TODO: implement test
    });

    it('validates response body against jsonschema', function() {
        // TODO: implement test
    });
});
