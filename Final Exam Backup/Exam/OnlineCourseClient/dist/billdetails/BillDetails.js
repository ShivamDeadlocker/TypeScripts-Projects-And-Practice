import { getCurrentUser } from "../common/common.js";
// ================= DOCUMENT READY ================= //
$(() => {
    renderBillDetails();
    bindEvents();
});
// ================= DISPLAY BILL DETAILS ================= //
function renderBillDetails() {
    const user = getCurrentUser();
    const billDetailsString = localStorage.getItem("BillDetails");
    const billDetails = billDetailsString
        ? JSON.parse(billDetailsString)
        : null;
    const content = document.getElementById("card");
    if (user && billDetails) {
        content.innerHTML = `

      <h2>
        Thank You for Your Purchase!!!
      </h2>

      <p>
        You are enrolled in the course successfully.
      </p>

      <p>
        Your Invoice Information.
      </p>

      <p>
        User Name:
        ${user.UserName}
      </p>

      <p>
        Invoice Id:
        ${billDetails[0].BillId}
      </p>

      <p>
        Total Amount:
        ₹${billDetails[0].TotalAmount}.00
      </p>

      <button id="btnHome">

        Go to Home

      </button>
    `;
    }
    else {
        content.innerHTML = `

      <h2>
        No Order Is Placed!!!!
      </h2>

      <p>
        Please Place Your Order!!!!
      </p>

      <button id="btnHome">

        Go to Home

      </button>
    `;
    }
}
// ================= EVENT BINDING ================= //
function bindEvents() {
    $(document).on("click", "#btnHome", goHome);
}
// ================= GO HOME ================= //
function goHome() {
    localStorage.removeItem("BillDetails");
    window.location.href = "Home.html";
}
