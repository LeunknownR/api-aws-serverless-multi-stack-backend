#!/bin/bash

trap 'kill $(jobs -p) 2>/dev/null; exit' SIGINT

base_dir=$(pwd)

additional_flags=""
if [[ "$1" == "-c" ]]; then
  additional_flags="--coverage --coverageDirectory=$base_dir/coverage/\${service}"
elif [[ "$1" == "-ci" ]]; then
  additional_flags="--ci --coverage --coverageDirectory=$base_dir/coverage/\${service}"
fi

mapfile -t services < <(find . -name "jest.config.ts" -not -path "*/.esbuild/*" -exec dirname {} \; | sed 's/.\///')

for service in "${services[@]}"; do
  echo "Running tests for $service..."
  cd "$base_dir/$service"
  eval "npx jest --passWithNoTests $additional_flags"
done
