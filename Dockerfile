FROM node:6-onbuild
EXPOSE 5000
CMD [ "node", "relay.js" ]
