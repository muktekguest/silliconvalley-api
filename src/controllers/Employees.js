const ODM = require("mongoose");

const Employee = require("../models/Employee");
const Company = require("../models/Company");

const Employees = {
  index: (request, response) => {
    Employee
      .find()
      .populate({
        path: "company",
        select: "_id name address"
      })
      .exec()
      .then(employees => {
        response
          .status(200)
          .json({
            meta: employees.length,
            data: employees
          });
      });
  },

  create: (request, response) => {
    const newEmployee = new Employee({
      _id: new ODM.Types.ObjectId(),
      name: request.body.name,
      company: request.body.companyId
    });

    // console.log(newEmployee);

    newEmployee
      .save()
      .then(created => {
        Company
          .findById(request.body.companyId)
          .exec()
          .then(company => {

            console.log(created);

            company.employees.push(created._id);
            company.save();

            console.log(company)

            response
              .status(200)
              .json({
                data: created
              });
          })
          .catch();
      })
      .catch(error => console.log(error));
  },

  delete: (request, response) => {
    const { employeeId } = request.params;

    Employee
      .findOneAndDelete(employeeId)
      .exec()
      .then(deleted => {
        response
          .status(200)
          .json({
            msg: `${ deleted.name } was deleted.`
          })
      })
  }
};

module.exports = Employees;
