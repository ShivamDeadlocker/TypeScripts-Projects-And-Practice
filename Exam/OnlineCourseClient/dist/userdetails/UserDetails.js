import { showMessage } from "../common/common.js";
$(() => {
    loadUserId(); // Load UserId dropdown
    loadUserType(); // Load User Type dropdown
    disable();
    bindEvents();
});
//Function for Button Click Event and Drop Down Change Event
function bindEvents() {
    $("#btnDelete").on("click", deleteUser);
    $("#ddlUser").on("change", loadSelectedUser);
}
//Load UserID Data and Append in the DDl
function loadUserId() {
    $.ajax({
        url: "http://localhost:64467/api/userdetails/user/",
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
        url: "http://localhost:64467/api/userdetails/userType/",
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
//Loading User Details Using the User ID DropDown List
export function loadSelectedUser() {
    let id = $("#ddlUser").val();
    $.ajax({
        url: "http://localhost:64467/api/userdetails/user",
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
//Clear For Function
function clear() {
    $("#name").val("");
    $("#email").val("");
    $("#password").val("");
}
//Enable Form
function disable() {
    $("#name").prop("disabled", true);
    $("#email").prop("disabled", true);
    $("#password").prop("disabled", true);
    $("#ddlUserType").prop("disabled", true);
}
//Delete User
export function deleteUser() {
    var _a;
    let id = Number((_a = $("#ddlUser").val()) === null || _a === void 0 ? void 0 : _a.toString());
    if (!confirm("Are you sure to delete?"))
        return;
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
