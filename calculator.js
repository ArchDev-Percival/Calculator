let runningTotal = 0;
let screenBuffer = "0";
let previous_operator = "";

function handleButtonClick(event){
    buttonClicked = event.target.innerText;
    isOperatorClicked = isNaN(parseInt(buttonClicked));

    if (isOperatorClicked) {
        handleSymbolClick(buttonClicked);
        
    } else {
        handleNumberClick(buttonClicked);
    }
}

function handleNumberClick(buttonClicked){
    if (buttonClicked === "0" && getScreenText() === "0") {

        //don't update the screenbuffer for leading zeros

    } else if (buttonClicked === "0" && getScreenText() !== "0") {
        
        setScreenText(getScreenText() + buttonClicked);

    } else if (buttonClicked !== "0" && getScreenText() === "0") {

        setScreenText(buttonClicked);

    } else if (buttonClicked !== "0" && getScreenText() !== "0") {

        setScreenText(getScreenText() + buttonClicked);

    }
}

function handleSymbolClick(buttonClicked){

    switch(buttonClicked){

            case 'C':
                setScreenText("0");
                previous_operator = "";
                runningTotal = 0;
                break;
            //character code for back-arrow
            case String.fromCharCode(8592):
                currentScreenText = getScreenText();
                if (currentScreenText.length === 1) {
                    setScreenText("0")
                } else {
                    setScreenText(currentScreenText.substr(0,currentScreenText.length - 1))
                }
                break;
            case "=":
                if(previous_operator !== "") {
                    setScreenText("" + doArithmeticOperation(previous_operator));
                    previous_operator = "";
                    runningTotal = 0;
                }
                break;
            case "+":
                saveArithmeticOperator("+");
                break;
            case "-":
                saveArithmeticOperator("-");
                break;
            case "÷": 
                saveArithmeticOperator("÷");
                break;
            case "×":
                saveArithmeticOperator("×");
                break;
    }

}

function saveArithmeticOperator(operator){
    previous_operator = operator
    runningTotal = parseInt(getScreenText());
    setScreenText("0");

}

function doArithmeticOperation(operator){
    switch(operator){
        case "+":
            return runningTotal + parseInt(getScreenText())
            break;
        case "-":
            return runningTotal - parseInt(getScreenText())
            break;
        case "÷": 
            return runningTotal / parseInt(getScreenText())
            break;
        case "×":
            return runningTotal * parseInt(getScreenText())
            break;
    }
}

function setScreenText(updatedScreenBuffer) {
    document.querySelector(".screen").innerText = updatedScreenBuffer;
}

function getScreenText(){
    return document.querySelector(".screen").innerText;
}

document.querySelector(".calc-buttons").addEventListener("click", handleButtonClick);