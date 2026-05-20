import { ProductTable } from "../models/ProductTable";

import { Cart } from "../models/Cart";

import { UserDetails } from "../models/UserDetails";

import { cartCount, showMessage, getCurrentUser } from "../common/common.js";

// $(document).ready(function () {
//   loadProducts();
// });

$(() => {
  loadProducts();
  bindEvents();
});

function loadProducts(): void {
  $.ajax({
    url: "http://localhost:64467/api/product/all",

    type: "GET",

    dataType: "json",

    success: function (data: ProductTable[]) {
      displayProducts(data);
    },
    error: function () {
      showMessage("Error loading products!");
    },
  });
}

// Function For Invoking the filterProducts()

function bindEvents(): void {
  $("input[name='category']").on("change", filterProducts);
}

//Getting the Div id where the Products are displayed

//Type Assertion
//WHY NEEDED? --> Because TS thinks: HTMLElement | null ; But we KNOW: div exists

const container = document.getElementById(
  "product-container",
) as HTMLDivElement;

// Display products
function displayProducts(data: ProductTable[]) {
  container.innerHTML = "";

  data.forEach((product: ProductTable) => {
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

function bindAddToCartEvents(): void {
  $(".btnAddToCart").on(
    "click",
    function (): void {
      const prodId = Number($(this).data("id"));
      const price = Number($(this).data("price"));
      addToCart(prodId, price);
    },
  );
}

//====================== Add to cart ===============================================//
function addToCart(prodId:number, price:number) {
//   let user = JSON.parse(localStorage.getItem("currentUser"));

let user: UserDetails = getCurrentUser();

  // Check login
  if (!user) {
    alert("Please login first!");
    window.location.href = "Login.html";
    return;
  }

  let cartData:Cart = {
    UserID: user.UserID,
    ProdID: prodId,
    CartQty: 1,
    Price: price,
  };

  $.ajax({
    url: "http://localhost:64467/api/cart/add",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(cartData),

    success: function (res: string) {
      showMessage(res);
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
  let selected = $("input[name='category']:checked").val()?.toString();

  // If nothing selected → show all
  if (selected === "0") {
    loadProducts();
    return;
  }

  // Filter data
  $.ajax({
    url: `http://localhost:64467/api/product/category/${selected}`,

    type: "GET",

    dataType: "json",

    success: function (data: ProductTable[]) {
      displayProducts(data);
    },
    error: function () {
      alert("Error loading products!");
    },
  });
}


