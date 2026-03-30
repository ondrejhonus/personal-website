---
title: "Linux scheduled backup with CRON"
description: "Linux scheduled backup with CRON"
date: 2026-03-19T10:30:59Z
tags: ["script", "linux", "python"]
---

## Python script to backup 

> backup.py 
```python
import sys, subprocess

if len(sys.argv) != 2:
  print("No destination file provided")
  sys.exit(1)

source = "/home/u1/Plocha/"
target = sys.argv[1]

result = subprocess.run(["rsync", "-av", source, target])

if result.returncode == 0:
  print("Rsync backup was successful")
  sys.exit(0)
else:
  print("Error while backing up", result.returncode)
  sys.exit(1)
```

## Add to crontab
Backup every day at 3:00

```
sudo crontab -e
```
```zsh
# m h  dom mon dow   command
  0 3  *   *   *     /usr/bin/python3 /home/u1/backup.py /home/u1/backup/
``` 

---

## Reboot every monday at 5:01
```
sudo crontab -e
```
```zsh
# m h  dom mon dow   command
  1 5  *   *   1     /bin/systemctl reboot
``` 