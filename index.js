/*
 * Entry point, returns a Vain object
 */
module.exports = function  (param, name) {
	var validation_chain = new Vain();
	validation_chain.value = param;
	validation_chain.feild_name = name;
	return validation_chain;
}

/*
 * constructor
 */
function Vain () {}

function _nm (vain) {
	return (vain.feild_name || 'Field with value (' + vain.value + ')');
}

function _set(vain, status, reason) {
	if(!vain.result){
		vain.result = {};
		vain.result.status = status;
		vain.result.reason = reason;
	}
	else if (vain.result.status && !status){
		vain.result.status = status;
		vain.result.reason = reason;
	}
	return vain;
}

/*
 * simple check to make sure there is a value on the field
 */
Vain.prototype.exists = function() {
	if(this.value === 0 || this.value )
		return _set(this, true);
	if(!this.value)
		_set(this, false, _nm(this) + ' does not apear to exist');
	return _set(this, true);
};

Vain.prototype.is = function(operator, compare, param_name) {
	var value, _mp;
	switch(operator){
		case '!=':
			value = (this.value !== compare);
			_mp = 'not equal to ';
			break;
		case '>=':
			value = (this.value >= compare);
			_mp = 'greater than or equal to ';
			break;
		case '>':
			value = (this.value > compare);
			_mp = 'greater than ';
			break;
		case '<=':
			value = (this.value <= compare);
			_mp = 'less than or equal to ';
			break;
		case '<':
			value = (this.value < compare);
			_mp = 'less than ';
			break;
		default:
			value = (this.value === compare);
			console.log('equal')
			_mp = 'equal to ';
			break;
	}
	if(!value)
		return _set(this, value, _nm(this) + ' needs to be ' + _mp + (param_name || compare));
	return _set(this, value);
};

