#!/bin/bash

trap 'kill $(jobs -p) 2>/dev/null; exit' SIGINT

base_dir=$(pwd)
exit_code=0

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
  
  # Capture the exit code of Jest
  service_exit_code=$?
  
  # If any service fails, mark the overall process as failed
  if [ $service_exit_code -ne 0 ]; then
    exit_code=$service_exit_code
  fi
done

# Exit with the appropriate code
exit $exit_code
