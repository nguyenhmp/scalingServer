#!/bin/bash
# My first script
sudo apt-get update && sudo apt-get upgrade -y;
sudo apt-get install build-essential -y;
sudo apt-get install libssl-dev -y;
sudo apt-get install python-software-properties -y;
sudo apt-get install git -y && git clone https://github.com/nguyenhmp/scalingServer;
sudo apt-get update -y && sudo apt-get upgrade -y;
curl -O 'https://nodejs.org/dist/v4.3.1/node-v4.3.1-linux-x64.tar.xz' && tar -xf node-v4.3.1-linux-x64.tar.xz;
echo "export PATH=/home/ubuntu/node-v4.3.1-linux-x64/bin:$PATH" >> ~/.bashrc;
source ~/.bashrc;
cd smallscale && /home/ubuntu/node-v4.3.1-linux-x64/bin/npm install;