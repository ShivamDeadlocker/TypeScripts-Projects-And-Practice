import { UserDetails } from "../models/UserDetails";

import { UserType } from "../models/UserType";

import { showMessage } from "../common/common.js";


$(() => {
  loadUserId(); // Load UserId dropdown
  loadUserType(); // Load User Type dropdown
  disable();
  bindEvents();
});

//Function for Button Click Event and Drop Down Change Event
function bindEvents(): void {

  $("#btnDelete").on("click", deleteUser);

  $("#ddlUser").on("change", loadSelectedUser);
}

//Load UserID Data and Append in the DDl
function loadUserId(): void {
  $.ajax({
    url: "http://localhost:64467/api/userdetails/user/",

    type: "GET",

    dataType: "json",

    success: function (data: UserDetails[]): void {
      $("#ddlUser").empty();

      $.each(data, function (index: number, user: UserDetails) {
        $("#ddlUser").append(
          //'<option value="' + user.UserID + '">' + user.UserID + "</option>",
          `<option value=${user.UserID}>${user.UserID}</option>`,
        );
      });
    },

    error: function (err) {
      alert("Failed to load User Id: " + err.responseText);
    },
  });
}

//Load User Type Data and Append in the DDl
function loadUserType(): void {
  $.ajax({
    url: "http://localhost:64467/api/userdetails/userType/",

    type: "GET",

    dataType: "json",

    success: function (data: UserType[]) {
      $("#ddlUserType").empty();

      $.each(data, function (index: number, userType: UserType) {
        $("#ddlUserType").append(
          //'<option value="' + userType.TypeId + '">' + userType.TypeName + "</option>",

          `<option value=${userType.TypeId}>${userType.TypeName}</option>`,
        );
      });
    },

    error: function (err) {
      alert("Failed to load User Type: " + err.responseText);
    },
  });
}

//Loading User Details Using the User ID DropDown List
export function loadSelectedUser(): void {
  let id = $("#ddlUser").val();

  $.ajax({
    url: "http://localhost:64467/api/userdetails/user",

    type: "GET",

    dataType: "json",

    success: (data: UserDetails[]) => {
      let user = data.find((u) => u.UserID == id);

      $("#name").val(user.UserName);
      $("#email").val(user.UserEmail);
      $("#password").val(user.UserPassword);
      $("#ddlUserType").val(user.TypeId);
    },

    error: () => {
      alert("Error fetching user!!!");
    },
  });
}

//Clear For Function
function clear(): void {
  $("#name").val("");
  $("#email").val("");
  $("#password").val("");
}

//Enable Form
function disable(): void {
  $("#name").prop("disabled", true);
  $("#email").prop("disabled", true);
  $("#password").prop("disabled", true);
  $("#ddlUserType").prop("disabled", true);
}

//Delete User
export function deleteUser(): void {
  let id = Number($("#ddlUser").val()?.toString());

  if (!confirm("Are you sure to delete?")) return;

  $.ajax({
    url: `http://localhost:64467/api/userdetails/user/deleteUser/${id}`,

    type: "DELETE",

    success: () => {
      showMessage("User Deleted!!!");
      disable();
      clear();
      loadUserId();
    },

    error: () => {
      showMessage("Error deleting User!!!");
    },
  });
}


