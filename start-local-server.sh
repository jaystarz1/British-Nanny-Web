#!/bin/bash

# Start local server for The British Nanny's Website
echo "Starting local server for The British Nanny's Website..."
echo "=================================================="

cd /Users/jaytarzwell/british-nanny-website

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Starting server with Python 3..."
    echo "Server will be available at: http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo "=================================================="
    python3 -m http.server 8000
# Check if Python 2 is available
elif command -v python &> /dev/null; then
    echo "Starting server with Python 2..."
    echo "Server will be available at: http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo "=================================================="
    python -m SimpleHTTPServer 8000
else
    echo "Python is not installed. Opening in browser directly..."
    open index.html
fi