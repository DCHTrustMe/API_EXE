// Data API
getProducts();
function getProducts() {
  apiGetProduct()
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

let isSubmitted = false;
let products = [];

// Add Product
function createProduct() {
  isSubmitted = true;
  let product = validate();
  if (!product) {
    return;
  }

  apiCreateProduct(product)
    .then((response) => {
      return apiGetProduct();
    })
    .then((response) => {
      display(response.data);
      // Ẩn modal
      $("#myModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });

  resetForm();
}
// Remove Product
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then((response) => {
      return apiGetProduct();
    })
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Select => Update
function selectProduct(productId) {
  $("#myModal").modal("show");
  getElement(".modal-footer").innerHTML = `
  <button
    id="btnUpdate"
    type="button"
    class="btn btn-primary"
    onclick="updateProduct('${productId}')"
  >
    Update
  </button>
  <button
    id="btnClose"
    type="button"
    class="btn btn-danger"
    data-dismiss="modal"
    onclick="resetForm()"
  >
    Close
  </button>
  `;

  apiGetProductByID(productId)
    .then((response) => {
      let product = response.data;
      getElement("#name").value = product.name;
      getElement("#price").value = product.price;
      getElement("#screen").value = product.screen;
      getElement("#backCamera").value = product.backCamera;
      getElement("#frontCamera").value = product.frontCamera;
      getElement("#imageLink").value = product.img;
      getElement("#description").value = product.desc;
      getElement("#type").value = product.type;
    })
    .catch((error) => {
      console.log(error);
    });
}

// Update Product
function updateProduct(productId) {
  isSubmitted = true;
  let newProduct = validate();
  if (!newProduct) {
    return;
  }
  apiUpdateProduct(productId, newProduct)
    .then((response) => {
      return apiGetProduct();
    })
    .then((response) => {
      display(response.data);
      $("#myModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });

  resetForm();
}

// Find Product
getElement("#searchName").onkeypress = (event) => {
  if (event.key !== "Enter") {
    return;
  }
  apiGetProduct(event.target.value)
    .then((respone) => {
      display(respone.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Sort by price
function sortProductsSmall() {
  apiGetProduct().then((response) => {
    const sortedProducts = response.data
      .slice()
      .sort((a, b) => a.price - b.price);
    display(sortedProducts);
  });
}
function sortProductsBig() {
  apiGetProduct().then((response) => {
    const sortedProducts = response.data
      .slice()
      .sort((a, b) => b.price - a.price);
    display(sortedProducts);
  });
}

// DisPlay
function display(products) {
  let html = products.reduce((result, value, index) => {
    let product = new Products(
      value.id,
      value.name,
      value.price,
      value.screen,
      value.backCamera,
      value.frontCamera,
      value.img,
      value.desc,
      value.type
    );
    return (
      result +
      `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>
                        <img src="${product.img}"
                        width = "100px" height="100px"/>
                    </td>
                    <td>${product.desc}</td>
                    <td>
                        <button class="btn btn-primary" onclick="selectProduct('${
                          product.id
                        }')">
                            Edit
                        </button>
                        <button class="btn btn-danger" onclick="deleteProduct('${
                          product.id
                        }')">
                            Delete
                        </button>
                    <td/>
                </tr>
        `
    );
  }, "");

  document.querySelector("#productList").innerHTML = html;
}

// Resetform
function resetForm() {
  getElement("#name").value = "";
  getElement("#price").value = "";
  getElement("#screen").value = "";
  getElement("#backCamera").value = "";
  getElement("#frontCamera").value = "";
  getElement("#imageLink").value = "";
  getElement("#description").value = "";
  getElement("#type").value = "";

  getElement("#errName").innerHTML = "";
  getElement("#errPrice").innerHTML = "";
  getElement("#errScreen").innerHTML = "";
  getElement("#errBackCamera").innerHTML = "";
  getElement("#errFrontCamera").innerHTML = "";
  getElement("#errImageLink").innerHTML = "";
  getElement("#errDescription").innerHTML = "";
  getElement("#errType").innerHTML = "";
}

// isRequired
function isRequired(value) {
  if (!value.trim()) {
    return false;
  }
  return true;
}
// Vaidate
function validate() {
  let id = "";
  let name = getElement("#name").value;
  let price = getElement("#price").value;
  let screen = getElement("#screen").value;
  let backCamera = getElement("#backCamera").value;
  let frontCamera = getElement("#frontCamera").value;
  let img = getElement("#imageLink").value;
  let desc = getElement("#description").value;
  let type = getElement("#type").value;

  let isValid = true;

  if (!isRequired(name)) {
    isValid = false;
    getElement("#errName").style.display = "block";
    getElement("#errName").innerHTML = `(*) This field can't be empty`;
  }

  if (!isRequired(price)) {
    isValid = false;
    getElement("#errPrice").style.display = "block";
    getElement("#errPrice").innerHTML = `(*) This field can't be empty`;
  }

  if (!isRequired(screen)) {
    isValid = false;
    getElement("#errScreen").style.display = "block";
    getElement("#errScreen").innerHTML = `(*) This field can't be empty`;
  }

  if (!isRequired(backCamera)) {
    isValid = false;
    getElement("#errBackCamera").style.display = "block";
    getElement("#errBackCamera").innerHTML = `(*) This field can't be empty`;
  }

  if (!isRequired(frontCamera)) {
    isValid = false;
    getElement("#errFrontCamera").style.display = "block";
    getElement("#errFrontCamera").innerHTML = `(*) This field can't be empty`;
  }

  if (!isRequired(img)) {
    isValid = false;
    getElement("#errImageLink").style.display = "block";
    getElement("#errImageLink").innerHTML = `(*) This field can't be empty`;
  }

  if (!isRequired(desc)) {
    isValid = false;
    getElement("#errDescription").style.display = "block";
    getElement("#errDescription").innerHTML = `(*) This field can't be empty`;
  }

  if (!isRequired(type)) {
    isValid = false;
    getElement("#errType").style.display = "block";
    getElement("#errType").innerHTML = `(*) This field can't be empty`;
  }

  if (isValid) {
    let product = new Products(
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type
    );
    return product;
  }
  return undefined;
}

// -------- Utils ---------
function getElement(selector) {
  return document.querySelector(selector);
}

//-----------DOM -----------
getElement("#addPhone").onclick = () => {
  getElement(".modal-title").innerHTML = "Phone Management";
  $("#myModal").modal("show");
  getElement(".modal-footer").innerHTML = `
  <button
    id="btnUpdate"
    type="button"
    class="btn btn-primary"
    onclick="createProduct()"
  >
    Add
  </button>
  <button
    id="btnClose"
    type="button"
    class="btn btn-danger"
    data-dismiss="modal"
    onclick="resetForm()"
  >
    Close
  </button>
  `;
};
