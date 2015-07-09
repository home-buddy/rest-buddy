'use strict';

import _ from 'ls-lodash';
import jsonschema from 'express-jsonschema';
import { Validator } from 'jsonschema';
import { Router as router } from 'express';

export default function createRouter(endpointName, endpointSpec, endpointController) {
    let currentRouter = router();

    if (!/[a-z][a-z\-]+/.test(endpointName)) {
        throw new Error(`Invalid endpoint name: ${endpointName}`);
    }

    _.forEach(endpointSpec, (actionSpec, actionName) => {
        let actionHandler = endpointController[actionName],
            httpMethod = actionSpec.method.toLowerCase(),
            actionUrl = `/${endpointName}/${actionSpec.url.replace(/^\//, '')}`;

        if (!_.isFunction(actionHandler)) {
            throw new Error(`resource "${endpointName}", controller lacks action "${actionName}"`);
        }

        // TODO: Validate req params

        // Apply jsonschema validation to request bodies
        if (_.isPlainObject(actionSpec.reqBodySchema)) {
            currentRouter[httpMethod](actionUrl, jsonschema.validate({body: actionSpec.reqBodySchema}));
        }

        currentRouter[httpMethod](actionUrl, (req, res) => {
            let { data, status, error } = actionHandler(req);

            // Apply jsonschema validation to response body
            if (_.isPlainObject(actionSpec.resBodySchema)) {
                let validator = new Validator(),
                    validatorResults = validator.validate(data, actionSpec.resBodySchema);
                if (!validatorResults.valid) {
                    // TODO: throw full stack?
                    throw _.first(validatorResults.errors);
                }
            }

            res.status(status || 200).send({data, status, error});
        });
    });

    return currentRouter;
}
