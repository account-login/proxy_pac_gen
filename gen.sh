#!/usr/bin/env bash


cat white-domains.txt |./domain_gen.py >white-domains.json

cat cn.txt |./apnic_gen.py >cn.json
cat reserved.txt |./netmask_gen.py >reserved.json
./list_merge.py cn.json reserved.json >noproxy.json

echo var g_noproxy_tree = `cat white-domains.json`;
echo var g_noproxy_iplist = `cat noproxy.json`;
cat proxy.pac.tail.js
