const { nanoid } = require("nanoid");
// const product = require("./product");
const { Product } = require("../models/product");

const addProductlHandler = async (request, h) => {

  // request.header("Access-Control-Allow-Origin", "*");
  // console.log(`add`);
  const { name_product, price_product, stock_product } = request.payload;

  try {

    const product = await Product.create({
      product_name: name_product,
      product_price: price_product,
      product_stock: stock_product,

    });


    return h.response({
      data : product
    });

  } catch (error) {

    return h.response({
      message : error,
      data : null,
      status : "danger",
      statusCode : 400

    });

  }


  const response = h.reponse({
    status: "fail",
    message: "Data gagal di tambahkan!",
  });
  response.code(500);
  return response;
};

const getAllProductHandler = async (request, h) => {
  try {
    const products = await Product.findAll();
    return h.response({
      data : products
    });
  } catch (error) {
    console.log(error);
  };

}

// show detail
const getMentalByIdHandler = (request, h) => {
  console.log(`get id`);
  const { id } = request.params;
  const mentals = product.product.filter((n) => n.id === id)[0];
  if (mentals !== undefined) {
    return {
      status: "success",
      data: {
        product,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Data tidak ditemukan",
  });
  response.code(404);
  return response;
};

//edit book
const editMentalByIdHandler = (request, h) => {
  console.log(`edit`);
  const { id, createAt } = request.params;
  const { mbti, mentalhealth } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = product.product.findIndex((product) => product.id === id);
  if (index !== -1) {
    product.product[index] = {
      ...product[index],
      mbti,
      mentalhealth,
      id,
      createAt,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Data berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Data gagal diperbarui",
  });
  response.code(404);
  return response;
};

//delete book
const deleteMentalByIdHandler = (request, h) => {
  console.log(`hapus`);
  const { id } = request.params;
  const index = product.product.findIndex((product) => product.id === id);
  console.log(product.product.findIndex((product) => product.id === id));
  if (index) {
    product.product.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Data berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Data gagal dihapus, Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addProductlHandler,
  getAllProductHandler,
  getMentalByIdHandler,
  editMentalByIdHandler,
  deleteMentalByIdHandler,
};
