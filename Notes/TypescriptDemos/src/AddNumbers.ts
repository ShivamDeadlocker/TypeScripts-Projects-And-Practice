namespace Demo {
    export namespace Typescript {
        export class BasicPrograms {

            //Function to display the sum of two numbers
            addNumbers(): any {
                let functionName: string = "addNumbers";
                let num1: any;
                let num2: any;
                let sumResult: any;
                try {

                    //Get the first value
                    num1 = (<HTMLInputElement>document.getElementById("number1")).value;

                    //Get the second value
                    num2 = (<HTMLInputElement>document.getElementById("number2")).value;

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

                } catch (error) {
                    typescriptExample.throwError(functionName, error.message);
                }
            }

            //Function to display array list
            arrayExample(): void {
                let functionName: string = "arrayExample";
                let training: Array<string> = ['Portal', 'CanvasApp', 'PowerAutomate'];
                let insertItems = [];
                try {
                    //Display for each items
                    training.forEach(function (item) {
                        insertItems.push(item)
                    });
                    //Display Alert
                    typescriptExample.showMessage("Items are: " + insertItems);
                }
                catch (error) {
                    typescriptExample.throwError(functionName, error.message);
                }
            }

            sayHello(user: string) {
                return "Hello " + user + "!";
            }

            //This function used to validate attribute
            isValid(attribute: any): boolean {
                let functionName: string = "isValid";
                let isValid: boolean = false;
                try {
                    //Validate the attribute and return True or False accordingly
                    if (attribute != null && attribute != undefined && attribute != "undefined" && attribute != "null" && attribute != "")
                        isValid = true;
                }
                catch (ex) {
                    typescriptExample.throwError(functionName, ex.message);
                }
                return isValid;
            }
            //This function used to throw error 
            throwError(functionNameParam: string, error: any) {
                let functionName: string = "throwError";
                let errorMessage: string = "";
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
            }
            //This function used to display error message
            showMessage(message: string) {
                let functionName: string = "showMessage";
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
            }
        }
    }
}

let typescriptExample = new Demo.Typescript.BasicPrograms();