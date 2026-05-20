//Commands for downloading and enabling the Jquery types in TypeScript
//npm install --save-dev @types/jquery

//Note: Don't Download the Jquery for this project, This Project is simple html , cs js and browser environment.
//We are not running this project in the Node Environment.

import { UserDetails } from "../models/UserDetails";

import { ProductTable } from "../models/ProductTable";

// =================== Loadin User Details / User Nav Bar Options And Cart Count  =================== //

// ready() is deprecated
// $(document).ready(function () {
//   loadAuthUI();
//   CheckAdmin();
//   cartCount();
// });

// alternate version of ready()
$(() => {
  loadAuthUI();
  CheckAdmin();
  cartCount();
});

// ======================================== Function for Getting the Current User ==========================//
export function getCurrentUser(): UserDetails | null {
  const userData = localStorage.getItem("currentUser");

  return userData ? (JSON.parse(userData) as UserDetails) : null;
}

// ======================================== Login / Logout Nav Bar ======================================== //
export function loadAuthUI(): void {
  // const user = JSON.parse(localStorage.getItem("currentUser"));

  // Used Helper Function To Getting Current Log In User
  const user = getCurrentUser();

  const authSection = document.getElementById("auth-section");

  if (!authSection) return;

  if (user) {
    // Logged In UI
    authSection.innerHTML = `
      <span style="color:white;"> <i class="fa-solid fa-circle-user"></i> Hello, ${user.UserName}</span>
      <button
        id="logoutBtn"
        style="margin-left:10px;">
        Logout
      </button>
    `;

    //<button onclick="logout()" style="margin-left:10px;">Logout</button>

    $("#logoutBtn").on("click", logout);
  } else {
    // Not Logged In UI
    authSection.innerHTML = `
      <a href="Login.html"><i class="fa-solid fa-circle-user"></i> Login</a> 
    `;
  }
}

// ======================================== Admin Check ======================================== //
export function CheckAdmin(): void {
  //const user = JSON.parse(localStorage.getItem("currentUser"));

  // Used Helper Function To Getting Current Log In User
  const user = getCurrentUser();

  if (!user) {
    $(".instructorOption").hide();
    $(".adminOption").hide(); // not logged in
    return;
  }

  if (user.TypeId == 1) {
    $(".adminOption").show(); // admin user
    $(".instructorOption").hide();
  } else if (user.TypeId == 3) {
    $(".instructorOption").show(); // instructor user
    $(".adminOption").hide();
  } else {
    $(".adminOption").hide(); // normal user
    $(".instructorOption").hide(); // normal user
  }
}

// ======================================== Logout ======================================== //
export function logout(): void {
  localStorage.removeItem("currentUser");

  alert("Logged out successfully!");

  // Refresh UI
  loadAuthUI();

  // Optional redirect
  window.location.href = "Home.html";
}

// ==================================== Display Single products ========================== //
export function displaySingleProducts(data: ProductTable[]): void {
  //Getting the Div id where the Products are displayed
  const container = document.getElementById("product-container");
  let pid = $("#ddlProdId").val()?.toString();

  let product = data.find((p) => p.ProdID.toString() == pid);

  let category = $("#ddlCatId option:selected").text();

  container.innerHTML = "";

  const card = `
      <div class="card">
        <img src="${product.ProdImg}" alt="Product Image" width="150">
        <h3>${product.ProdName}</h3>
        <h4>${product.ProdDsc}</h4>
        <div>⭐⭐⭐⭐⭐</div>
        <p>Price: ₹${product.ProdPrice}.00</p>
        <p>Seats: ${product.ProdQty}</p>
        <p>Category: ${category}</p>
      </div>
    `;
  container.innerHTML += card;
}

// ========================= Getting the cart count According the User Id ============================================ //
export function cartCount(): void {
  // let user = JSON.parse(localStorage.getItem("currentUser"));
  let user = getCurrentUser();

  if (!user) {
    return;
  }
  let userId = user.UserID;

  $.ajax({
    url: `http://localhost:64467/api/cart/${userId}`,
    type: "GET",
    dataType: "json",

    success: function (data) {
      if (data.length > 0) {
        $("#cart-count").text(data.length);
      }
    },

    error: function () {
      alert("Error loading cart count!");
    },
  });
}

// ==================================== Validate Single Attribute ========================== //
// Note: any - Disable TypeScript checking
// Note: unknown - Value exists but type unknown

export function isValid(value: unknown): boolean {
  return (
    value !== null &&
    value !== undefined &&
    value !== "" &&
    value !== "null" &&
    value !== "undefined"
  );
}

// ==================================== Validate Multiple Attribute ========================== //

export function areValid(values: unknown[]): boolean {
  return values.every((value) => isValid(value));
}

// ==================================== Display Message ========================== //

export function showMessage(message: string): void {
  alert(message);
}
