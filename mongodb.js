const numberValidator = /^(?:\d{8,}|\d{2,3}-\d{6,})$/


let str = '1-23-4567890'
console.log(numberValidator.exec(str))