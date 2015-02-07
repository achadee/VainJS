#VainJS - Chain validation
##Introduction
VainJS is a simple chain validation tool that allows fields to be verified and validated. This project was created so developers won't need to sift through multiple if statements to validate a single field.

### When should I use VainJS
* When you have single fields that require high levels of validation
* When your feilds are not coupled with each other
* When all conditions must be met. VainJS validates with AND operators.

##Setup
It's pretty straightforward to start VainJS. Just require it and use an instance.
```javascript
	var validate = require('vain-js');
```

##Methods
VainJS provides a number of single value and multi value (arrays) methods
###Single value

#### Exists()
Checks if the value exists, values of 0 will return true.
```javascript
	var password = '';
	return validate(password).exists().status;
```
	false


#### is(operator, compare_value, parameter_tag)
compares the value with a given compare value and operater. available operators include `==`, `!=`, `>=`, `>`, `<`, `<=`
```javascript
	var age = 17;
	var legal_age = 18;
	return validate(age).is('>=', legal_age, 'Legal age').status;
```
	false

The parameter tag is there for the 'reason' field that is sent back in the response.
```javascript
	return validate(age).is('>=', legal_age, 'Legal age').reason;
```
	'Field with value (17) needs to be greater than or equal to Legal Age'
	
All methods return a Vain object with both a status and a reason. You can imporve the 'reason' by providing a tag for the value that is under scope.
```javascript
	return validate(age, 'Members age').is('>=', legal_age, 'Legal age').reason;
```
	'Members age needs to be greater than or equal to Legal Age'
