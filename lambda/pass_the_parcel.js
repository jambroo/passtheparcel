'use strict';

const aws = require('aws-sdk');
const lambda = new aws.Lambda({
  region: process.env.AWS_REGION
});
const https = require('https');

exports.handler = (event, context, callback) => {
  let body = event;
  let status;
  let i = (body.queryStringParameters) ? parseInt(body.queryStringParameters.i) : body.i;

  if (body.forward === "1") {
      console.log("FORWARDING TO "+process.env.NEXT+"?i="+i+"!")
      let path = process.env.NEXT+"?i="+i;
      https.get(path, function(res) {
        callback(null, {
            statusCode: 200,
            headers: {},
            body: JSON.stringify({forward_url: process.env.NEXT})
        });
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
        context.done(null, 'FAILURE');
      });
  } else {
    status = "CALLING_NEXT";

    console.log("PARCEL RECEIVED ("+i+")!")

    i--;

    if (i >= 0) {
      lambda.invoke({
        FunctionName: 'passTheParcel',
        InvocationType: 'Event',
        Payload: JSON.stringify({forward: "1", i}, null, 2)
      }, function(error, data) {
          callback(null, {
              statusCode: 200,
              headers: {},
              body: JSON.stringify({status})
          });
      });
    } else {
      status = "DONE";

      callback(null, {
          statusCode: 200,
          headers: {},
          body: JSON.stringify({status})
      });
    }
  }
}
