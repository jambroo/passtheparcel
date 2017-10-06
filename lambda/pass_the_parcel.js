'use strict';

exports.handler = (event, context, callback) => {
    let body = event.body;
    let body_obj = JSON.parse(body);

    console.log(body_obj);

    callback(null, {
        statusCode: 200,
        headers: {},
        body: JSON.stringify({test: 1})
    });
};
