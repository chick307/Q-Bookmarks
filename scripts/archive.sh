#!/bin/sh

cd "$(dirname "$0")/../build/release"
zip -r ../archive.zip .
