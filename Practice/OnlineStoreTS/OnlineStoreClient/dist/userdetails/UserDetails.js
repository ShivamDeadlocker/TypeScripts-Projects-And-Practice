import { areValid, showMessage } from "../common/common.js";
// $(document).ready(() => {
//   loadUserId(); // Load UserId dropdown
//   loadUserType(); // Load User Type dropdown
//   clear();
//   disable();
//   initialButtonState();
// });
$(() => {
    loadUserId(); // Load UserId dropdown
    loadUserType(); // Load User Type dropdown
    clear();
    disable();
    initialButtonState();
    bindEvents();
});
function bindEvents() {
    $("#btnAdd").on("click", addUser);
    $("#btnSave").on("click", saveUser);
    $("#btnEdit").on("click", editUser);
    $("#btnUpdate").on("click", updateUser);
    $("#btnDelete").on("click", deleteUser);
    $("#ddlUser").on("change", loadSelectedUser);
}
function initialButtonState() {
    $("#btnAdd").prop("disabled", false);
    $("#btnSave").prop("disabled", true); // Nothing to save yet
    $("#btnEdit").prop("disabled", false);
    $("#btnUpdate").prop("disabled", true); // Nothing to update yet
    $("#btnDelete").prop("disabled", false);
}
//Load UserID Data and Append in the DDl
function loadUserId() {
    $.ajax({
        url: "http://localhost:64689/api/auth/user/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $("#ddlUser").empty();
            $.each(data, function (index, user) {
                $("#ddlUser").append(
                //'<option value="' + user.UserID + '">' + user.UserID + "</option>",
                `<option value=${user.UserID}>${user.UserID}</option>`);
            });
        },
        error: function (err) {
            alert("Failed to load User Id: " + err.responseText);
        },
    });
}
//Load User Type Data and Append in the DDl
function loadUserType() {
    $.ajax({
        url: "http://localhost:64689/api/auth/userType/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $("#ddlUserType").empty();
            $.each(data, function (index, userType) {
                $("#ddlUserType").append(
                //'<option value="' + userType.TypeId + '">' + userType.TypeName + "</option>",
                `<option value=${userType.TypeId}>${userType.TypeName}</option>`);
            });
        },
        error: function (err) {
            alert("Failed to load User Type: " + err.responseText);
        },
    });
}
//Clear For Function
function clear() {
    $("#name").val("");
    $("#email").val("");
    $("#password").val("");
}
//Enable Form
function enable() {
    $("#name").prop("disabled", false);
    $("#email").prop("disabled", false);
    $("#password").prop("disabled", false);
    $("#ddlUserType").prop("disabled", false);
}
//Enable Form
function disable() {
    $("#name").prop("disabled", true);
    $("#email").prop("disabled", true);
    $("#password").prop("disabled", true);
    $("#ddlUserType").prop("disabled", true);
}
//Add Button
export function addUser() {
    clear();
    $("#ddlUser").empty();
    $("#ddlUser").append('<option value="0">New User Id Will Generate!!!</option>');
    $("#ddlUser").prop("disabled", true);
    enable();
    $("#btnAdd").prop("disabled", true); // Can't add while adding
    $("#btnSave").prop("disabled", false); //  Ready to save
    $("#btnEdit").prop("disabled", true); // Can't edit while adding
    $("#btnUpdate").prop("disabled", true); // Not updating
    $("#btnDelete").prop("disabled", true); // Can't delete while adding
}
//Insert User
export function saveUser() {
    var _a, _b, _c, _d;
    let name = (_a = $("#name").val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
    let email = (_b = $("#email").val()) === null || _b === void 0 ? void 0 : _b.toString().trim();
    let password = (_c = $("#password").val()) === null || _c === void 0 ? void 0 : _c.toString().trim();
    let userType = (_d = $("#ddlUserType").val()) === null || _d === void 0 ? void 0 : _d.toString();
    //   if (!name || !email || !password) {
    //     alert("Please Fill All The Fields!!!");
    //     return;
    //   }
    //Using the helper function for attribute validation and displaying the message
    if (!areValid([name, email, password, userType])) {
        showMessage("Please Fill All The Fields!!!");
        return;
    }
    const userDetails = {
        UserID: 0,
        UserName: name,
        UserEmail: email,
        UserPassword: password,
        UserConfirmPassword: password,
        TypeId: Number(userType),
    };
    $.ajax({
        url: "http://localhost:64689/api/auth/user/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            let existsUserName = data.find((d) => d.UserName.toLowerCase() == name.toLowerCase());
            let existsUserEmail = data.find((e) => e.UserEmail == email);
            if (existsUserName) {
                showMessage("UserName already exists!!!");
                return;
            }
            else if (existsUserEmail) {
                showMessage("User Email already exists!!!");
                return;
            }
            else {
                $.ajax({
                    url: "http://localhost:64689/api/auth/user/addUser",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(userDetails),
                    success: function () {
                        showMessage("User Register Successfully!!!!");
                        $("#ddlUser").prop("disabled", false);
                        disable();
                        loadUserId();
                        loadUserType();
                        clear();
                        initialButtonState();
                    },
                    error: function (err) {
                        alert("Failed to Register User: " + err.responseText);
                    },
                });
            }
        },
        error: function (err) {
            alert("Failed to Register User: " + err.responseText);
        },
    });
}
//Edit Button
function editUser() {
    enable();
    $("#btnAdd").prop("disabled", true); // Can't add while editing
    $("#btnSave").prop("disabled", true); // Not saving new record
    $("#btnEdit").prop("disabled", true); // Already editing
    $("#btnUpdate").prop("disabled", false); // Ready to update
    $("#btnDelete").prop("disabled", true); // Can't delete while editing
}
//Update User
export function updateUser() {
    var _a, _b, _c, _d, _e;
    let Id = (_a = $("#ddlUser").val()) === null || _a === void 0 ? void 0 : _a.toString();
    let name = (_b = $("#name").val()) === null || _b === void 0 ? void 0 : _b.toString().trim();
    let email = (_c = $("#email").val()) === null || _c === void 0 ? void 0 : _c.toString().trim();
    let password = (_d = $("#password").val()) === null || _d === void 0 ? void 0 : _d.toString().trim();
    let userType = (_e = $("#ddlUserType").val()) === null || _e === void 0 ? void 0 : _e.toString();
    //   if (!name || !email || !password) {
    //     alert("Please Fill All The Fields!!!");
    //     return;
    //   }
    if (!areValid([Id, name, email, password, userType])) {
        showMessage("Please Fill All The Fields!!!");
        return;
    }
    const userDetails = {
        UserID: Number(Id),
        UserName: name,
        UserEmail: email,
        UserPassword: password,
        UserConfirmPassword: password,
        TypeId: Number(userType),
    };
    $.ajax({
        url: "http://localhost:64689/api/auth/user/updateUser",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(userDetails),
        success: function () {
            showMessage("User Details Updated Successfully!!!!");
            loadUserId();
            loadUserType();
            disable();
            clear();
            initialButtonState();
        },
        error: function (err) {
            alert("Failed to Update User Details: " + err.responseText);
        },
    });
    // $.ajax({
    //   url: "http://localhost:64689/api/auth/user/",
    //   type: "GET",
    //   dataType: "json",
    //   success: function (data) {
    //     let existsUserName = data.find(
    //       (d) => d.UserName.toLowerCase() == name.toLowerCase(),
    //     );
    //     let existsUserEmail = data.find((e) => e.UserEmail == email);
    //     if (existsUserName) {
    //       alert("UserName already exists!!!");
    //       return;
    //     } else if (existsUserEmail) {
    //       alert("User Email already exists!!!");
    //       return;
    //     } else {
    //       $.ajax({
    //         url: "http://localhost:64689/api/auth/user/updateUser",
    //         type: "PUT",
    //         contentType: "application/json",
    //         data: JSON.stringify(UserDetails),
    //         success: function () {
    //           alert("User Details Successfully!!!!");
    //         },
    //         error: function (err) {
    //           alert("Failed to Update User Details: " + err.responseText);
    //         },
    //       });
    //     }
    //   },
    //   error: function (err) {
    //     alert("Failed to load User Data: " + err.responseText);
    //   },
    //});
}
//  Delete User
export function deleteUser() {
    var _a;
    let id = Number((_a = $("#ddlUser").val()) === null || _a === void 0 ? void 0 : _a.toString());
    if (!confirm("Are you sure to delete?"))
        return;
    $.ajax({
        url: `http://localhost:64689/api/auth/user/deleteUser/${id}`,
        type: "DELETE",
        success: () => {
            showMessage("User Deleted!!!");
            disable();
            clear();
            loadUserId();
        },
        error: () => {
            alert("Error deleting User!!!");
        },
    });
}
//DDL Change Event
// $("#ddlUser").change(() => {
//   let id = $("#ddlUser").val();
//   $.ajax({
//     url: "http://localhost:64689/api/auth/user",
//     type: "GET",
//     dataType: "json",
//     success: (data) => {
//       let user = data.find((u) => u.UserID == id);
//       $("#name").val(user.UserName);
//       $("#email").val(user.UserEmail);
//       $("#password").val(user.UserPassword);
//       $("#ddlUserType").val(user.TypeId);
//     },
//     error: () => {
//       alert("Error fetching user!!!");
//     },
//   });
// });
export function loadSelectedUser() {
    let id = $("#ddlUser").val();
    $.ajax({
        url: "http://localhost:64689/api/auth/user",
        type: "GET",
        dataType: "json",
        success: (data) => {
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
