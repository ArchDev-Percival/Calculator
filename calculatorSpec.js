describe('doArithmeticOperation tests', () => {
    it('Should perform addition operation correctly', () => {
        const result = doArithmeticOperation(10, '+', 2);
        expect(result).toBe(12);
    });
});

//describe a block of tests
//it is each test case in a block
//expect

//Test has 3 parts
//DataSetUp => mocking, creating a test object and so on (not done here)
//invoking => the function being tested with the data setup
//Expectation => Assertions against the results

describe('handleSymbolClick tests', () => {
    beforeEach(() => {
        // Create a spy for the setScreenText function
        // to prevent the DOM from being updated during tests
        oldSetScreenText = setScreenText;
        setScreenText = jasmine.createSpy();

        oldLogState = logState;
        logState = jasmine.createSpy();
    })
    afterEach(() => {
        setScreenText = oldSetScreenText;
        logState = oldLogState;
    })
    it('should reset the state of the calculator when "C" is clicked', () => {
        handleSymbolClick('C', '152');
        expect(previous_operator).toBe("");
        expect(runningTotal).toBe(0);
        expect(setScreenText).toHaveBeenCalledWith("0");
    });
});