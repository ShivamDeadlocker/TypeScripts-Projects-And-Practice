function payNow() {
  let card = $("#cardNumber").val().trim();
  let expiry = $("#expiry").val().trim();
  let cvv = $("#cvv").val().trim();

  if (card.length !== 16 || isNaN(card)) {
    alert("Invalid Card Number!!!");
    return;
  }

  if (cvv.length !== 3 || isNaN(cvv)) {
    alert("Invalid CVV Number!!!");
    return;
  }

  if (!expiry) {
    alert("Select expiry date!");
    return;
  }

  checkout();
}

function checkout() {
  let user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Please login first!");
    return;
  }

  $.ajax({
    url: `http://localhost:64689/api/order/checkout/${user.UserID}`,
    type: "POST",

    dataType: "json",

    success: function (res) {
      // Save bill info
      if (res[0].IsPurchase == true) {
        let BillDetails = JSON.parse(localStorage.getItem("BillDetails"));
        if (BillDetails == null) {
          localStorage.setItem("BillDetails", JSON.stringify(res));
          alert(res[0].Message);
          window.location.href = "Success.html";
        } else {
          localStorage.removeItem("BillDetails");
          localStorage.setItem("BillDetails", JSON.stringify(res));
          alert(res[0].Message);
          window.location.href = "Success.html";
        }
      } else {
        alert(res[0].Message);
      }
    },

    error: function (err) {
      alert(err.responseText); // shows stock error
    },
  });
}
