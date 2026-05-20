import { UserDetails } from "../models/UserDetails.js";

import { BillDetailsResponse } from "../models/BillDetailsResponse";

import { getCurrentUser } from "../common/common.js";

// ================= DOCUMENT READY ================= //

$(() => {
  renderBillDetails();

  bindEvents();
});

// ================= DISPLAY BILL DETAILS ================= //

function renderBillDetails(): void {
  const user: UserDetails | null = getCurrentUser();

  const billDetailsString = localStorage.getItem("BillDetails");

  const billDetails: BillDetailsResponse[] | null = billDetailsString
    ? JSON.parse(billDetailsString)
    : null;

  const content = document.getElementById("card") as HTMLDivElement;

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
  } else {
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

function bindEvents(): void {
  $(document).on(
    "click",

    "#btnHome",

    goHome,
  );
}

// ================= GO HOME ================= //

function goHome(): void {
  localStorage.removeItem("BillDetails");

  window.location.href = "Home.html";
}
