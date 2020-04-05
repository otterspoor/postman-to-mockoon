const Item = require("./item");
const DeepCopy = require("../deep_copy")

module.exports = {
  type: "environment",
  item: DeepCopy(Item)
};
