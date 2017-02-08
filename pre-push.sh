#!/bin/bash

killall() {
    echo 'Stopping the server...'
    trap '' INT TERM
    kill -TERM 0
    wait
    echo "Done!"
}

./ci/check-node.sh

echo '[Step 1 of 4] Stopping the ./develop.sh script (if it is running)...'
pkill -SIGINT -f ./develop.sh

# pkill returns a non zero exist status so we need to set exit on error here
set -e

# kill all background process on exit or error
trap 'killall' EXIT
trap 'killall' INT

echo '[Step 2 of 4] Running the ci test script...'
./ci/test.sh

echo '[Step 3 of 4] Starting the server...'
./lein.sh run &
npm run ci-stub-server &

./ci/smoke-test.sh "http://localhost:5000/api/ping"

echo '[Step 4 of 4] Running the functional tests...'
./lein.sh test functional.functional-test

echo
echo 'Everything completed successfully, push away!'
echo
echo 'You will need to manually restart the ./develop script, to continue development...'
