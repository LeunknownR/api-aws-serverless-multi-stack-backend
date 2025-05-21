#!/bin/bash
ROOT=$(pwd);

code_dir_params="";
for code_dir in $(exec ls);
  do
    if [ -f "$code_dir/serverless.yml" ]; then
      code_dir_params="$code_dir_params$code_dir ";
    fi
  done
code_dir_params=$(echo $code_dir_params | xargs);

build_directory() {
  local code_dir=$1
  echo ">> Building /$code_dir"
  if [[ $code_dir == "common-layer" ]]; then
    cd "$code_dir/src/common";
    npm run build;
    cd ../../dist/common;
    echo ">> Installing dependencies...";
    npm i --omit=dev;
  else
    cd $code_dir;
    npm run build:layer;
    cd dist;
    rm -rf common-layer;
  fi
  cd $ROOT;
}

for code_dir in $code_dir_params
  do
    build_directory $code_dir &
  done

# Esperar a que todos los procesos en segundo plano terminen
wait
echo ">> Build completed for all directories"
