$(document).ready(function () {
  loadProducts();
});

function loadProducts() {
  $.ajax({
    url: "http://localhost:64689/api/product/all",

    type: "GET",

    dataType: "json",

    success: function (data) {
      console.log(data);
      displayProducts(data);
    },
    error: function () {
      alert("Error loading products!");
    },
  });
}

//Getting the Div id where the Products are displayed
const container = document.getElementById("product-container");

// Display products
function displayProducts(data) {
  container.innerHTML = "";

  data.forEach((product) => {
    const card = `
      <div class="card">
        <img src="${product.ProdImg}" alt="Product Image" width="150">
        <h3>${product.ProdName}</h3>
        <h4>${product.ProdDsc}</h4>
        <div>⭐⭐⭐⭐⭐</div>
        <p>₹${product.ProdPrice}.00</p>
        <button onclick="addToCart(${product.ProdID},${product.ProdPrice} )">Add to Cart</button>
      </div>
    `;
    container.innerHTML += card;
  });
}

//=========================================== Filter Condition ======================================//

// Filter Condition
$("input[name='category']").on("change", filterProducts);

function filterProducts() {
  let selected = $("input[name='category']:checked").val();

  // If nothing selected → show all
  if (selected === "0") {
    loadProducts();
    return;
  }

  // Filter data
  $.ajax({
    url: `http://localhost:64689/api/product/category/${selected}`,

    type: "GET",

    dataType: "json",

    success: function (data) {
      displayProducts(data);
    },
    error: function () {
      alert("Error loading products!");
    },
  });
}

//====================== Add to cart ===============================================//
function addToCart(prodId, price) {
  let user = JSON.parse(localStorage.getItem("currentUser"));

  // Check login
  if (!user) {
    alert("Please login first!");
    window.location.href = "Login.html";
    return;
  }

  let cartData = {
    UserID: user.UserID,
    ProdID: prodId,
    CartQty: 1,
    Price: price,
  };

  $.ajax({
    url: "http://localhost:64689/api/cart/add",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(cartData),

    success: function () {
      cartCount();
      // alert("Added to cart!");
    },

    error: function () {
      alert("Error adding to cart!");
    },
  });
}
