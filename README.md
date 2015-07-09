# rest-buddy [![Build Status](https://travis-ci.org/home-buddy/rest-buddy.svg)](https://travis-ci.org/home-buddy/rest-buddy) [![Circle CI](https://circleci.com/gh/home-buddy/rest-buddy.svg?style=shield)](https://circleci.com/gh/home-buddy/rest-buddy)

Resourceful Framework that's got your back

## Overview

RestBuddy is a light framework for creating JSON RESTy APIs.  Currently it provides a middleware for Express, but could also provide one for Koa in the future.  The overall design goals are:

* Strong validation of request body, request parameters, and response body
* Fast and easy to create standard REST endpoints, but not overly restrictive
* Ability to procedurally generate documentation (perhaps in the future via Swagger)
* Easily testable controller action handlers
* Standard middleware that can be composed with other middleware in the standard fashion

RestBuddy is an instantiatable class that takes in it constructor

* The resource name
* A specification for actions (action name, method, url, validation schemas, human readable info)
* A controller that exports action handlers

and provides getters for

* Express middleware that serves the resource
* The decorated specification (that includes generated REST actions)
* (future) Human readable documentation in markdown
* (future) Koa middleware that serves the resource

## Usage

### Idiomatic REST with no validations

A completely idiomtic REST endpoint (with no validation) would look like:

```js
var app = require('express')(),
    RestBuddy = require('rest-buddy'),

    spec = {}, // RestBuddy autofills this for standard REST actions
    controller = {
        index:   function(req) { return {status: 200, data: {'ok'}}; },
        create:  function(req) { return {status: 200, data: {'ok'}}; },
        show:    function(req) { return {status: 200, data: {'ok'}}; },
        update:  function(req) { return {status: 200, data: {'ok'}}; },
        destroy: function(req) { return {status: 200, data: {'ok'}}; }
    },

    smurfsResource = new RestBuddy('smurfs', spec, controllers);

app.use(smurfsResource.middleware).listen(1337);
```

We can now use the following methods on the following URLs

```
GET    /smurfs    => 200 'ok'
POST   /smurfs    => 200 'ok'
GET    /smurfs/42 => 200 'ok'
PUT    /smurfs/42 => 200 'ok'
DELETE /smurfs/42 => 200 'ok'
```

### Idiomatic REST with validations

Lorem

### REST + custom actions

Lorem

## API

### RestBuddy

Lorem

### Specification

Lorem

### Controller

Lorem

## Development

Clone and install deps

```bash
npm i  
```

You can run tests one time

```bash
npm tst
```

Or you can run tests on changes

```bash
npm start
```

Build the final compiled lib with

```bash
npm run build
```
