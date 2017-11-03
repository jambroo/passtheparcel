'use strict'

let places;

try {
  places = require('./places.json');
} catch (e) {
  console.log("ERROR: No places.json provided.");
  process.exit(1);
}

const nodes = places.map((a) => {
  return a.address;
});

const nodes_friendly = places.map((a) => {
  return a.name;
});

const starting_node = 0;
const WAIT_TIME = 200;
let now = new Date();

if ((process.argv.length != 4) || (!Number.isInteger(parseInt(process.argv[3]))) || (nodes_friendly.indexOf(process.argv[2]) == -1)) {
  console.log("ERROR: Invalid parameters. Should be \"node jumpstart.js <region> <skip_count>\".");
  console.log(Number.isInteger(process.argv[3]));
}

const start_region = process.argv[2];
const skip_count = parseInt(process.argv[3]);

const request = require('request');

const poll = (node, end) => {
  request("https://" + nodes[node] + ".amazonaws.com/prod/passTheParcel?get=1", (error, response, body) => {
    let result = JSON.parse(body);
    let diff = parseInt(result.status)-now.getTime();

    if (diff < 0) {
      setTimeout(() => {
        poll(node, end);
      }, WAIT_TIME);
    } else {
      console.log(nodes_friendly[node], diff/1000);
      if (end > 0) {
        poll((node+1)%3, end-1);
      }
    }
  });
}

request("https://" + nodes[starting_node] + ".amazonaws.com/prod/passTheParcel?i=" + skip_count, (error, response, body) => {
  let result = JSON.parse(body);
  if (result.status == "CALLING_NEXT") {
    console.log("Starting at "+start_region);
  }

  poll((starting_node+1)%3, skip_count-1);
});
