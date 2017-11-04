## PassTheParcel
## Intro
This is just a simple pass the parcel script

## Proposed Changes
Move from Google Cloud infrastructure to AWS Lambda to avoid having to listen to requests and can just get notified by an Amazon API Gateway Trigger. This should let us use the available Amazon regions:
- US East (Ohio)	us-east-2
- US East (N. Virginia)	us-east-1
- US West (N. California)	us-west-1
- US West (Oregon)	us-west-2
- Asia Pacific (Mumbai)	ap-south-1
- Asia Pacific (Seoul)	ap-northeast-2
- Asia Pacific (Singapore)	ap-southeast-1
- Asia Pacific (Sydney)	ap-southeast-2
- Asia Pacific (Tokyo)	ap-northeast-1
- Canada (Central)	ca-central-1
- EU (Frankfurt)	eu-central-1
- EU (Ireland)	eu-west-1
- EU (London)	eu-west-2
- South America (São Paulo)	sa-east-1

In order of west to east:
- us-west-1
- us-west-2
- us-east-2
- us-east-1
- ca-central-1
- sa-east-1
- eu-west-1
- eu-west-2
- eu-central-1
- ap-south-1
- ap-southeast-1
- ap-northeast-2
- ap-northeast-1
- ap-southeast-2

### Use aws-cli to create Lambda
```
aws lambda create-function --function-name passTheParcel_${AWS_REGION} --runtime nodejs6.10 \
  --role "${AWS_LAMBDA_ROLE}" \
  --handler index.handler \
  --code "S3Bucket=${S3_BUCKET},S3Key=${S3_KEY}" \
  --description "${AWS_REGION} passTheParcel node." \
  --timeout 3 --memory-size 128 \
  --publish \
  --region ${AWS_REGION}
```
## Jump Start

To run jumpstart.js please provide the parameters start_region and skip_count. E.g. \"node jumpstart.js <region> <skip_count>\".
Also, a places.json file needs to be present in the same directory as jumpstart.js including a structure similar to this:

```
[
  {
    "name": "us-east-1",
    "address": "<SUBDOMAIN_HERE>.execute-api.us-east-1"
  },
  {
    "name": "ap-southeast-2",
    "address": "<SUBDOMAIN_HERE>.execute-api.ap-southeast-2"
  }
]
```
