import { showMessage, getCurrentUser, areValid } from "../common/common.js";
$(() => {
    $("#payment").on("click", payNow);
});
//Validating the Payment Information
export function payNow() {
    var _a, _b, _c;
    let card = (_a = $("#cardNumber").val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
    let expiry = (_b = $("#expiry").val()) === null || _b === void 0 ? void 0 : _b.toString().trim();
    let cvv = (_c = $("#cvv").val()) === null || _c === void 0 ? void 0 : _c.toString().trim();
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
//Enrolling the User in the course call the checkout() API EndPoint
export function checkout() {
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
        success: function (res) {
            // Save bill info
            if (res[0].IsPurchase == true) {
                let BillDetails = JSON.parse(localStorage.getItem("BillDetails"));
                if (BillDetails == null) {
                    localStorage.setItem("BillDetails", JSON.stringify(res));
                    alert(res[0].Message);
                    window.location.href = "Success.html";
                }
                else {
                    localStorage.removeItem("BillDetails");
                    localStorage.setItem("BillDetails", JSON.stringify(res));
                    alert(res[0].Message);
                    window.location.href = "Success.html";
                }
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
