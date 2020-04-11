let runningTotal = 0;
let screenBuffer = "0";
let previous_operator = "";

function handleButtonClick(event){
    buttonClicked = event.target.innerText;
    isOperatorClicked = isNaN(parseInt(buttonClicked));

    if (isOperatorClicked) {
        handleSymbolClick(buttonClicked, getScreenText());
        
    } else {
        handleNumberClick(buttonClicked, getScreenText());
    }
}

function handleNumberClick(buttonClicked, currentScreenText){
    if (buttonClicked === "0" && currentScreenText === "0") {

        //don't update the screenbuffer for leading zeros

    } else if (buttonClicked === "0" && currentScreenText !== "0") {
        
        setScreenText(currentScreenText + buttonClicked);

    } else if (buttonClicked !== "0" && currentScreenText === "0") {

        setScreenText(buttonClicked);

    } else if (buttonClicked !== "0" && currentScreenText !== "0") {

        setScreenText(currentScreenText + buttonClicked);

    }
    logState()
}

function handleSymbolClick(buttonClicked, currentScreenText){

    switch(buttonClicked){

            case 'C':
                setScreenText("0");
                previous_operator = "";
                runningTotal = 0;
                break;
            //character code for back-arrow
            case String.fromCharCode(8592):
                if (currentScreenText.length === 1) {
                    setScreenText("0")
                } else {
                    setScreenText(currentScreenText.substr(0,currentScreenText.length - 1))
                }
                break;
            case "=":
                if(previous_operator !== "") {
                    setScreenText("" + doArithmeticOperation(runningTotal, previous_operator,parseInt(currentScreenText)));
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
    logState()
}

function saveArithmeticOperator(operator){
    previous_operator = operator
    runningTotal = parseInt(getScreenText());
    setScreenText("0");

}

function doArithmeticOperation(firstOperand, operator, secondOperand){
    switch(operator){
        case "+":
            return firstOperand + secondOperand;
            break;
        case "-":
            return firstOperand - secondOperand;
            break;
        case "÷": 
            return firstOperand / secondOperand;
            break;
        case "×":
            return firstOperand * secondOperand;
            break;
    }
}

function setScreenText(updatedScreenBuffer) {
    document.querySelector(".screen").innerText = updatedScreenBuffer;
}

function getScreenText(){
    return document.querySelector(".screen").innerText;
}

function run() {
    document.querySelector(".calc-buttons").addEventListener("click", handleButtonClick);
}

function logState(){
    console.log(`Screen Text:${getScreenText()}\nPrevious Operator:${previous_operator}\nRunning Total:${runningTotal}`)
}