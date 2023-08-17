function apiGetProduct(searchValue) {
  return axios({
    url: `https://64ba58b65e0670a501d60705.mockapi.io/Products`,
    method: "GET",
    params: {
      name: searchValue || undefined,
    },
  });
}

function apiGetProductByID(productId) {
  return axios({
    url: `https://64ba58b65e0670a501d60705.mockapi.io/Products/${productId}`,
    method: "GET",
  });
}

function apiCreateProduct(product) {
  return axios({
    url: "https://64ba58b65e0670a501d60705.mockapi.io/Products",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(productId, newProduct) {
  return axios({
    url: `https://64ba58b65e0670a501d60705.mockapi.io/Products/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    url: `https://64ba58b65e0670a501d60705.mockapi.io/Products/${productId}`,
    method: "DELETE",
  });
}
