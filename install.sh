#!/bin/sh
npm install
npm run build
chmod +x dist/tfl.js
npm link

