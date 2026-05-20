import { showMessage, cartCount, getCurrentUser } from "../common/common.js";
$(() => {
    cartCount();
    loadCart();
    bindEvents();
});
function bindEvents() {
    $("#pay-now").on("click", payNow);
}
export function loadCart() {
    let user = getCurrentUser();
    if (!user) {
        showMessage("Please login first!");
        window.location.href = "Login.html";
        return;
    }
    let userId = user.UserID;
    $.ajax({
        url: `http://localhost:64467/api/cart/${userId}`,
        type: "GET",
        dataType: "json",
        success: function (data) {
            displayCart(data);
        },
        error: function () {
            showMessage("Error loading cart!");
        },
    });
}
export function displayCart(data) {
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
        <img src="${item.Image}" alt="Product Image" width="150">
        <h3>${item.Name}</h3>
        <h4>${item.Desc}</h4>
        <div>⭐⭐⭐⭐⭐</div>
        <p>₹${item.Price}.00</p>
        <button class="btnRemove" data-id="${item.CartID}">Remove </button>
      </div>
    `);
    });
    if (total === 0) {
        $("#total").html("<p> 0 </p>" + "<p> Your Cart is Empty!!! </p>");
        $("#pay-now").prop("disabled", true);
    }
    else {
        $("#total").text(total);
        $("#pay-now").prop("disabled", false);
    }
    bindCartEvents();
}
function bindCartEvents() {
    $(".btnRemove").on("click", function () {
        const cartId = Number($(this).data("id"));
        removeItem(cartId);
    });
}
function removeItem(cartId) {
    $.ajax({
        url: `http://localhost:64467/api/cart/deleteById/${cartId}`,
        type: "DELETE",
        success: function () {
            cartCount();
            loadCart();
        },
    });
}
export function payNow() {
    let user = getCurrentUser();
    if (!user) {
        alert("Please login first!");
        return;
    }
    $.ajax({
        url: `http://localhost:64467/api/order/checkStock/${user.UserID}`,
        type: "GET",
        success: function (res) {
            // Check Stock Quantity
            if (res[0].IsAvailable == true) {
                alert(res[0].Message);
                window.location.href = "Payment.html";
            }
            else {
                alert(res[0].Message);
            }
        },
        error: function (err) {
            alert(err.responseText); // shows stock error
        },
    });
}
