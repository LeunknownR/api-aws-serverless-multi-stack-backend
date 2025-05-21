#!/bin/bash

CURRENT_DIRECTORY=$(pwd)
STACK_PORT_MAPPING_FILE="stack-port-mapping.txt"

function print_error() {
  echo -e "\033[31m$1\033[0m"
}

function run_stack() {
  local stack_name="$1"
  local stack_ports="$2"

  # Leyendo los puertos de http y lambda
  IFS=':' read -r http_port lambda_port <<< "$stack_ports"

  cd "$stack_name" && \
    sls offline \
      --reloadHandler \
      --httpPort="${http_port}" \
      --lambdaPort="${lambda_port}" & \
    pid[$http_port]=$!
}

function run_project() {
  # Leyendo el archivo de mappeo de puertos, ignorando comentarios
  while IFS='=' read -r stack_name stack_ports || [[ -n "$stack_name" ]]; do
    # Ignorar líneas vacías o comentadas
    [[ -z "$stack_name" || "$stack_name" =~ ^[[:space:]]*# ]] && continue
    
    cd "$CURRENT_DIRECTORY" || exit 1
    if [ -e "$stack_name" ]; then
      run_stack "$stack_name" "$stack_ports"
    else 
      print_error "x The stack \"$stack_name\" was not found x"
    fi
  done < "$STACK_PORT_MAPPING_FILE"
}

if [ -f "$STACK_PORT_MAPPING_FILE" ]; then
  run_project
  trap 'kill ${pid[*]}; exit 1' INT
  wait
else
  print_error "x The file \"$STACK_PORT_MAPPING_FILE\" was not found x"
fi