# SubNetCalc

[![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-f1e05a?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)](#)

A dependency-free IPv4 calculator with a responsive dark interface and reduced-motion-aware decode animation. Address processing stays in the browser.

![SubNetCalc screenshot](assets/SubNetCalc.png)

## Run locally

Open `index.html` in a browser, or serve the directory with Python:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Then visit http://localhost:8000. Deploy `index.html`, `styles.css`, `ipv4.js`, and `app.js` to any static web server. No build step or backend is needed.

## Use

Enter a dotted-decimal IPv4 address and a prefix (`24` or `/24`) or contiguous subnet mask (`255.255.255.0`). You can also enter `192.168.0.10/24`; an inline CIDR suffix takes precedence and updates the subnet field when calculated. Click Calculate or press Enter.

An IP address alone cannot determine its network. `/24` is only the initial example, not an inferred mask. CIDR uses a forward slash. Leading-zero octets are rejected to avoid ambiguous interpretation. `/31` assumes a point-to-point link with two usable addresses; `/32` is a single-host route. Results describe address arithmetic, not live network configuration or reachability.

Outputs include network CIDR, subnet mask, broadcast, binary address/mask/network AND breakdown, hexadecimal and unsigned decimal IP, wildcard mask, usable range, and address counts.

Address Details also shows subnet bits, host-bit arithmetic, and subnetwork counts. Enter the optional parent network prefix to calculate borrowed bits (subnet prefix minus parent prefix) and subnetworks (2 raised to the borrowed-bit count). For example, subnet /25 within parent /24 gives 2¹ = 2 subnetworks and 2⁷ = 128 − 2 = 126 usable hosts per subnet. Without a parent prefix, subnet counts remain unspecified; host calculations are still shown. /31 and /32 do not subtract two hosts.

## Verify calculation logic

With Node.js installed, run `node --test tests/ipv4.test.cjs`.
