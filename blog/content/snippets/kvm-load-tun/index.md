---
title: "KVM Loadtun"
date: 2026-03-16T19:30:59Z
description: "Current year in HTML."
tags: ["kvm"]
---

```sh
#!/bin/bash

mkdir -p /dev/net
sudo mknod /dev/net/tun c 10 200
sudo chmod 600 /dev/net/tun
```
