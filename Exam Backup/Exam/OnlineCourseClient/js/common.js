// =================== Loadin User Details / User Nav Bar Options And Cart Count  =================== //
$(document).ready(function () {
  loadAuthUI();
  CheckAdmin();
  cartCount();
});

// ======================================== Login / Logout Nav Bar ======================================== //
function loadAuthUI() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const authSection = document.getElementById("auth-section");

  if (!authSection) return;

  if (user) {
    // Logged In UI
    authSection.innerHTML = `
      <span style="color:white;"> <i class="fa-solid fa-circle-user"></i> Hello, ${user.UserName}</span>
      <button onclick="logout()" style="margin-left:10px;">Logout</button>
    `;
  } else {
    // Not Logged In UI
    authSection.innerHTML = `
      <a href="Login.html"><i class="fa-solid fa-circle-user"></i> Login</a> 
    `;
    // || <a href="signup.html">Signup</a>

  }
}

// ======================================== Admin Check ======================================== //
function CheckAdmin() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    $(".adminOption").hide(); // not logged in
    return;
  }

  if (user.TypeId !== 1) {
    $(".adminOption").hide(); // normal user
  } else {
    $(".adminOption").show(); // admin
  }
}

// ======================================== Logout ======================================== //
function logout() {
  localStorage.removeItem("currentUser");

  alert("Logged out successfully!");

  // Refresh UI
  loadAuthUI();

  // Optional redirect
  window.location.href = "Home.html";
}

// ==================================== Display Single products ========================== //
function displaySingleProducts(data) {
  //Getting the Div id where the Products are displayed
  const container = document.getElementById("product-container");
  let pid = $("#ddlProdId").val();

  let product = data.find((p) => p.ProdID == pid);

  let category = $("#ddlCatId option:selected").text();

  container.innerHTML = "";

  const card = `
      <div class="card">
        <img src="${product.ProdImg}" alt="Product Image" width="150">
        <h3>${product.ProdName}</h3>
        <h4>${product.ProdDsc}</h4>
        <div>⭐⭐⭐⭐⭐</div>
        <p>Price: ₹${product.ProdPrice}.00</p>
        <p>Quantity: ${product.ProdQty}</p>
        <p>Category: ${category}</p>
      </div>
    `;
  container.innerHTML += card;
}

// ========================= Getting the cart count According the User Id ============================================ //
function cartCount() {
  let user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    return;
  }
  let userId = user.UserID;

  $.ajax({
    url: `http://localhost:64689/api/cart/${userId}`,
    type: "GET",
    dataType: "json",

    success: function (data) {
      if(data.length > 0)
      {
        $("#cart-count").text(data.length)
      }
    },

    error: function () {
      alert("Error loading cart count!");
    },
  });
}
