---
title: "Rsync /home to drive"
date: 2026-03-20T11:30:59Z
description: "Current year in HTML."
tags: ["linux", "backup"]
---

Save exclude files to /var/tmp/ignorelist:

```sh
wget https://raw.githubusercontent.com/rubo77/rsync-homedir-excludes/master/rsync-homedir-excludes.txt -O /var/tmp/ignorelist

```

> You have to mount your drive to /media/<username>/homebackup !

Rsync home folder to /media/<username>/backup:

```sh
sudo rsync -aP --exclude-from=/var/tmp/ignorelist /home/$USER/ /media/$USER/homebackup
```
