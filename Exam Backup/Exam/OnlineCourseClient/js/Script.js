//Run the Following Functions After the DOM content loads
document.addEventListener("DOMContentLoaded", function () {
  CheckAdmin();
  loadAuthUI();
  // displayProducts(products);
});

//Getting the Div id where the Products are displayed
const container = document.getElementById("product-container");

// Display products
function displayProducts(data) {
  container.innerHTML = "";

  data.forEach((product) => {
    const card = `
      <div class="card">
        <img src="${product.image}" width="150">
        <h3>${product.name}</h3>
        <h4>${product.description}</h4>
        <div>⭐⭐⭐⭐⭐</div>
        <p>₹${product.price}.00</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    container.innerHTML += card;
  });
}

//=========================================== Filter Condition ======================================//

const checkboxes = document.querySelectorAll("aside input");

checkboxes.forEach((cb) => {
  cb.addEventListener("change", filterProducts);
});

function filterProducts() {
  let selectedBrands = [];

  checkboxes.forEach((cb) => {
    if (cb.checked) {
      selectedBrands.push(cb.value);
    }
  });

  // If nothing selected → show all
  if (selectedBrands.length === 0) {
    displayProducts(products);
    return;
  }

  // Filter data
  const filtered = products.filter((product) =>
    selectedBrands.includes(product.brand),
  );

  displayProducts(filtered);
}

//======================================== Login / Logout Nav Bar ========================================//
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
      <a href="Login.html"><i class="fa-solid fa-circle-user"></i> Login</a> ||
      <a href="signup.html">Signup</a>
    `;
  }
}

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

function logout() {
  localStorage.removeItem("currentUser");

  alert("Logged out successfully!");

  // Refresh UI
  loadAuthUI();

  // Optional redirect
  window.location.href = "Home.html";
}
