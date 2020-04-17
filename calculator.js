//application state

let calcState = {
    runningTotal:0,
    screenBuffer: "0",
    previous_operator: null
};

let DEFAULT_CALC_STATE = {
    runningTotal:0,
    screenBuffer: "0",
    previousOperator: null
};

//application presentation
function setScreenText(text) {
    document.querySelector(".screen").innerText = text;
}

function getScreenText() {
    return document.querySelector(".screen").innerText;
}

function handleButtonClick(event, currentCalcState){
    buttonClicked = event.target.innerText;
    isOperatorClicked = isNaN(parseInt(buttonClicked));

    if (isOperatorClicked) {
        calcState = Object.assign({}, handleSymbolClick(buttonClicked, calcState));
        //console.log(calcState)
        setScreenText(calcState.screenBuffer);
        
    } else {
        calcState = Object.assign({}, handleNumberClick(buttonClicked, calcState));
        //console.log(currentCalcState);
        setScreenText(calcState.screenBuffer);
    }
}

//application logic + presentation bridge/binding
document.querySelector(".calc-buttons").addEventListener("click", handleButtonClick);

//application logic
function handleNumberClick(buttonClicked, currentCalcState){
    
    currentScreenText = currentCalcState.screenBuffer;

    if (buttonClicked === "0" && currentScreenText === "0") {

        //don't update the screenbuffer for leading zeros
        currentCalcState.screenBuffer = currentScreenText;

    } else if (buttonClicked !== "0" && currentScreenText === "0") {

        currentCalcState.screenBuffer = buttonClicked;

    } else if (currentScreenText !== "0") {
        currentCalcState.screenBuffer = currentScreenText + buttonClicked;
    }
    //console.log(currentCalcState);
    return Object.assign({}, currentCalcState);;
}

function handleSymbolClick(buttonClicked, currentCalcState){

    switch(buttonClicked){

            case 'C':
                currentCalcState = Object.assign({}, DEFAULT_CALC_STATE);
                break;
            //character code for back-arrow
            case String.fromCharCode(8592):
                if (currentCalcState.screenBuffer.length === 1) {
        
                    currentCalcState.screenBuffer = DEFAULT_CALC_STATE.screenBuffer;

                } else {

                    currentScreenText = currentCalcState.screenBuffer
                    currentScreenText = currentScreenText.substr(0,currentScreenText.length - 1)
                    currentCalcState.screenBuffer = currentScreenText;
                }
                break;
            case "=":
                if(currentCalcState.previousOperator !== "") {

                    currentCalcState = doArithmeticOperation(currentCalcState);
                }
                break;
            case "+":
                return saveArithmeticOperator("+", currentCalcState);
                break;
            case "-":
                return saveArithmeticOperator("-", currentCalcState);
                break;
            case "÷": 
                return saveArithmeticOperator("÷", currentCalcState);
                break;
            case "×":
                return saveArithmeticOperator("×", currentCalcState);
                break;
    }
    console.log(currentCalcState);
    return Object.assign({}, currentCalcState);
}

function saveArithmeticOperator(operator, currentCalcState){
    currentCalcState.previousOperator = operator;
    currentCalcState.runningTotal = parseInt(currentCalcState.screenBuffer);
    currentCalcState.screenBuffer = DEFAULT_CALC_STATE.screenBuffer;
    //console.log(currentCalcState);
    return Object.assign({}, currentCalcState);

}
 
function doArithmeticOperation(currentCalcState){
    operator = currentCalcState.previousOperator;
    firstOperand = parseInt(currentCalcState.runningTotal);
    secondOperand = parseInt(currentCalcState.screenBuffer);

    currentCalcState = Object.assign({}, DEFAULT_CALC_STATE);
    
    switch(operator){
        case "+":
            currentCalcState.screenBuffer = "" + (firstOperand + secondOperand);
            break;
        case "-":
            currentCalcState.screenBuffer = "" + (firstOperand - secondOperand);
            break;
        case "÷": 
            currentCalcState.screenBuffer = "" + (firstOperand / secondOperand);
            break;
        case "×":
            currentCalcState.screenBuffer = "" + (firstOperand * secondOperand);
            break;
    }
    //console.log(currentCalcState);
    return Object.assign({}, currentCalcState);
}