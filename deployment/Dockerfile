FROM node:10.16.0-alpine

WORKDIR /deploy

# make sure you add the volume to the docker container /build to your host map
# SSH to your vacuum, stop the floleVacWeb service (service floleVacWeb stop), replace /usr/local/bin/floleVacWeb with your new binary , chmod +x it and restart floleVacWeb (service floleVacWeb start).


RUN apk update \
; apk --no-cache add git bash ca-certificates \
; rm -rf /var/cache/apk/* \
; npm config set strict-ssl false \
; npm install -g n \
; npm install -g pkg \
; mkdir "/deploy" \
; echo "#!/bin/sh" >> /deploy/build.sh \
; echo "git clone https://github.com/Hypfer/FloleVacWeb.git tmp && mv tmp/.git /deploy && rm -rf tmp && git reset --hard" >> /deploy/build.sh \
; echo "npm install" >> /deploy/build.sh \
; echo "npm run build" >> /deploy/build.sh \
; echo cp /deploy/floleVacWeb /build >> /deploy/build.sh

ENTRYPOINT [ "sh", "/deploy/build.sh" ]
