import { ProductTable } from "../models/ProductTable";

import { Category } from "../models/Category";

import { displaySingleProducts, isValid, areValid, showMessage } from "../common/common.js";


$(() => {
  loadProductId(); //Load Products Id
  loadCategory(); //Load Categories
  disable();
  clear();
  initialButtonState();

  $("#btnAdd").on("click", addProduct);
  $("#btnSave").on("click", saveProduct);
  $("#btnEdit").on("click", editProduct);
  $("#btnUpdate").on("click", updateProduct);
  $("#btnDelete").on("click", deleteProduct);
  $("#ddlProdId").on("change", loadSelectedProduct);
});

//Button States When Page is Load
function initialButtonState(): void {
  $("#btnAdd").prop("disabled", false);
  $("#btnSave").prop("disabled", true); // Nothing to save yet
  $("#btnEdit").prop("disabled", false);
  $("#btnUpdate").prop("disabled", true); // Nothing to update yet
  $("#btnDelete").prop("disabled", false);
}

//Load Product Id
export function loadProductId(): void {
  $.ajax({
    url: "http://localhost:64467/api/product/all",

    type: "GET",

    dataType: "json",

    success: function (data: ProductTable[]) {
      $("#ddlProdId").empty();

      $.each(data, function (index: number, prod: ProductTable) {
        $("#ddlProdId").append(
          //   '<option value="' + prod.ProdID + '">' + prod.ProdID + "</option>",
          `<option value="${prod.ProdID}">
              ${prod.ProdID}
            </option>`,
        );
      });
    },
  });
}

//Load Categories
export function loadCategory(): void {
  $.ajax({
    url: "http://localhost:64467/api/category/all",

    type: "GET",

    dataType: "json",

    success: function (data: Category[]) {
      $("#ddlCatId").empty();

      $.each(data, function (index: number, cat: Category) {
        $("#ddlCatId").append(
          //   '<option value="' +
          //     cat.categoryId +
          //     '">' +
          //     cat.categoryName +
          //     "</option>",

          `<option value="${cat.categoryId}">
              ${cat.categoryName}
            </option>`,
        );
      });
    },
  });
}

//Clear For Function
function clear(): void {
  $("#txtName").val("");
  $("#txtPrice").val("");
  $("#txtImg").val("");
  $("#txtDesc").val("");
  $("#txtQty").val("");
  $("#product-container").html(""); // clear content
  $("#product-container").hide();
}

//Enable Form
function enable(): void {
  $("#txtName").prop("disabled", false);
  $("#txtPrice").prop("disabled", false);
  $("#txtImg").prop("disabled", false);
  $("#txtDesc").prop("disabled", false);
  $("#txtQty").prop("disabled", false);
  $("#ddlCatId").prop("disabled", false);
}

//Disable Form
function disable(): void {
  $("#txtName").prop("disabled", true);
  $("#txtPrice").prop("disabled", true);
  $("#txtImg").prop("disabled", true);
  $("#txtDesc").prop("disabled", true);
  $("#txtQty").prop("disabled", true);
  $("#ddlCatId").prop("disabled", true);
}

//Add Button
export function addProduct(): void {
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


//With Form Data And  Image Selection Feature
export function saveProduct(): void {
  let name = $("#txtName").val()?.toString().trim();
  let price = $("#txtPrice").val()?.toString().trim();
  let desc = $("#txtDesc").val()?.toString().trim();
  let qty = $("#txtQty").val()?.toString().trim();
  let categoryId = $("#ddlCatId").val()?.toString();


  //Type Asserstion
  const fileInput = $("#txtImg")[0] as HTMLInputElement;

  const file = fileInput.files?.[0];


//Using the Helper function for validating the attributes
  if (!areValid([name, price, desc, qty, categoryId, file]))
  {
    showMessage("Please Fill All The Fields!!!");
    return;
  }

  //Node: Append accepts only string, blob and file
  let formData = new FormData();

  formData.append("ProdName", name);
  formData.append("ProdPrice", price);
  formData.append("ProdDsc", desc);
  formData.append("ProdQty", qty);
  formData.append("categoryId", categoryId);
  formData.append("image", file);

  $.ajax({
    url: "http://localhost:64467/api/product/add",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,

    success: function () {
      //alert("Product Added Successfully!!!");
      showMessage("Product Added Successfully!!!");
      $("#ddlProdId").prop("disabled", false);
      disable();
      loadProductId();
      loadProductId();
      clear();
      initialButtonState();
    },

    error: function (err) {
      alert("Error: " + err.responseText);
    },
  });
}

//Edit Button 
export function editProduct(): void {
  enable();
  $("#btnAdd").prop("disabled", true); // Can't add while editing
  $("#btnSave").prop("disabled", true); // Not saving new record
  $("#btnEdit").prop("disabled", true); // Already editing
  $("#btnUpdate").prop("disabled", false); // Ready to update
  $("#btnDelete").prop("disabled", true); // Can't delete while editing
}


//Update Product With Form Data And With Image Selection Feature
export function updateProduct(): void {
  let id = $("#ddlProdId").val()?.toString();
  let name = $("#txtName").val()?.toString().trim();
  let price = $("#txtPrice").val()?.toString().trim();
  let desc = $("#txtDesc").val()?.toString().trim();
  let qty = $("#txtQty").val()?.toString().trim();
  let categoryId = $("#ddlCatId").val()?.toString();

  //Using the Helper function for validating the attributes
  if (!areValid([id, name, price, desc, qty, categoryId]))
  {
    showMessage("Please Fill All The Fields!!!");
    return;
  }

  //Type Assertion
  const fileInput = $("#txtImg")[0] as HTMLInputElement;

  const file = fileInput.files?.[0];

  let formData = new FormData();

  formData.append("ProdID", id);
  formData.append("ProdName", name);
  formData.append("ProdPrice", price);
  formData.append("ProdDsc", desc);
  formData.append("ProdQty", qty);
  formData.append("categoryId", categoryId);

  // Only append image if selected
  if (file && isValid(file)) {
    formData.append("image", file);
  }

  $.ajax({
    url: "http://localhost:64467/api/product/update",
    type: "PUT",
    data: formData,
    contentType: false,
    processData: false,

    success: function () {
      alert("Product Updated Successfully!");
      loadProductId();
      disable();
      clear();
      initialButtonState();
    },

    error: function (err) {
      alert("Update failed: " + err.responseText);
    },
  });
}

//Delete Product
export function deleteProduct(): void {
  //   let id = parseInt($("#ddlProdId").val());

  let id = Number($("#ddlProdId").val()?.toString());

  if (!id) {
    alert("Select the prodcut id!!!");
  }

  if (!confirm("Are you sure to delete?")) return;

  $.ajax({
    url: `http://localhost:64467/api/product/delete/${id}`,

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
export function loadSelectedProduct(): void {
let id = $("#ddlProdId").val();

  $.ajax({
    url: "http://localhost:64467/api/product/all",

    type: "GET",

    dataType: "json",

    success: (data: ProductTable[]) => {
      let prod = data.find((p) => p.ProdID == Number(id));

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
}


