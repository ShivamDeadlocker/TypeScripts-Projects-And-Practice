import { displaySingleProducts, isValid, areValid, showMessage } from "../common/common.js";
// $(document).ready(() => {
//   loadProductId(); //Load Products Id
//   loadCategory(); //Load Categories
//   disable();
//   clear();
//   initialButtonState();
// });
// $(() => {
//   loadProductId(); //Load Products Id
//   loadCategory(); //Load Categories
//   disable();
//   clear();
//   initialButtonState();
// });
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
function initialButtonState() {
    $("#btnAdd").prop("disabled", false);
    $("#btnSave").prop("disabled", true); // Nothing to save yet
    $("#btnEdit").prop("disabled", false);
    $("#btnUpdate").prop("disabled", true); // Nothing to update yet
    $("#btnDelete").prop("disabled", false);
}
//Load Product Id
export function loadProductId() {
    $.ajax({
        url: "http://localhost:64467/api/product/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $("#ddlProdId").empty();
            $.each(data, function (index, prod) {
                $("#ddlProdId").append(
                //   '<option value="' + prod.ProdID + '">' + prod.ProdID + "</option>",
                `<option value="${prod.ProdID}">
              ${prod.ProdID}
            </option>`);
            });
        },
    });
}
//Load Categories
export function loadCategory() {
    $.ajax({
        url: "http://localhost:64467/api/category/all",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $("#ddlCatId").empty();
            $.each(data, function (index, cat) {
                $("#ddlCatId").append(
                //   '<option value="' +
                //     cat.categoryId +
                //     '">' +
                //     cat.categoryName +
                //     "</option>",
                `<option value="${cat.categoryId}">
              ${cat.categoryName}
            </option>`);
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
export function addProduct() {
    clear();
    $("#ddlProdId").empty();
    $("#ddlProdId").append('<option value="0">New EmpId Will Generate!!!</option>');
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
//     url: "http://localhost:64467/api/product/add",
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
//       initialButtonState();
//     },
//     error: function (err) {
//       alert("Failed to insert product!!!: " + err.responseText);
//     },
//   });
// }
// With Form Data And  Image Selection Feature
export function saveProduct() {
    var _a, _b, _c, _d, _e, _f;
    let name = (_a = $("#txtName").val()) === null || _a === void 0 ? void 0 : _a.toString().trim();
    let price = (_b = $("#txtPrice").val()) === null || _b === void 0 ? void 0 : _b.toString().trim();
    let desc = (_c = $("#txtDesc").val()) === null || _c === void 0 ? void 0 : _c.toString().trim();
    let qty = (_d = $("#txtQty").val()) === null || _d === void 0 ? void 0 : _d.toString().trim();
    let categoryId = (_e = $("#ddlCatId").val()) === null || _e === void 0 ? void 0 : _e.toString();
    //Actual File Object
    //let file = $("#txtImg")[0].files[0];
    //Type Asserstion
    const fileInput = $("#txtImg")[0];
    const file = (_f = fileInput.files) === null || _f === void 0 ? void 0 : _f[0];
    //   if (!name || !price || !file || !desc || !qty) {
    //     alert("Please Fill All The Fields!!!");
    //     return;
    //   }
    //Using the Helper function for validating the attributes
    if (!areValid([name, price, desc, qty, categoryId, file])) {
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
export function editProduct() {
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
//     url: "http://localhost:64467/api/product/update",
//     type: "PUT",
//     contentType: "application/json",
//     data: JSON.stringify(ProductData),
//     success: function () {
//       alert("Product Details Updated Successfully!!!");
//       loadProductId();
//       loadProductId();
//       disable();
//       clear();
//       initialButtonState();
//     },
//     error: function (err) {
//       alert("Failed to Update Product Details!!!: " + err.responseText);
//     },
//   });
// }
//Update Product With Form Data And With Image Selection Feature
export function updateProduct() {
    var _a, _b, _c, _d, _e, _f, _g;
    let id = (_a = $("#ddlProdId").val()) === null || _a === void 0 ? void 0 : _a.toString();
    let name = (_b = $("#txtName").val()) === null || _b === void 0 ? void 0 : _b.toString().trim();
    let price = (_c = $("#txtPrice").val()) === null || _c === void 0 ? void 0 : _c.toString().trim();
    let desc = (_d = $("#txtDesc").val()) === null || _d === void 0 ? void 0 : _d.toString().trim();
    let qty = (_e = $("#txtQty").val()) === null || _e === void 0 ? void 0 : _e.toString().trim();
    let categoryId = (_f = $("#ddlCatId").val()) === null || _f === void 0 ? void 0 : _f.toString();
    //let file = $("#txtImg")[0].files[0]; // check file
    //Using the Helper function for validating the attributes
    if (!areValid([id, name, price, desc, qty, categoryId])) {
        showMessage("Please Fill All The Fields!!!");
        return;
    }
    //Type Assertion
    const fileInput = $("#txtImg")[0];
    const file = (_g = fileInput.files) === null || _g === void 0 ? void 0 : _g[0];
    //   if(!isValid(file))
    //   {
    //     showMessage("Please Select the Correct Image File!!!");
    //     return;
    //   }
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
//  Delete Product
export function deleteProduct() {
    //   let id = parseInt($("#ddlProdId").val());
    var _a;
    let id = Number((_a = $("#ddlProdId").val()) === null || _a === void 0 ? void 0 : _a.toString());
    if (!id) {
        alert("Select the prodcut id!!!");
    }
    if (!confirm("Are you sure to delete?"))
        return;
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
export function loadSelectedProduct() {
    let id = $("#ddlProdId").val();
    $.ajax({
        url: "http://localhost:64467/api/product/all",
        type: "GET",
        dataType: "json",
        success: (data) => {
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
//Old Way 
// $("#ddlProdId").on("change", () => {
//   let id = $("#ddlProdId").val();
//   $.ajax({
//     url: "http://localhost:64467/api/product/all",
//     type: "GET",
//     dataType: "json",
//     success: (data: ProductTable[]) => {
//       let prod = data.find((p) => p.ProdID == Number(id));
//       $("#txtName").val(prod.ProdName);
//       $("#txtPrice").val(prod.ProdPrice);
//       // $("#txtImg").val(prod.ProdImg);
//       $("#txtDesc").val(prod.ProdDsc);
//       $("#txtQty").val(prod.ProdQty);
//       $("#ddlCatId").val(prod.categoryId);
//       $("#product-container").show();
//       displaySingleProducts(data);
//     },
//     error: () => {
//       alert("Error fetching employee");
//     },
//   });
// });
