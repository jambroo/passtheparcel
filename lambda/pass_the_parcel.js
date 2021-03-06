'use strict';

const aws = require('aws-sdk');
const lambda = new aws.Lambda({
  region: process.env.AWS_REGION
});
const https = require('https');
const s3 = new aws.S3();
const DEFAULT_HEADERS = {"Access-Control-Allow-Origin": "*"};

exports.handler = (event, context, callback) => {
  let body = event;
  let status;
  let i = (body.queryStringParameters) ? parseInt(body.queryStringParameters.i) : body.i;
  let now = new Date().getTime().toString();
  let getResult = (body.queryStringParameters) ? body.queryStringParameters.get : body.get;

  if (getResult === "1") {
    let s3Params = {
      Bucket: "pass-the-parcel-lambda-"+process.env.AWS_REGION,
      Key: "status"
     };
     s3.getObject(s3Params, function(err, data) {
       if (err) console.log(err, err.stack);
       else     console.log(data);

        callback(null, {
            statusCode: 200,
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({status: data.Body.toString()})
        });
      });
  } else if (body.forward === "1") {
      console.log("FORWARDING TO "+process.env.NEXT+"?i="+i+"!")
      let path = process.env.NEXT+"?i="+i;
      https.get(path, function(res) {
        callback(null, {
            statusCode: 200,
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({forward_url: process.env.NEXT})
        });
      }).on('error', function(e) {
        console.log("Got error: " + e.message);
        context.done(null, 'FAILURE');
      });
  } else {
    let s3Params = {
      Body: now,
      Bucket: "pass-the-parcel-lambda-"+process.env.AWS_REGION,
      Key: "status"
     };
     s3.putObject(s3Params, function(err, data) {
       if (err) console.log(err, err.stack);
       else     console.log(data);

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
                headers: DEFAULT_HEADERS,
                body: JSON.stringify({status})
            });
        });
      } else {
        status = "DONE";

        callback(null, {
            statusCode: 200,
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({status})
        });
      }
    });
  }
}
