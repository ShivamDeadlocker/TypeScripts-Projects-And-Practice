//Store the current login user
let user = JSON.parse(localStorage.getItem("currentUser"));
let billDetails = JSON.parse(localStorage.getItem("BillDetails"));

const content = document.getElementById("card");

if (user) {
  content.innerHTML = `      
      <h2>Thank You for Your Purchase!!!</h2>
      <p>Your order has been placed successfully.</p>
      <p>Your Bill Information.</p>
      <p>User Name: ${user.UserName}</p> 
      <p>Bill id: ${billDetails[0].BillId}</p>
      <p>Total Amount: ₹${billDetails[0].TotalAmount}.00</p>
      <button onclick="goHome()">Go to Home</button> `;
} else {
  content.innerHTML = `
        <h2>No Order Is Placed!!!!</h2>
        <p>Please Placed Your Order!!!!</p>
        <button onclick="goHome()">Go to Home</button> `;
}

function goHome() {
  if (billDetails != null) {
    localStorage.removeItem("billDetails");
    window.location.href = "Home.html";
  } else {
    window.location.href = "Home.html";
  }
}
