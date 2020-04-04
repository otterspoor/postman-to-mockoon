module.exports = class Response {
  uuid = "";
  body = "{}";
  latency = 0;
  statusCode = "200";
  label = "";
  headers = [];
  filePath = "";
  sendFileAsBody = false;
  rules = [];

  addHeader = (header) => {
    this.headers.push(header);
  };

  addRule = (rule) => {
    this.rules.push(rule);
  };
};
