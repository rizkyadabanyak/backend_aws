const { nanoid } = require("nanoid");
const product = require("./product");

const addProductlHandler = (request, h) => {
  console.log(`add`);
  const { name_product, price_product, stock_product } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const udpatedAt = createdAt;

  const newProduct = {
    name_product,
    price_product,
    stock_product,
    id,
    createdAt,
    udpatedAt,
  };

  // return 'sss';
  product.product.push(newProduct);
  const isSuccess = product.product.filter((product) => product.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Data berhasil ditambah",
      data: {
        name_product: name_product,
        price_product: price_product,
        stock_product: stock_product,
        nodeId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.reponse({
    status: "fail",
    message: "Data gagal di tambahkan!",
  });
  response.code(500);
  return response;
};

const getAllProductHandler = (request, h) => ({
  status: "success get all Data",
  data: {
    product,
  },
});

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
