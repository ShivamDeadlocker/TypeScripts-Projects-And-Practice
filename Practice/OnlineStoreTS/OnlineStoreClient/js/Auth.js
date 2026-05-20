//Function for signup
function register(e) {
  //When Form Submit then Page is reloading, But precentDefult() stopped the page relaoding, after the submit
  e.preventDefault();
  let name = $("#name").val();
  let email = $("#email").val();
  let password = $("#password").val();
  let confirmPass = $("#confirmPass").val();

  if (!name || !email || !password || !confirmPass) {
    alert("Please Fill All the Details!!!");
    return;
  }

  if (password != confirmPass) {
    alert("Please Check You Password!!!");
  }

  let UserDetails = {
    UserName: name,
    UserEmail: email,
    UserPassword: password,
    UserConfirmPassword: confirmPass,
  };

  $.ajax({
    url: "http://localhost:64689/api/auth/user/",

    async: false,

    type: "GET",

    dataType: "json",

    success: function (data) {
      let existsUserName = data.find(
        (d) => d.UserName.toLowerCase() == name.toLowerCase(),
      );
      let existsUserEmail = data.find((e) => e.UserEmail == email);
      if (existsUserName) {
        alert("UserName already exists!!!");
        return;
      } else if (existsUserEmail) {
        alert("User Email already exists!!!");
        return;
      } else {
        $.ajax({
          url: "http://localhost:64689/api/auth/user/addUser",

          async: false,

          type: "POST",

          contentType: "application/json",

          data: JSON.stringify(UserDetails),

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
function login(e) {
  //When Form Submit then Page is reloading, But precentDefult() stopped the page relaoding, after the submit
  e.preventDefault();
  let email = $("#email").val().trim();
  let password = $("#password").val().trim();

  if (!email || !password) {
    alert("Please Fill All the Details!!!");
    return;
  }

  $.ajax({
    url: "http://localhost:64689/api/auth/user/",

    type: "GET",

    dataType: "json",

    success: function (data) {
      let found = data.find((p) => p.UserEmail == email);
      if (!found) {
        alert("User not found exists!!!");
        return;
      } else if (found.UserPassword != password) {
        alert("Please Check Your Credential!!!");
      } else {
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
