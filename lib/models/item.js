module.exports = class Item {
  uuid = "";
  lastMigration = 9;
  name = "";
  endpointPrefix = "";
  latency = 0;
  port = 3000;
  routes = [];
  proxyMode = false;
  proxyHost = "";
  https = false;
  cors = true;
  headers = [
    {
      key: "Content-Type",
      value: "application/json",
    },
  ];
  addHeader = (key, value) => {
    this.headers.push({ key, value });
  };

  addRoute = (route) => {
    this.routes.push(route);
  };
};
