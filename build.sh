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
done
