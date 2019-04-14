

function ip_search(ip, arr, begin, end) {
    'use strict';
    if (begin === end) {
        return false;
    }
    var mid = Math.floor((begin + end) / 2);
    var ip_begin = arr[mid][0];
    var ip_end = arr[mid][1];
    if (ip_begin <= ip && ip < ip_end) {
        return true;
    } else if (ip_begin <= ip) {
        return ip_search(ip, arr, mid + 1, end);
    } else {    // ip < ip_begin
        return ip_search(ip, arr, begin, mid);
    }
}

function domain_find(t, key) {
    'use strict';
    var rkey = key.split('').reverse().join('');
    for (var i = 0; i < rkey.length; ++i) {
        var ch = rkey[i];
        if (!t[ch]) {
            return false;
        }
        t = t[ch];
        if (t.END) {
            if (i === rkey.length - 1 || rkey[i + 1] === '.') {
                return true;
            }
        }
    }

    return false;
}

function ip_to_int(ip) {
    'use strict';

    var num = 0;
    var ip_array = ip.split('.').map(function(element, b, c) { return parseInt(element); });
    if (ip_array.length !== 4) {
        return 0;
    }

    for (var i = 0; i < 4; ++i) {
        if (isNaN(ip_array[i])) {
            return 0;
        }
        if (ip_array[i] < 0 || ip_array[i] >= 256) {
            return 0;
        }

        num *= 256;
        num += ip_array[i];
    }
    return num;
}


var r_proxy = 'SOCKS5 127.0.0.1:1080';
// var r_proxy = 'PROXY 127.0.0.1:8080';
var r_blackhole = 'PROXY 127.0.0.1:8086';
var r_noproxy = 'DIRECT';


// var g_noproxy_tree = {};
// var g_noproxy_iplist = [];


function log(msg) {
    alert(msg);
}


function FindProxyForURL(url, host) {
	'use strict';

	// localhost
	if(localHostOrDomainIs(host, "host.in.white.list")) {
		return r_noproxy;
	}

	var ip_num = ip_to_int(host);
    // whitelist domain
    if (!ip_num && domain_find(g_noproxy_tree, host)) {
        log('white domain: ' + host);
	    return r_noproxy;
    }

    if (!ip_num) {
        // BUG: dnsResolve will fail on ipv6 hosts
        ip_num = ip_to_int(dnsResolve(host));
    }

    // cn ip
    if (ip_search(ip_num, g_noproxy_iplist, 0, g_noproxy_iplist.length)) {
        log('ip hit. host: ' + host + ', ip: ' + ip_num);
        return r_noproxy;
    }

    log('proxy. host: ' + host + ', ip: ' + ip_num);
    return r_proxy;
}
