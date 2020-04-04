#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

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
  Item,
  Mockoon,
  Response,
  Route,
  Environment,
} = require("./lib/models/");

let rawdata = fs.readFileSync(filepath);
let postman = JSON.parse(rawdata);

let mockoon = new Mockoon();
let env = new Environment();
env.item.uuid = postman.info._postman_id;

postman.item.forEach((collection) => {
  collection.item.forEach((r_data) => {
    if (r_data.request && r_data.responses && r_data.responses.length == 0) {
      // console.warn("Found request-only item, skipping...");
    } else {
      if(r_data.response){
        r_data.responses = r_data.response;
      }
      let route = new Route();
      route.documentation = r_data.name;
      route.method = r_data.request.method.toLowerCase();
      let url = r_data.request.url;
      route.endpoint = typeof url == "string" ? url : url.path.join("/");
      if (r_data.responses && r_data.responses.length > 0) {
        r_data.responses.forEach((r) => {
          let resp = new Response();
          if (r.code) {
            resp.statusCode = r.code.toString();
          }
          if (r.header) {
            resp.headers = r.header;
          }
          if (r.body) {
            resp.body = r.body;
          }
          route.addResponse(resp);
        });
      } else {
        route.addResponse(new Response());
      }
      env.item.addRoute(route);
    }
  });
});

mockoon.addEnvironment(env);

fs.writeFile(outfile[1], JSON.stringify(mockoon, null, 4), function (err) {
  if (err) throw err;
  console.log(`Mockoon file saved to ${outfile[1]}`);
});
