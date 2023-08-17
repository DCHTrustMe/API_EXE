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
            <button data-type="addToCart" id="addCart"class="btnPhone-blue" data-id="${product.id}">Add to Cart</button>
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

//Hàm DOM
function dom(selector) {
  return document.querySelector(selector);
}

//Click Add to Cart

//Lắng nghe sự kiện click vào nút ADD TO CART
dom("#addCart").addEventListener("click", (evt) => {
  let id = evt.target.getAttribute("data-id");
  let elementType = evt.target.getAttribute("data-type");

  if (elementType === "addToCart") {
    let index = productLists.findIndex((product) => {
      return product.id === id;
    });

    cartItem = { ...productLists[index], quantity: 1 };

    if (carts.length === 0) {
      carts.push(cartItem);
    } else if (carts.length !== 0) {
      let cartProductIds = carts.map((product) => {
        return product.id;
      });

      for (let i = 0; i < cartProductIds.length; i++) {
        if (cartProductIds[i] === id) {
          carts = carts.map((product) => {
            if (product.id === id) {
              return { ...product, quantity: product.quantity + 1 };
            }
            return product;
          });

          renderCart();
          localStorage.setItem("carts", JSON.stringify(carts));
          return;
        }
      }

      carts.push(cartItem);
    }

    // Hiển thị giỏ hàng ra màn hình và lưu mảng carts vào local storage
    renderCart();
    localStorage.setItem("carts", JSON.stringify(carts));
  }
});

//hàm renderCart để in giỏ hàng ra màn hình
function renderCart() {
  carts = carts.filter((product) => {
    return product.quantity > 0;
  });

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

  //Tính tổng tiền phải trả
  let totalPrice = carts.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  //Tính tổng số sản phẩm có trong cart
  let totalQuantity = carts.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

  //DOM để hiển thị giỏ hàng ra html
  dom("#tblCart").innerHTML = html;
  dom("#cartPrice").innerHTML = `Tổng tiền: $${totalPrice}`;
  dom(".total-quantity").innerHTML = totalQuantity;
}

//Lắng nghe sự kiện click trong thẻ tbody có id="tblCart"
dom("#tblCart").addEventListener("click", (evt) => {
  let id = evt.target.getAttribute("data-id");
  let elementType = evt.target.getAttribute("data-type");

  //Khi nhấn vào nút giảm số lượng
  if (elementType === "sub") {
    //Tạo mảng cartProductIds chỉ chứa Id trong mảng carts
    let cartProductIds = carts.map((product) => {
      return product.id;
    });

    //Duyệt mảng cartProductIds nếu có phần tử trùng với id thì quantity - 1
    for (let i = 0; i < cartProductIds.length; i++) {
      if (cartProductIds[i] === id) {
        carts = carts.map((product) => {
          if (product.id === id) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        });
      }
    }

    // Hiển thị giỏ hàng ra màn hình và lưu mảng carts vào local storage
    renderCart();
    localStorage.setItem("carts", JSON.stringify(carts));
  }

  //Khi nhấn vào nút tăng số lượng
  if (elementType === "add") {
    //Tạo mảng cartProductIds chỉ chứa Id trong mảng carts
    let cartProductIds = carts.map((product) => {
      return product.id;
    });

    //Duyệt mảng cartProductIds nếu có phần tử trùng với id thì quantity - 1
    for (let i = 0; i < cartProductIds.length; i++) {
      if (cartProductIds[i] === id) {
        carts = carts.map((product) => {
          if (product.id === id) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
      }
    }

    // Hiển thị giỏ hàng ra màn hình và lưu mảng carts vào local storage
    renderCart();
    localStorage.setItem("carts", JSON.stringify(carts));
  }

  //Khi nhấn vào nút bỏ sản phẩm
  if (elementType === "remove") {
    //Tìm index của sản phẩm có id trên trong mảng carts
    let index = carts.findIndex((product) => {
      return product.id === id;
    });

    //Dùng hàm slice và index vừa tìm dc để xóa phần tử trong mảng carts
    carts.splice(index, 1);

    // Hiển thị giỏ hàng ra màn hình và lưu mảng carts vào local storage
    renderCart();
    localStorage.setItem("carts", JSON.stringify(carts));
  }
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
