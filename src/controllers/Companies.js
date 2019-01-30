const ODM = require("mongoose");

const Company = require("../models/Company");

const Companies = {
  index: (request, response) => {
    Company
      .find()
      .exec()
      .then(companies => {
        response
          .status(200)
          .json({
            meta: companies.length,
            data: companies
          });
      })
      .catch(error => console.log(error));
  },

  create: (request, response) => {
    const newCompany = new Company({
      _id: new ODM.Types.ObjectId(),
      name: request.body.name,
      address: request.body.address
    });

    newCompany
      .save()
      .then(companyCreated => {
        response
          .status(200)
          .json({
            data: companyCreated
          });
      })
      .catch(error => console.log(error));
  },

  delete: (request, response) => {
    const { companyId } = request.params;

    Company
      .findOneAndDelete(companyId)
      .exec()
      .then(company => {
        response
          .status(200)
          .json({
            msg: `${ company.name } was deleted.`
          });
      })
      .catch(error => console.log(error));
  },

  employees: (request, response) => {
    Company
      .findById(request.params.companyId)
      .populate("employees")
      .exec()
      .then(companies => {
        // console.log(companies.employees)
        response
          .json({
            meta: companies.employees.length,
            data: companies.employees
          });
      })
      .catch(error => console.log(error));
  }
};

module.exports = Companies;
