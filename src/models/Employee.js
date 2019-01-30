const ODM = require("mongoose");

const Schema = new ODM.Schema({
  _id: ODM.Schema.Types.ObjectId,
  name: String,
  company: {
    type: ODM.Schema.Types.ObjectId,
    ref: "Company"
  }
}, { timestamps: true });

module.exports = ODM.model("Employee", Schema);
