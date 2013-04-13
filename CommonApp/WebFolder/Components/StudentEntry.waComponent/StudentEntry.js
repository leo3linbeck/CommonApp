
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'StudentEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldStudentLastName = {};	// @textField
	var textFieldStudentBirthdate = {};	// @textField
	var textFieldStudentMiddleName = {};	// @textField
	var textFieldStudentFirstName = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	textFieldStudentLastName.change = function textFieldStudentLastName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldStudentBirthdate.change = function textFieldStudentBirthdate_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldStudentMiddleName.change = function textFieldStudentMiddleName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldStudentFirstName.change = function textFieldStudentFirstName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldStudentLastName", "change", textFieldStudentLastName.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentBirthdate", "change", textFieldStudentBirthdate.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentMiddleName", "change", textFieldStudentMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentFirstName", "change", textFieldStudentFirstName.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
