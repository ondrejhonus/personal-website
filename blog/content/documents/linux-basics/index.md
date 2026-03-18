---
title: "Linux Basics"
date: 2026-03-16T20:30:59Z
description: "bash scripts, services, linux administration, commands, firewalling."
tags: ["linux", "bash"]
---

## Exam example

### Part 1: Basic knowledge

#### Print all files in a directory, including hidden files, permissions, group and user owners

```sh
ls -la /path/to/directory
```

#### Print first 15 lines of a file

```sh
head -n 15 /path/to/file
```

#### Get free memory

```sh
free -h
```

#### Show disk block devices

```sh
lsblk
```

#### Show all processes running under root

simple way (not 100% correct):

```sh
ps aux | grep root
```

more correct way:

```sh
ps -U root -u root
```

#### What is GRUB and what is it for?

GRUB is a Linux bootloader. It's responsible for loading the kernel, initializing the system and it provides a menu to select an operating system to boot.

Config file is located at `/etc/default/grub`

### Part 2: SAMBA configuration and installation

#### Install samba package

```sh
apt install samba samba-common-bin
```

#### Create two users and them to samba

```sh
useradd student1
useradd student2
```

```sh
smbpasswd -a student1
smbpasswd -a student2
```

#### Create directory /data and set permissions:

- Owner: student
- Group: users
- Permissions: read, write, browsable
- Others: no permissions

```sh
mkdir -p /data
chown student:users /data
chmod 770 /data
```

#### Where are SAMBA logs (info about logins, errors)

```sh
/var/log/samba/
```

#### What port is SAMBA listening on?

```sh
netstat -tulpn | grep smbd
```

### Part 3: Network scanning, backups, scripts

#### Make a bash script that:

- Backups /data to file `data_DDMMYYYY.tar.gz`
- Check if file exists, if it does, rename it to `*.old`
- Print if backup was successful or not

```sh
#!/bin/bash
BACKUP_FILE="data_$(date +%d%m%Y).tar.gz"
if [ -f "$BACKUP_FILE" ]; then
  mv "$BACKUP_FILE" "${BACKUP_FILE}.old"
fi
tar -cvpzf "$BACKUP_FILE" /data
if [ $? -eq 0 ]; then
  echo "Backup successful: $BACKUP_FILE"
else
  echo "Backup failed"
fi
```

#### Make an rsync command that copies `home/student` to SAMBA server at `192.168.1.100`, shared folder `backup`

```sh
# Mount the SAMBA share
mount -t cifs //192.168.1.100/backup /mnt/backup -o username=student
# Use rsync to copy files
rsync -avz /home/student/ /mnt/backup/
```

#### Print all computers on network `192.168.10.0/24` and show their MAC addresses

```sh
nmap -sn 192.168.10.0/24
```

#### Make a CRON job that will run `backup.sh` every day at 21:00

```sh
0 21 * * * /path/to/backup.sh
```

#### Command for backing up a directory including file attributes and permissions

```sh
tar -cvpzf backup.tar.gz /path/to/directory
```


### Table of contents

