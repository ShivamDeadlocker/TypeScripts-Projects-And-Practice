var Demo;
(function (Demo) {
    var Typescript;
    (function (Typescript) {
        var BasicPrograms = /** @class */ (function () {
            function BasicPrograms() {
            }
            //Function to display the sum of two numbers
            BasicPrograms.prototype.addNumbers = function () {
                var functionName = "addNumbers";
                var num1;
                var num2;
                var sumResult;
                try {
                    //Get the first value
                    num1 = document.getElementById("number1").value;
                    //Get the second value
                    num2 = document.getElementById("number2").value;
                    //Validate the numbers
                    if (typescriptExample.isValid(num1) && typescriptExample.isValid(num2)) {
                        //Add the values
                        sumResult = parseInt(num1) + parseInt(num2);
                        //Display Alert
                        typescriptExample.showMessage('Sum of the two numbers is: ' + sumResult);
                        console.log(sumResult);
                    }
                    else {
                        //Display Alert
                        typescriptExample.showMessage('Please enter valid data');
                    }
                }
                catch (error) {
                    typescriptExample.throwError(functionName, error.message);
                }
            };
            //Function to display array list
            BasicPrograms.prototype.arrayExample = function () {
                var functionName = "arrayExample";
                var training = ['Portal', 'CanvasApp', 'PowerAutomate'];
                var insertItems = [];
                try {
                    //Display for each items
                    training.forEach(function (item) {
                        insertItems.push(item);
                    });
                    //Display Alert
                    typescriptExample.showMessage("Items are: " + insertItems);
                }
                catch (error) {
                    typescriptExample.throwError(functionName, error.message);
                }
            };
            BasicPrograms.prototype.sayHello = function (user) {
                return "Hello " + user + "!";
            };
            //This function used to validate attribute
            BasicPrograms.prototype.isValid = function (attribute) {
                var functionName = "isValid";
                var isValid = false;
                try {
                    //Validate the attribute and return True or False accordingly
                    if (attribute != null && attribute != undefined && attribute != "undefined" && attribute != "null" && attribute != "")
                        isValid = true;
                }
                catch (ex) {
                    typescriptExample.throwError(functionName, ex.message);
                }
                return isValid;
            };
            //This function used to throw error 
            BasicPrograms.prototype.throwError = function (functionNameParam, error) {
                var functionName = "throwError";
                var errorMessage = "";
                try {
                    //Concatenate the Message together
                    errorMessage = functionNameParam + ": Error: " + (error.description || error.message);
                    //Show Error Message
                    alert(errorMessage);
                }
                catch (ex) {
                    //Concatenate the Message together
                    errorMessage = functionNameParam + ": Error: " + (error.description || error.message);
                    //Show Error Message
                    typescriptExample.showMessage(functionName + " Error: " + (ex.description || ex.message));
                }
            };
            //This function used to display error message
            BasicPrograms.prototype.showMessage = function (message) {
                var functionName = "showMessage";
                try {
                    //Validate Xrm.Utility and proceed
                    if (typescriptExample.isValid(message)) {
                        alert(message);
                    }
                    else {
                        alert(message);
                    }
                }
                catch (ex) {
                    typescriptExample.throwError(functionName, ex.message);
                }
            };
            return BasicPrograms;
        }());
        Typescript.BasicPrograms = BasicPrograms;
    })(Typescript = Demo.Typescript || (Demo.Typescript = {}));
})(Demo || (Demo = {}));
var typescriptExample = new Demo.Typescript.BasicPrograms();
