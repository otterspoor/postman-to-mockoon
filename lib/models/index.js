const DeepCopy = require("../deep_copy");

const Item = require("./item");
const Mockoon = require("./mockoon");
const Response = require("./response");
const Route = require("./route");
const Environment = require("./environment");

module.exports = {
    Item: () => DeepCopy(Item),
    Mockoon: () => DeepCopy(Mockoon),
    Response: () => DeepCopy(Response),
    Route: () => DeepCopy(Route),
    Environment: () => DeepCopy(Environment)
};
