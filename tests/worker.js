var textHelper = resolve('textHelper');
var numberHelper = resolve('numberHelper');

module.exports = {
    sayHello: sayHello,
    operation: operation
};

function sayHello(name) {
    var period = textHelper.getPeriod();
    return `Hello, ${name}${period}`;
}

function operation(num1, num2) {
    return numberHelper.defaultOperation(num1, num2);
}