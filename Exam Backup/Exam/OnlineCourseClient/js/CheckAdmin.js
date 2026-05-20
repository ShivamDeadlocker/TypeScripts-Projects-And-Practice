const user = JSON.parse(localStorage.getItem("currentUser"));

function CheckAdmin() {
  if (user != null) {
    let userType = user.TypeId || 0;
    if (userType !== 1) {
      $("#adminOption").hide();
    }
  } else {
    $("#adminOption").hide();
  }
}
