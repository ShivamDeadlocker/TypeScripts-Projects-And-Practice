import {
  showMessage,
  getCurrentUser,
  areValid,
} from "../common/common.js";

import { Invoice } from "../models/Invoice.js";


$(() => {
  $("#payment").on("click", payNow);
});

export function payNow(): void {
  let card = $("#cardNumber").val()?.toString().trim();
  let expiry = $("#expiry").val()?.toString().trim();
  let cvv = $("#cvv").val()?.toString().trim();

  if (!areValid([card, expiry, cvv])) {
    showMessage("Please Fill All the Details!!!");
    return;
  }

  if (card.length !== 16 || isNaN(Number(card))) {
    showMessage("Invalid Card Number!!!");
    return;
  }

  if (cvv.length !== 3 || isNaN(Number(cvv))) {
    showMessage("Invalid CVV Number!!!");
    return;
  }

  if (!expiry) {
    showMessage("Select expiry date!");
    return;
  }

  checkout();
}

export function checkout(): void {
  //let user = JSON.parse(localStorage.getItem("currentUser"));
  let user = getCurrentUser();

  if (!user) {
    showMessage("Please login first!");
    return;
  }

  $.ajax({
    url: `http://localhost:64467/api/order/checkout/${user.UserID}`,
    type: "POST",

    dataType: "json",

    success: function (res: Invoice[]) {
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
