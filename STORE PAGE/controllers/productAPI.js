function apiGetProducts(dropdown) {
  return axios({
    url: `https://64ba58b65e0670a501d60705.mockapi.io/products`,
    method: "GET",
    params: {
      type: dropdown || undefined,
    },
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://64ba58b65e0670a501d60705.mockapi.io/products/${productId}`,
    method: "GET",
  });
}

//product = {name:"...",price:"...", image:"..", type:".."}
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
