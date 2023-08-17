//Tạo mảng carts, giỏ hàng
let carts = [];

//Tạo đối tưởng cartItem
let cartItem = {};

//Tạo mảng productLists dùng để chứa sản phẩm lấy từ API về
let productLists = [];
getProducts();

init();

function init() {
  // lấy dữ liệu từ localStorage
  carts = JSON.parse(localStorage.getItem("carts")) || [];

  //Hiển thị ra giỏ hàng bằng hàm renderCart
  renderCart(carts);
}

function getProducts(dropdown) {
  apiGetProducts(dropdown)
    .then((response) => {
      // Gọi hàm display để hiển thị ra giao diện
      productLists = [...response.data];
      display(productLists);
    })
    .catch((error) => {
      console.log(error);
    });
}

function dropdownFilter() {
  let dropdown = document.getElementById("myDropdown").value;
  console.log(dropdown);
  if (dropdown !== "") {
    getProducts(dropdown);
  } else {
    getProducts();
  }
}
//Call api lấy danh sách sản phẩm từ database BE
const productContainer = document.getElementById("product_container");

function display(products) {
  const parentEl = productContainer;
  parentEl.removeChild(parentEl.firstChild);
  const productCard = document.createElement("div");
  productCard.classList.add("mb-5", "row");

  let html = products.reduce((result, product) => {
    return (
      result +
      `
    <div class="col-md-4 mb-5">
    
    <div class="card border-0 bg-light rounded">
        <img src="${product.img}" class="card-img-top px-2" alt="${product.name}" />
        <div class="card-body text-center p-4 p-lg-5 pt-0 pt-lg-0">
          <h2 class="card-title fs-4 fw-bold">${product.name}</h2>
          <h6 class="card-subtitle mb-2 text-muted">$${product.price}</h6>
          <p class="card-text">${product.desc}</p>
          <div class="mt-4">
            <button class="btnPhone-white">More Info</button>
            <button  id="addCart"class="btnPhone-blue" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  `
    );
  }, "");
  productCard.innerHTML = html;
  productContainer.appendChild(productCard);
}

//Click Add to Cart
function addToCart(productId) {
  const existProduct = carts.findIndex((cartItem) => cartItem.id == productId);

  apiGetProductById(productId)
    .then((res) => {
      if (existProduct !== -1) {
        carts[existProduct].quantity += 1;
      } else {
        carts = [...carts, { ...res.data, quantity: 1 }];
      }

      renderCart();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Hàm DOM
function dom(selector) {
  return document.querySelector(selector);
}

//hàm renderCart để in giỏ hàng ra màn hình
function renderCart() {
  let html = carts.reduce((result, product) => {
    let price = product.price * product.quantity;

    return (
      result +
      `
      <tr>
        <td>
          <img src="${product.img}" width="50px" height="50px"/>
        </td>
        <td>${product.name}</td>
        <td>
        <button class="btn btn-primary" data-id="${product.id}" data-type="sub"><</button>
        ${product.quantity}
        <button class="btn btn-primary" data-id="${product.id}" data-type="add">></button>
        </td>
        <td>$${price}</td>
        <td>
          <button class="btn btn-danger" data-id="${product.id}" data-type="remove">Bỏ</button>
        </td>
      </tr>
      `
    );
  }, "");

  if (!html) {
  }

  //Tính tổng tiền phải trả
  let totalPrice = carts.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  //Tính tổng số sản phẩm có trong cart
  let totalQuantity = carts.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

  if (!html) {
    dom("#tblCart").innerHTML = "Giỏ hàng rỗng";
    dom("#cartPrice").innerHTML = `Tổng tiền: $${totalPrice}`;
    dom(".total-quantity").innerHTML = 0;
    dom("#purchase").disabled = true;
    return;
  }

  //DOM để hiển thị giỏ hàng ra html
  dom("#tblCart").innerHTML = html;
  dom("#cartPrice").innerHTML = `Tổng tiền: $${totalPrice}`;
  dom(".total-quantity").innerHTML = totalQuantity;
  dom("#purchase").disabled = false;
}

//Lắng nghe sự kiện click trong thẻ tbody có id="tblCart"
dom("#tblCart").addEventListener("click", (evt) => {
  let id = evt.target.getAttribute("data-id");
  let elementType = evt.target.getAttribute("data-type");

  const index = carts.findIndex((cartItem) => cartItem.id == id);

  //Khi nhấn vào nút giảm số lượng
  if (elementType === "sub") {
    console.log(carts[index].quantity);
    if (carts[index].quantity == 1) {
      carts = carts.filter((cartItem) => cartItem.id != id);
    } else {
      carts[index].quantity -= 1;
    }
  }

  //Khi nhấn vào nút tăng số lượng
  if (elementType === "add") {
    carts[index].quantity += 1;
  }

  //Khi nhấn vào nút bỏ sản phẩm
  if (elementType === "remove") {
    carts = carts.filter((cartItem) => cartItem.id != id);
  }

  // Hiển thị giỏ hàng ra màn hình và lưu mảng carts vào local storage
  renderCart();
  localStorage.setItem("carts", JSON.stringify(carts));
});

//Lắng nghe sự kiện click vào nút Thanh toán
dom("#purchase").addEventListener("click", () => {
  if (carts.length === 0) {
    //Nếu giỏ hàng rỗng:
    alert("Không có gì để thanh toán!");
  } else {
    //Xuất ra lời cảm ơn đã mua hàng
    alert("Cảm ơn quý khách đã mua hàng");
  }
  //Set mảng carts về rỗng
  carts = [];

  // Hiển thị giỏ hàng ra màn hình và lưu mảng carts vào local storage
  renderCart();
  localStorage.setItem("carts", JSON.stringify(carts));
});

//Lắng nghe sự kiện click vào nút Clear giỏ hàng
dom("#clear").addEventListener("click", () => {
  //Set mảng carts về rỗng
  carts = [];

  // Hiển thị giỏ hàng ra màn hình và lưu mảng carts vào local storage
  renderCart();
  localStorage.setItem("carts", JSON.stringify(carts));
});
