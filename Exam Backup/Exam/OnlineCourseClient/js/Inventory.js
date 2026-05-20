$(document).ready(() => {
  loadProductId(); //Load Products Id
  loadCategory(); //Load Categories
  disable();
  clear();
  intialButtonState();
});

function intialButtonState() {
  $("#btnAdd").prop("disabled", false);
  $("#btnSave").prop("disabled", true); // Nothing to save yet
  $("#btnEdit").prop("disabled", false);
  $("#btnUpdate").prop("disabled", true); // Nothing to update yet
  $("#btnDelete").prop("disabled", false);
}

//Load Product Id

function loadProductId() {
  $.ajax({
    url: "http://localhost:64689/api/product/all",

    type: "GET",

    dataType: "json",

    success: function (data) {
      $("#ddlProdId").empty();

      $.each(data, function (index, prod) {
        $("#ddlProdId").append(
          '<option value="' + prod.ProdID + '">' + prod.ProdID + "</option>",
        );
      });
    },
  });
}

//Load Categories

function loadCategory() {
  $.ajax({
    url: "http://localhost:64689/api/category/all",

    type: "GET",

    dataType: "json",

    success: function (data) {
      $("#ddlCatId").empty();

      $.each(data, function (index, cat) {
        $("#ddlCatId").append(
          '<option value="' +
            cat.categoryId +
            '">' +
            cat.categoryName +
            "</option>",
        );
      });
    },
  });
}

//Clear For Function

function clear() {
  $("#txtName").val("");
  $("#txtPrice").val("");
  $("#txtImg").val("");
  $("#txtDesc").val("");
  $("#txtQty").val("");
  $("#product-container").html(""); // clear content
  $("#product-container").hide();
}

//Enable Form

function enable() {
  $("#txtName").prop("disabled", false);
  $("#txtPrice").prop("disabled", false);
  $("#txtImg").prop("disabled", false);
  $("#txtDesc").prop("disabled", false);
  $("#txtQty").prop("disabled", false);
  $("#ddlCatId").prop("disabled", false);
}

//Disable Form

function disable() {
  $("#txtName").prop("disabled", true);
  $("#txtPrice").prop("disabled", true);
  $("#txtImg").prop("disabled", true);
  $("#txtDesc").prop("disabled", true);
  $("#txtQty").prop("disabled", true);
  $("#ddlCatId").prop("disabled", true);
}

//Add Button

function addProduct() {
  clear();

  $("#ddlProdId").empty();
  $("#ddlProdId").append(
    '<option value="0">New EmpId Will Generate!!!</option>',
  );
  $("#ddlProdId").prop("disabled", true);
  enable();

  $("#btnAdd").prop("disabled", true); // Can't add while adding
  $("#btnSave").prop("disabled", false); //  Ready to save
  $("#btnEdit").prop("disabled", true); // Can't edit while adding
  $("#btnUpdate").prop("disabled", true); // Not updating
  $("#btnDelete").prop("disabled", true); // Can't delete while adding
}

//Insert Product

// Without Form Data And Without Image Selection Feature
// function saveProduct() {
//   let name = $(txtName).val().trim();
//   let price = $(txtPrice).val().trim();
//   let img = $(txtImg).val().trim();
//   let desc = $(txtDesc).val().trim();
//   let qty = $(txtQty).val().trim();
//   let department = $(ddlCatId).val();

//   if (!name || !price || !img || !desc || !qty) {
//     alert("Please Fill All The Fields!!!");
//     return;
//   }

//   if (price <= 0 || qty <= 0) {
//     alert("Price or Quantity Can't be negative or equal to zero!!!");
//     return;
//   }

//   let ProductData = {
//     ProdName: name,
//     ProdPrice: parseInt(price),
//     ProdImg: img,
//     ProdDsc: desc,
//     ProdQty: parseInt(qty),
//     categoryId: parseInt(department),
//   };

//   $.ajax({
//     url: "http://localhost:64689/api/product/add",

//     type: "POST",

//     contentType: "application/json",

//     data: JSON.stringify(ProductData),

//     success: function () {
//       alert("Product Added Successfully!!!");
//       $("#ddlProdId").prop("disabled", false);
//       disable();
//       loadProductId();
//       loadProductId();
//       clear();
//       intialButtonState();
//     },

//     error: function (err) {
//       alert("Failed to insert product!!!: " + err.responseText);
//     },
//   });
// }

// With Form Data And  Image Selection Feature

