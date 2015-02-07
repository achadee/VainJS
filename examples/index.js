var validate = require('../index.js');


console.log(validate('vvv', 'Password').exists().is('==', 'vvv', 'Repeat Password'));