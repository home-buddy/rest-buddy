'use strict';

import _ from 'ls-lodash';
import pluralize from 'pluralize';

const methods = {
    index: 'GET',
    show: 'GET',
    create: 'POST',
    update: 'PUT',
    destroy: 'DELETE'
};

const requiresId = {
    index: false,
    create: false,
    show: true,
    update: true,
    destroy: true
};

export default function embellishSpec(specName, rawSpec, controller) {
    const idName = `:${pluralize.singular(specName)}`;

    const ctrlRestActions = _(Object.keys(methods))
        .intersection(Object.keys(controller))
        .map((actionName) => [actionName, {}])
        .zipObject()
        .valueOf();

    const specWithRestEndpoints = _.defaults(_.clone(rawSpec), ctrlRestActions);

    return _.mapValues(specWithRestEndpoints, (actionSpec, actionName) => {
        if (!_.has(methods, actionName)) { return actionSpec; }

        return _.safeMerge(actionSpec, {
            method: actionSpec.method || methods[actionName],
            url: actionSpec.url || requiresId[actionName] ? idName : ''
        });
    });
}
