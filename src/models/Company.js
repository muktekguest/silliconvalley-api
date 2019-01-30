const ODM = require("mongoose");

const Schema = new ODM.Schema({
  _id: ODM.Schema.Types.ObjectId,
  name: String,
  address: String,
  employees: [{
    type: ODM.Schema.Types.ObjectId,
    ref: "Employee"
  }]
});

module.exports = ODM.model("Company", Schema);
