#!/usr/bin/env python3

import sys
import json
from ipaddress import ip_network


def main():
    iplist = []
    for line in sys.stdin:
        line, _, _ = line.partition(';')
        line = line.strip()
        if not line:
            continue

        ipn = ip_network(line)
        ip_start = int(ipn.network_address)
        ip_stop = ip_start + 2 ** (32 - ipn.prefixlen)

        iplist.append((ip_start, ip_stop))

    iplist.sort()
    print(json.dumps(iplist))


if __name__ == '__main__':
    main()
