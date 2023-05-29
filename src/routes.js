const {
  addProductlHandler,
  getAllProductHandler,
  getMentalByIdHandler,
  editMentalByIdHandler,
  deleteMentalByIdHandler,
} = require("./handler");

const routes = [
  // /
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "ya bang ya bang";
    },
  },
  // create date (POST)
  {
    method: "POST",
    path: "/product/add",
    handler: addProductlHandler,
  },
  //get all
  {
    method: "GET",
    path: "/product/all",
    handler: getAllProductHandler,
  },
  //detail data
  {
    method: "GET",
    path: "/mental/{id}",
    handler: getMentalByIdHandler,
  },
  //update
  {
    method: "PUT",
    path: "/mental/{id}",
    handler: editMentalByIdHandler,
  },
  //delete
  {
    method: "DELETE",
    path: "/mental/{id}",
    handler: deleteMentalByIdHandler,
  },
];

module.exports = { routes };
