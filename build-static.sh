#!/bin/bash

set -e # break on error.
set -u # break on using undefined variable.

# Go to right place
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

# Where are we?
APP_DIR="./dist"

EXT="css|js|eot|svg|ttf|woff|html|htm|woff2"
echo "-- Compressing (${EXT}) in ${APP_DIR}"

# fetch all source files by ${EXT} (extension) and pre-compress
find "$APP_DIR" -type f -regextype posix-extended \( -iregex ".*\.(${EXT})$" \) -print0 | while read -d '' sourceFile
do
    gzip -c9 "${sourceFile}" > "${sourceFile}.gz"
    echo " - ${sourceFile} > ${sourceFile}.gz"
done

ID=$(git rev-parse --short=12 HEAD)
CNAME="registry.service.consul/dlm:$ID"

echo "-- Build deployment container ($CNAME)"
docker build -t $CNAME .

echo "-- Push to registry"
docker push $CNAME

echo "-- Refresh Nomad Deployment"
cp docker-files/nomad.hcl /tmp/nomad.hcl
sed -i -e "s#registry.service.consul/dlm#$CNAME#" /tmp/nomad.hcl
docker cp /tmp/nomad.hcl nomad:/tmp/nomad.hcl
docker exec -ti nomad nomad run -address=http://192.168.1.51:4646 /tmp/nomad.hcl

echo "-- Done!"
