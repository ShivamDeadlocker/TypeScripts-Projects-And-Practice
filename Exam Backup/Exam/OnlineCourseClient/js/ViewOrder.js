$(document).ready(function () {
  displayOrder();
});

function displayOrder() {
  let user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Please login first!");
    window.location.href = "Login.html";
    return;
  }
  let userId = user.UserID;

  $.ajax({
    url: `http://localhost:50696/api/order/latestBill/${userId}`,
    type: "GET",
    dataType: "json",

    success: function (data) {
      displayOrderData(data);
    },

    error: function () {
      alert("Error Order cart!");
    },
  });
}

function displayOrderData(data) {
  let container = $("#card");

  let user = JSON.parse(localStorage.getItem("currentUser"));

  container.html("");

  let title =
    user.TypeId == 1 ? "All Orders (Admin View)" : "Your Latest Order";

  container.append(`<h2>${title}</h2>`);

  if (data.length === 0) {
    container.append(`
      <h2>No Order History!!!</h2>
    `);
  } else {
    data.forEach((item) => {
      container.append(`
      <div class="order-box">
        <p><b>Bill ID:</b> ${item.Id}</p>
        <p><b>User Name:</b> ${item.Name}</p> 
        <p><b>Total Qty:</b> ${item.Tqty}</p> 
        <p><b>Total Amount:</b> ₹${item.Tamt}</p>
      </div>
    `);
    });
  }
}
