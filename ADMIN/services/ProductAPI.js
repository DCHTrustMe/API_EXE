function apiGetProduct(searchValue) {
  return axios({
    url: `https://64cd86fb0c01d81da3ee2c41.mockapi.io/Products`,
    method: "GET",
    params: {
      name: searchValue || undefined,
    },
  });
}

function apiGetProductByID(productId) {
  return axios({
    url: `https://64cd86fb0c01d81da3ee2c41.mockapi.io/Products/${productId}`,
    method: "GET",
  });
}

function apiCreateProduct(product) {
  return axios({
    url: "https://64cd86fb0c01d81da3ee2c41.mockapi.io/Products",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(productId, newProduct) {
  return axios({
    url: `https://64cd86fb0c01d81da3ee2c41.mockapi.io/Products/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    url: `https://64cd86fb0c01d81da3ee2c41.mockapi.io/Products/${productId}`,
    method: "DELETE",
  });
}
