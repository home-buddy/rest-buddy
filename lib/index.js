'use strict';

import createRouter from './create-router';
import embellishSpec from './embellish-spec';

// private member hax
const NAME = Symbol();
const CONTROLLER = Symbol();
const SPEC = Symbol();
const MIDDLEWARE = Symbol();

export default class RestBuddy {
    // TODO: accept middleware to run before controllers
    constructor(name, spec, controller) {
        this[NAME] = name;
        this[CONTROLLER] = controller;
        // TODO: Validate that spec has all required properties for each action
        this[SPEC] = embellishSpec(name, spec, controller);
    }

    get middleware() {
        if (!this[MIDDLEWARE]) {
            this[MIDDLEWARE] = createRouter(this[NAME], this[SPEC], this[CONTROLLER]);
        }
        return this[MIDDLEWARE];
    }

    get spec() {
        return this[SPEC];
    }

    // TODO: getter for documentations

    // TODO: `nest` or `add` method for nesting resources
}
