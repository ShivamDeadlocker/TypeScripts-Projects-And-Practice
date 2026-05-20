$(document).ready(function () {
  cartCount();
  loadCart();
});
function loadCart() {
  let user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Please login first!");
    window.location.href = "Login.html";
    return;
  }
  let userId = user.UserID;

  $.ajax({
    url: `http://localhost:64689/api/cart/${userId}`,
    type: "GET",
    dataType: "json",

    success: function (data) {
      displayCart(data);
    },

    error: function () {
      alert("Error loading cart!");
    },
  });
}

function displayCart(data) {
  let container = $("#cart-items");
  let total = 0;

  container.html("");

  data.forEach((item) => {
    //Single Product Total With Their Quantity
    let itemTotal = item.Price * item.Qty;

    //Grand Total of All Product Added in the Cart
    total += itemTotal;

    container.append(`
      <div class="card">
        <img src="${item.Image}" width="150" >
        <h3>${item.Name}</h3>
        <div>
        <p>⭐⭐⭐⭐⭐</p>
        <p>Price: ₹${item.Price}</p>

        <button onclick="decreaseQty(${item.CartID}, ${item.Qty})"><i class="fa-solid fa-trash"></i></button>
        <span>${item.Qty}</span>
        <button onclick="increaseQty(${item.CartID}, ${item.Qty})"><i class="fa-solid fa-plus"></i></button>

        <p>Total: ₹${itemTotal}</p>

      </div>
              <button id="remove-btn" onclick="removeItem(${item.CartID})">Remove</button>

      </div>
    `);
  });

  if (total === 0) {
    $("#total").html("<p> 0 </p>" + "<p> Your Cart is Empty!!! </p>");
    $("#pay-now").prop("disabled", true);
  } else {
    $("#total").text(total);
    $("#pay-now").prop("disabled", false);
  }
}

function increaseQty(cartId, qty) {
  updateQty(cartId, qty + 1);
}

function decreaseQty(cartId, qty) {
  if (qty <= 1) {
    removeItem(cartId);
  } else {
    updateQty(cartId, qty - 1);
  }
}

function updateQty(cartId, qty) {
  $.ajax({
    url: "http://localhost:64689/api/cart/update",
    type: "PUT",
    contentType: "application/json",

    data: JSON.stringify({
      CartID: cartId,
      CartQty: qty,
    }),

    success: function () {
      loadCart();
    },
  });
}

function removeItem(cartId) {
  $.ajax({
    url: `http://localhost:64689/api/cart/deleteById/${cartId}`,
    type: "DELETE",

    success: function () {
      cartCount();
      loadCart();
    },
  });
}

function payNow() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Please login first!");
    return;
  }

  $.ajax({
    url: `http://localhost:64689/api/order/checkStock/${user.UserID}`,
    type: "GET",

    success: function (res) {
      // Check Stock Quantity
      if (res[0].IsAvailable == true) {
        alert(res[0].Message);
        window.location.href = "Payment.html";
      } else {
        alert(res[0].Message);
      }
    },
    error: function (err) {
      alert(err.responseText); // shows stock error
    },
  });
}
