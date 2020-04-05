#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { transformPostmanToMockoon } = require("./transform")

var outfile = process.argv.slice(2);

if (outfile.length < 1) {
  console.error("USAGE: postman-to-mockoon input-file output-file");
  return false;
}
let filepath = outfile[0];
if (!outfile[1]) {
  outfile[1] = `${path.dirname(filepath)}/mockoon_${path.posix.basename(
    filepath
  )}`;
}

if (!fs.existsSync(filepath)) {
  console.log(`Cannot access file at ${filepath}`);
  return false;
}

const {
  Mockoon,
  Environment,
} = require("./lib/models/");

let rawdata = fs.readFileSync(filepath);
let postman = JSON.parse(rawdata);

let mockoon = new Mockoon();
let env = new Environment();
env.item.uuid = postman.info._postman_id;

transformPostmanToMockoon({ postman, mockoon, env })

fs.writeFile(outfile[1], JSON.stringify(mockoon, null, 4), function (err) {
  if (err) throw err;
  console.log(`Mockoon file saved to ${outfile[1]}`);
});