function saveProduct() {
  let name = $("#txtName").val().trim();
  let price = $("#txtPrice").val().trim();
  let desc = $("#txtDesc").val().trim();
  let qty = $("#txtQty").val().trim();
  let department = $("#ddlCatId").val();

  //Actual File Object
  let file = $("#txtImg")[0].files[0];

  if (!name || !price || !file || !desc || !qty) {
    alert("Please Fill All The Fields!!!");
    return;
  }

  let formData = new FormData();

  formData.append("ProdName", name);
  formData.append("ProdPrice", price);
  formData.append("ProdDsc", desc);
  formData.append("ProdQty", qty);
  formData.append("categoryId", department);
  formData.append("image", file);

  $.ajax({
    url: "http://localhost:64689/api/product/add",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,

    success: function () {
      alert("Product Added Successfully!!!");
      $("#ddlProdId").prop("disabled", false);
      disable();
      loadProductId();
      loadProductId();
      clear();
      intialButtonState();
    },

    error: function (err) {
      alert("Error: " + err.responseText);
    },
  });
}

function editProduct() {
  enable();
  $("#btnAdd").prop("disabled", true); // Can't add while editing
  $("#btnSave").prop("disabled", true); // Not saving new record
  $("#btnEdit").prop("disabled", true); // Already editing
  $("#btnUpdate").prop("disabled", false); // Ready to update
  $("#btnDelete").prop("disabled", true); // Can't delete while editing
}

//Update Product Without Form Data And Without Image Selection Feature

// function updateProduct() {
//   let id = $(ddlProdId).val();
//   let name = $(txtName).val().trim();
//   let price = $(txtPrice).val().trim();
//   let img = $(txtImg).val().trim();
//   let desc = $(txtDesc).val().trim();
//   let qty = $(txtQty).val().trim();
//   let department = $(ddlCatId).val();

//   if (!name || !price || !img || !desc || !qty) {
//     alert("Please Fill All The Fields!!!");
//     return;
//   }

//   if (price <= 0 || qty <= 0) {
//     alert("Price or Quantity Can't be negative or equal to zero!!!");
//     return;
//   }

//   let ProductData = {
//     ProdID: id,
//     ProdName: name,
//     ProdPrice: parseInt(price),
//     ProdImg: img,
//     ProdDsc: desc,
//     ProdQty: parseInt(qty),
//     categoryId: parseInt(department),
//   };

//   $.ajax({
//     url: "http://localhost:64689/api/product/update",

//     type: "PUT",

//     contentType: "application/json",

//     data: JSON.stringify(ProductData),

//     success: function () {
//       alert("Product Details Updated Successfully!!!");
//       loadProductId();
//       loadProductId();
//       disable();
//       clear();
//       intialButtonState();
//     },

//     error: function (err) {
//       alert("Failed to Update Product Details!!!: " + err.responseText);
//     },
//   });
// }



//Update Product With Form Data And With Image Selection Feature
function updateProduct() {
  let id = $("#ddlProdId").val();
  let name = $("#txtName").val().trim();
  let price = $("#txtPrice").val().trim();
  let desc = $("#txtDesc").val().trim();
  let qty = $("#txtQty").val().trim();
  let category = $("#ddlCatId").val();

  let file = $("#txtImg")[0].files[0]; // check file

  let formData = new FormData();

  formData.append("ProdID", id);
  formData.append("ProdName", name);
  formData.append("ProdPrice", price);
  formData.append("ProdDsc", desc);
  formData.append("ProdQty", qty);
  formData.append("categoryId", category);

  // Only append image if selected
  if (file) {
    formData.append("image", file);
  }

  $.ajax({
    url: "http://localhost:64689/api/product/update",
    type: "PUT",
    data: formData,
    contentType: false,
    processData: false,

    success: function () {
      alert("Product Updated Successfully!");
      loadProductId();
      disable();
      clear();
      intialButtonState();
    },

    error: function (err) {
      alert("Update failed: " + err.responseText);
    },
  });
}

//  Delete Product

function deleteProduct() {
  let id = parseInt($("#ddlProdId").val());

  if (!id) {
    alert("Select the prodcut id!!!");
  }

  if (!confirm("Are you sure to delete?")) return;

  $.ajax({
    url: `http://localhost:64689/api/product/delete/${id}`,

    type: "DELETE",

    success: () => {
      alert("Product Deleted!!!");
      disable();
      clear();
      loadProductId();
    },

    error: () => {
      alert("Error deleting product");
    },
  });
}

//DDL Change Event
$("#ddlProdId").change(() => {
  let id = $("#ddlProdId").val();

  $.ajax({
    url: "http://localhost:64689/api/product/all",

    type: "GET",

    dataType: "json",

    success: (data) => {
      let prod = data.find((p) => p.ProdID == id);

      $("#txtName").val(prod.ProdName);
      $("#txtPrice").val(prod.ProdPrice);
      // $("#txtImg").val(prod.ProdImg);
      $("#txtDesc").val(prod.ProdDsc);
      $("#txtQty").val(prod.ProdQty);
      $("#ddlCatId").val(prod.categoryId);
      $("#product-container").show();

      displaySingleProducts(data);
    },

    error: () => {
      alert("Error fetching employee");
    },
  });
});
