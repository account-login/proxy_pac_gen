#!/usr/bin/env python3

import json
import sys


def _trie_add(t, key):
    if not key:
        t['END'] = True
        return

    ch = key[0]
    if ch not in t:
        t[ch] = dict()

    _trie_add(t[ch], key[1:])


def main():
    d = dict()

    for line in sys.stdin:
        line, _, _ = line.partition('#')
        line, _, _ = line.partition(';')
        line = line.strip()
        if not line:
            continue

        _trie_add(d, ''.join(reversed(line)))

    print(json.dumps(d))


if __name__ == '__main__':
    main()
