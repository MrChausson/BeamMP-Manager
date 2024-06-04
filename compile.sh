#!/bin/bash

# Check if bun is installed
which bun > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "bun is not installed. Please install it first and make sure it is in PATH."
    exit 1
fi

# Load environment variables from .env file
if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi



# Get bun dependencies
bun install

# Build with vite
bun run build

echo "BeamMP-Manager built successfully. Installing as user systemd service..."

# Stop the service if it is running
systemctl --user stop beammp-manager.service

mkdir -p $HOME/.BeamMP-Manager/
cp -r build $HOME/.BeamMP-Manager/

echo "Using $HOME/.BeamMP-Manager/server as directory for BeamMP server directory"
mkdir -p $HOME/.BeamMP-Manager/server
mkdir -p $HOME/.config/systemd/user

#get bun executable path
BUN_EXECUTABLE=$(which bun)

# Add the systemd user entry
cat <<EOF > ~/.config/systemd/user/beammp-manager.service
[Unit]
Description=BeamMP Manager
After=network.target

[Service]
ExecStart=$BUN_EXECUTABLE $HOME/.BeamMP-Manager/build/index.js
WorkingDirectory=$HOME/.BeamMP-Manager/server

[Install]
WantedBy=default.target
EOF

# Reload systemd user configuration
systemctl --user daemon-reload

# Enable and start the service
systemctl --user enable beammp-manager.service
systemctl --user start beammp-manager.service

echo "BeamMP-Manager installed and started successfully."