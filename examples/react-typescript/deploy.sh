#!/usr/bin/env bash

yarn build &&
cd build &&
git add . &&
git commit -m "update build" &&
git init &&
git remote add origin git@github.com:Scott-YuYan/MoreMoney-React-Website.git &&
git push -u origin master -f
cd -
