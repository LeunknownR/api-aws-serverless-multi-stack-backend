#!/bin/sh

source ./utils.sh

ROOT=$(pwd);

message "Installing dependencies from root..."
npm i
for directory in $(ls); do
	if [[ $directory == "common-layer" ]]; then
		message "Installing dependencies from \"$directory\"...";
		cd "$directory/src/common";
		npm i;
		cd $ROOT;
	elif [ -d "$directory/layer" ]; then
		message "Installing dependencies from \"$directory\"...";
		cd $directory;
		npm i;
		cd $ROOT;
	fi
done
success_message "All dependencies are installed!";