function apiGetProduct(searchValue) {
  return axios({
    url: `https://64ba58b65e0670a501d60705.mockapi.io/products`,
    method: "GET",
    params: {
      name: searchValue || undefined,
    },
  });
}

function apiGetProductByID(productId) {
  return axios({
    url: `https://64ba58b65e0670a501d60705.mockapi.io/products/${productId}`,
    method: "GET",
  });
}

function apiCreateProduct(product) {
  return axios({
    url: "https://64ba58b65e0670a501d60705.mockapi.io/products",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(productId, newProduct) {
  return axios({
    url: `https://64ba58b65e0670a501d60705.mockapi.io/products/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    url: `https://64ba58b65e0670a501d60705.mockapi.io/products/${productId}`,
    method: "DELETE",
  });
}
