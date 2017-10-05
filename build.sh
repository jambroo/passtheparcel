#! /bin/bash

REGIONS=(us-east-1 us-east-2 ap-southeast-2)
S3_LS=$(aws s3 ls)

cd lambda
rm -f pass_the_parcel.js.zip
zip pass_the_parcel.js.zip pass_the_parcel.js
cd ..

for region in ${REGIONS[@]}; do
  if ! echo "$S3_LS" | grep -q $region; then
    echo "$region DOESN'T EXIST"
    aws s3 mb s3://pass-the-parcel-lambda-${region} --region $region
  fi

  aws s3 cp lambda/pass_the_parcel.js.zip s3://pass-the-parcel-lambda-${region} --region ${region}

  if ! aws apigateway get-rest-apis --region $region | grep -q "pass-the-parcel-${region}"; then
    aws apigateway create-rest-api --region ${region} --name "pass-the-parcel-${region}" --description "${region} gateway for pass-the-parcel."
  fi

  REST_API_ID=$(aws apigateway get-rest-apis --region ${region} | jq ".items[] | {id, name}" | grep -A 1 "pass-the-parcel-${region}" | tail -n 1 | cut -c10-19)
done
