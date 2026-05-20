import { cartCount, showMessage, getCurrentUser } from "../common/common.js";
// $(document).ready(function () {
//   loadProducts();
// });
$(() => {
    loadProducts();
    bindEvents();
});
function loadProducts() {
    $.ajax({
        url: "http://localhost:64689/api/product/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            displayProducts(data);
        },
        error: function () {
            showMessage("Error loading products!");
        },
    });
}
// Function For Invoking the filterProducts()
function bindEvents() {
    $("input[name='category']").on("change", filterProducts);
}
//Getting the Div id where the Products are displayed
//Type Assertion
//WHY NEEDED? --> Because TS thinks: HTMLElement | null ; But we KNOW: div exists
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
        <button class="btnAddToCart" data-id="${product.ProdID}" data-price="${product.ProdPrice}">
        Add To Cart
        </button>
      </div>
    `;
        //<button onclick="addToCart(${product.ProdID},${product.ProdPrice} )">Add to Cart</button>
        container.innerHTML += card;
        bindAddToCartEvents();
    });
}
function bindAddToCartEvents() {
    $(".btnAddToCart").on("click", function () {
        const prodId = Number($(this).data("id"));
        const price = Number($(this).data("price"));
        addToCart(prodId, price);
    });
}
//====================== Add to cart ===============================================//
function addToCart(prodId, price) {
    //   let user = JSON.parse(localStorage.getItem("currentUser"));
    let user = getCurrentUser();
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
//=========================================== Filter Condition ======================================//
// Filter Condition
// $("input[name='category']").on("change", filterProducts);
function filterProducts() {
    var _a;
    let selected = (_a = $("input[name='category']:checked").val()) === null || _a === void 0 ? void 0 : _a.toString();
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