- [Bash Scripts](#bash-scripts)
- [Service Installation](#service-installation)
- [Service Administration](#service-administration)
- [Command Knowledge](#command-knowledge)
- [Firewalling](#firewalling)
- [List of basic commands](#list-of-basic-commands)
- [Exam example](#exam-example)
  - [Part 1: Basic knowledge](#part-1-basic-knowledge)
  - [Part 2: SAMBA configuration and installation](#part-2-samba-configuration-and-installation)
  - [Part 3: Network scanning, backups, scripts](#part-3-network-scanning-backups-scripts)

---

### List of basic commands

- `ls` -- list files in directory
  - `-la` -- long format, including hidden files
- `cat` -- print file contents
- `echo` -- print text to console
- `cd` -- change directory
- `pwd` -- print working directory
- `cp` -- copy files
- `mv` -- move files
- `rm` -- remove files
  - `-rf` -- remove directory
- `mkdir` -- create directory
- `ps` -- print running processes
  - `aux` -- print all processes with user and command
- `top` -- print running processes in real time
- `htop` -- interactive process viewer
- `grep` -- search for text in files, rows
- `awk` -- text processing, columns
- `head` -- print first lines of file
- `tail` -- print last lines of file
- `kill` -- kill process by PID
- `pkill` -- kill process by name
- `killall` -- kill all processes with name
- `systemctl` -- manage services
- `ip` -- manage network interfaces
- `netstat` -- print network connections
  - `-tulpn` -- print connections, listening ports, numeric output
- `ss` -- print network connections
- `free` -- print free memory
- `du` -- print disk usage
- `df` -- print disk free space
- `tar` -- create and extract tar archives
- `lsblk` -- list block devices
- `fdisk` -- manage disk partitions
- `mount` -- mount filesystems
- `umount` -- unmount filesystems
- `useradd` -- add user
- `userdel` -- delete user
- `passwd` -- change user password
- `groupadd` -- add group
- `groupdel` -- delete group
- `usermod` -- modify user
- `chown` -- change file ownership
- `chmod` -- change file permissions
- `journalctl` -- print system logs
- `rsync` -- synchronize files between directories or hosts

1.  ### **Bash Scripts**

    – http://blog.iservery.com/2013/04/04/bash-skripty-priklady/ (awk, grep, iptables, tr, tar, ifconfig, dmesg, crontab)
    - **Number of packets sent on eth0 interface**
      - with ip `ip -s link show eth0 | awk '{print $2}' | tail -n 1`
      - with ifconfig `ifconfig eth0 | grep "TX packets" | awk '{print $2}' | tail -n 1`
    - **Number of packets sent on port 80**
      - iptables `iptables -v -L | grep "dpt:80" | awk '{print $1}'`
    - **What port is a process listening on**
      - `netstat -tulnp | grep <process_name>`
    - **Creating users from a text file**
      - `newusers users.txt`
      - or a while loop (as root)

        ```sh
        while read -r username password; do
          useradd -m  "$username"
          echo "$username:$password" | chpasswd
        done < users.txt
        ```

        - m -- create home directory

    - **Directory backup**
      - `tar -cvpzf backup.tar.gz /path/to/directory`
        - c -- create archive
        - v -- verbose output
        - p -- preserve permissions - z -- compress with gzip
        - f -- specify filename
    - **Cron jobs** (checking – /var/log/syslog, messages) http://blog.iservery.com/2013/05/09/administrace-cronu/
      - `crontab -e` -- edit cron jobs
      - `crontab -l` -- list cron jobs
      - `crontab -r` -- remove cron jobs
        Syntax of cron job -- `* * * * * command` -- minute, hour, day of month, month, day of week
        - `0 0 * * *` -- every day at midnight
        - `0 * * * *` -- every hour at minute 0
        - `*/5 * * * *` -- every 5 minutes
        - `* * * * *` -- every minute

2.  ### **Service Installation**
    - **NFS**
      - `apt install nfs-kernel-server` (server)
      - `apt install nfs-common` (client)

        Create NFS directory on server

        ```sh
        mkdir -p /var/nfs/share
        ```

        Change owner to nobody

        ```sh
        chown nobody:nogroup /var/nfs/share
        ```

        Edit exports file

        ```sh
        sudo vim /etc/exports
        ```

        > /var/nfs/share
        >
        > ```sh
        > /var/nfs/share <client_ip>(rw,sync,no_subtree_check)
        > ```

    - **Apache**
      - Install apache2 package -- `apt install apache2`
      - enable and start apache -- `systemctl enable --now apache2`
      - check status -- `systemctl status apache2`
    - **Samba**
      - Install samba package -- `apt install samba samba-common-bin`
      - enable and start samba -- `systemctl enable --now smbd`
      - check status -- `systemctl status smbd`
      - create share directory in `~` -- `mkdir -p /home/share`
      - configure samba -- `sudo vim /etc/samba/smb.conf`
        - add share configuration
          > /etc/samba/smb.conf
          >
          > ```sh
          > [share]
          > path = /home/share
          > read only = no
          > browseable = yes
          > ```
      - add samba user -- `smbpasswd -a <username>`
      - restart samba -- `systemctl restart smbd`
      - samba logs: `/var/log/samba/`

    - **MySQL**
      - Install mysql server -- `apt install mysql-server`
      - enable and start mysql -- `systemctl enable --now mysql`
      - check status -- `systemctl status mysql`
      - mysql logs: `/var/log/mysql/`
    - **OpenSSH**
      - Install openssh server -- `apt install openssh-server`
      - enable and start ssh -- `systemctl enable --now ssh`
      - check status -- `systemctl status ssh` / `systemctl status sshd`
      - ssh logs: `/var/log/auth.log` (for login attempts, etc.)

3.  ### **Service Administration**
    - **Database backup import/export**
      - **MySQL**
        - export -- `mysqldump -u <username> -p <database_name> > backup.sql`
        - import -- `mysql -u <username> -p <database_name> < backup.sql`
    - **General backup**
      - **tar**
        - differential backup -- `tar -cvpzf backup.tar.gz --newer-mtime="YYYY-MM-DD HH:MM:SS" /path/to/directory`
        - full backup -- `tar -cvpzf backup.tar.gz /path/to/directory`
4.  ### **Command Knowledge**
    - **Disk space usage**
      - Drive usage of -- `du   -sh <dir>`
      - Drive usage of separate files in directory -- `du -sh <dir>/*`
    - **Logging system**
      - logs are located in `/var/log/`
      - print live logs with `journalctl`
    - **Memory**
      - print free memory with `free -h`
        - h -- human readable
    - **Removing programs from memory** (kill, etc.)
      - kill ps by PID -- `kill <PID>`
      - kill ps by name -- `pkill <p_name>`
      - kill all processes with name -- `killall <p_name>`
    - **Service management**
      - start -- `systemctl start <service>`
      - stop -- `systemctl stop <service>`
      - restart -- `systemctl restart <service>`
      - enable on startup -- `systemctl enable <service>`
      - disable on startup -- `systemctl disable <service>`
    - **Network interface configuration**
      - print interfaces -- `ip a`
      - print routing table -- `ip r`
      - print ARP table -- `ip n`
      - print open ports -- `ss -tuln`
      - print network connections -- `netstat -tuln`
    - **User management**
      - add user -- `useradd <username>`
      - delete user -- `userdel <username>`
      - change user password -- `passwd <username>`
    - **Group management**
      - add group -- `groupadd <groupname>`
      - delete group -- `groupdel <groupname>`
      - add user to group -- `usermod -aG <groupname> <username>`
    - **User permissions**
      - change file permissions -- `chmod <permissions> <file>`
      - change file ownership -- `chown <owner>:<group> <file>`

5.  ### **Firewalling**
    - **Essential commands**
      - List rules -- `iptables -L -v -n`
      - Delete (F = flush) all rules -- `iptables -F`
      - Allow incoming SSH -- `iptables -A INPUT -p tcp --dport 22 -j ACCEPT`
      - Drop a specific IP -- `iptables -A INPUT -s 192.168.1.50 -j DROP`
      - Save rules -- `iptables-save > /etc/iptables/rules.v4`
    - **Rate limiting**
      - Prevents DoS attacks
      - Limit SSH to 3 connections per minute

        ```sh
        iptables -A INPUT -p tcp --dport 22 -m limit --limit 3/min -j ACCEPT
        ```

    - **Logging**
      - Logs are at `/var/log/syslog` or `/var/log/messages`
      - The `LOG` rule must be placed before `DROP` or `ACCEPT`
      - Log dropped packets

        ```sh
        iptables -A INPUT -j LOG --log-prefix "IPTables-Dropped: "
        iptables -A INPUT -j DROP
        ```

    - **Tagging**
      - Tags packets for identification (requires `mangle` table)
      - Tag HTTP traffic on port 80 with the number 1

        ```sh
        iptables -t mangle -A PREROUTING -p tcp --dport 80 -j MARK --set-mark 1
        ```

---

