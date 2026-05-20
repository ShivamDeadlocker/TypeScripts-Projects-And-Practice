import { ProductTable } from "../models/ProductTable.js";

import { UserDetails } from "../models/UserDetails.js";

import {
  getCurrentUser,
  showMessage,
  loadAuthUI,
  CheckAdmin,
  cartCount,
} from "../common/common.js";

$(() => {
  loadAuthUI();

  CheckAdmin();

  cartCount();

  loadCourses();
});

//Loading the Enrolled Courses
function loadCourses(): void {
  const user = getCurrentUser();

  if (!user) {
    showMessage("Please login first!");

    window.location.href = "Login.html";

    return;
  }

  $.ajax({
    url: `http://localhost:64467/api/order/enrolledCourses/${user.UserID}`,

    type: "GET",

    dataType: "json",

    success: function (data: ProductTable[]): void {
      displayCourses(data);
    },

    error: function (): void {
      showMessage("Error loading courses!");
    },
  });
}

//Displaying the Enrolled Courses
function displayCourses(data: ProductTable[]): void {
  const container = $("#course-container");

  container.html("");

  if (data.length === 0) {
    container.append(`

      <h2>
        No Courses Enrolled!!!
      </h2>
    `);

    return;
  }

  data.forEach((course: ProductTable) => {
    container.append(`

        <div class="card">

          <img
            src="${course.ProdImg}"
          >

          <h3>
            ${course.ProdName}
          </h3>

          <h4>
            ${course.ProdDsc}
          </h4>

          <p>
            Price:
            ₹${course.ProdPrice}
          </p>

          <button
            class="btnLearn"
          >

            Start Learning

          </button>

        </div>
      `);
  });
}
