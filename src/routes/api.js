const { Router } = require("express");

const Employees = require("../controllers/Employees");
const Companies = require("../controllers/Companies");

const app = Router();

app.route("/employees")
  .get(Employees.index)
  .post(Employees.create);

app.route("/companies")
  .get(Companies.index)
  .post(Companies.create);

app.route("/companies/:companyId")
  .delete(Companies.delete);

app.route("/employees/:employeeId")
  .delete(Employees.delete);

app.route("/companies/:companyId/employees")
  .get(Companies.employees);

module.exports = app;
