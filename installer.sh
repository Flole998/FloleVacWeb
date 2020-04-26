#!/bin/bash
apt update
apt -y install wget
wget https://github.com/Flole998/FloleVacWeb/raw/master/floleVacWeb -O /usr/local/bin/floleVacWeb
chmod +x  /usr/local/bin/floleVacWeb
wget https://github.com/Flole998/FloleVacWeb/raw/master/deployment/etc/hosts -O /tmp/hosts.txt
cat /tmp/hosts.txt >> /etc/hosts
wget https://github.com/Flole998/FloleVacWeb/raw/master/deployment/floleVacWeb.conf -O /etc/init/floleVacWeb.conf
sed -i 's/-l 2/-l 0/' /opt/rockrobo/watchdog/ProcessList.conf
wget https://github.com/Flole998/FloleVacWeb/raw/master/deployment/etc/rc.local -O /tmp/floleVacWeb.rc
sed -i '/exit 0/d' /etc/rc.local
cat /tmp/floleVacWeb.rc >> /etc/rc.local
echo "exit 0" >> /etc/rc.local
reboot
