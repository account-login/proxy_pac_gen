#!/usr/bin/env python3

import sys
import json


def main(files):
    iplist = []
    for path in files:
        with open(path, 'rt') as fp:
            iplist += json.load(fp)

    iplist.sort()
    print(json.dumps(iplist))


if __name__ == '__main__':
    main(sys.argv[1:])
