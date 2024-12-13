#!/usr/bin/env bash

# Actualiza los paquetes e instala dependencias necesarias
apt-get update && apt-get install -y wget unzip

# Descarga e instala Google Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt-get install -y ./google-chrome-stable_current_amd64.deb
rm google-chrome-stable_current_amd64.deb
