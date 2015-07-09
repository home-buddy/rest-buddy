'use strict';

import createRouter from './create-router';
import embellishSpec from './embellish-spec';

// private member hax
const NAME = Symbol();
const CONTROLLER = Symbol();
const SPEC = Symbol();
const MIDDLEWARE = Symbol();

export default class RestBuddy {

    /**
    * Create a RestBuddy instance
    * @constructor
    * @param {string} name - Name of this resource (e.g., 'smurfs')
    * @param {object} spec - Specification object
    * @param {object} controller - Map of the actions to action handler functions
    */
    constructor(name, spec, controller) {
        // TODO: accept middleware to run before controllers
        this[NAME] = name;
        this[CONTROLLER] = controller;
        // TODO: Validate that spec has all required properties for each action
        this[SPEC] = embellishSpec(name, spec, controller);
    }

    /**
    * Get the express middleware for serving this resource
    * @readonly
    */
    get middleware() {
        if (!this[MIDDLEWARE]) {
            this[MIDDLEWARE] = createRouter(this[NAME], this[SPEC], this[CONTROLLER]);
        }
        return this[MIDDLEWARE];
    }

    /**
    * Get the resource specification, including added REST actions
    * @readonly
    */
    get spec() {
        return this[SPEC];
    }

    // TODO: getter for documentations

    // TODO: `nest` or `add` method for nesting resources
}
