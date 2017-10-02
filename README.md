## PassTheParcel
## Intro
This is just a simple pass the parcel script

## Google Cloud positions:
asia-east1-a
us-west1-a
us-central1-a
us-east1-b
europe-west1-b

## Proposed Changes
Move from Google Cloud infrastructure to AWS Lambda to avoid having to listen to requests and can just get notified by an Amazon API Gateway Trigger. This should let us use the available Amazon regions:
US East (Ohio)	us-east-2
US East (N. Virginia)	us-east-1
US West (N. California)	us-west-1
US West (Oregon)	us-west-2
Asia Pacific (Mumbai)	ap-south-1
Asia Pacific (Seoul)	ap-northeast-2
Asia Pacific (Singapore)	ap-southeast-1
Asia Pacific (Sydney)	ap-southeast-2
Asia Pacific (Tokyo)	ap-northeast-1
Canada (Central)	ca-central-1
EU (Frankfurt)	eu-central-1
EU (Ireland)	eu-west-1
EU (London)	eu-west-2
South America (São Paulo)	sa-east-1

In order of west to east:
us-west-1
us-west-2
us-east-2
us-east-1
ca-central-1
sa-east-1
eu-west-1
eu-west-2
eu-central-1
ap-south-1
ap-southeast-1
ap-northeast-2
ap-northeast-1
ap-southeast-2
