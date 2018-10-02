#!/usr/bin/env python3

import sys
import json
from ipaddress import ip_address


def main():
    iplist = []
    for line in sys.stdin:
        ips, size = line.split()
        ip_start = int(ip_address(ips))
        ip_stop = ip_start + int(size)

        iplist.append((ip_start, ip_stop))

    iplist.sort()
    print(json.dumps(iplist))


if __name__ == '__main__':
    main()
