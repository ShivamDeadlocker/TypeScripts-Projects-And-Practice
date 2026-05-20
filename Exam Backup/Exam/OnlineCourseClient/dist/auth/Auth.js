// alternate version of ready()
$(() => {
    $("#registerForm").on("submit", register);
    $("#loginForm").on("submit", login);
});
//Function for 
export function register(e) {
    //When Form Submit then Page is reloading, But precentDefult() stopped the page relaoding, after the submit
    e.preventDefault();
    let name = $("#name").val().toString().trim();
    let email = $("#email").val().toString().trim();
    let password = $("#password").val().toString().trim();
    let confirmPass = $("#confirmPass").val().toString().trim();
    let userType = $("input[name='usertype']:checked").val();
    if (!name || !email || !password || !confirmPass || !userType) {
        alert("Please Fill All the Details!!!");
        return;
    }
    if (password != confirmPass) {
        alert("Please Check You Password!!!");
        return;
    }
    const userData = {
        UserName: name,
        UserEmail: email,
        UserPassword: password,
        UserConfirmPassword: confirmPass,
        TypeId: Number(userType)
    };
    $.ajax({
        url: "http://localhost:64467/api/userdetails/user/",
        async: false,
        type: "GET",
        dataType: "json",
        success: function (data) {
            let existsUserName = data.find((d) => d.UserName.toLowerCase() == name.toLowerCase());
            let existsUserEmail = data.find((e) => e.UserEmail == email);
            if (existsUserName) {
                alert("UserName already exists!!!");
                return;
            }
            else if (existsUserEmail) {
                alert("User Email already exists!!!");
                return;
            }
            else {
                $.ajax({
                    url: "http://localhost:64467/api/userdetails/user/addUser",
                    async: false,
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(userData),
                    success: function () {
                        alert("User Register Successfully!!!!");
                        window.location.href = "Login.html";
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
//Function for login
export function login(e) {
    var _a, _b;
    //When Form Submit then Page is reloading, But preventDefult() stopped the page relaoding, after the submit
    e.preventDefault();
    let email = (_a = $("#email").val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
    let password = (_b = $("#password")) === null || _b === void 0 ? void 0 : _b.val().toString().trim();
    if (!email || !password) {
        alert("Please Fill All the Details!!!");
        return;
    }
    $.ajax({
        url: "http://localhost:64467/api/userdetails/user/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            let found = data.find((p) => p.UserEmail == email);
            if (!found) {
                alert("User not found exists!!!");
                return;
            }
            else if (found.UserPassword != password) {
                alert("Please Check Your Credential!!!");
            }
            else {
                localStorage.setItem("currentUser", JSON.stringify(found));
                window.location.href = "Home.html";
                alert("login successfully!!!");
            }
        },
        error: function (err) {
            alert("Failed to Login!!!: " + err.responseText);
        },
    });
}
