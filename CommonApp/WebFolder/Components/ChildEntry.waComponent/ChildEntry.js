
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'ChildEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldChildSuffix = {};	// @textField
	var textFieldChildLastName = {};	// @textField
	var textFieldChildAge = {};	// @textField
	var textFieldChildBirthdate = {};	// @textField
	var textFieldChildMiddleName = {};	// @textField
	var textFieldChildFirstName = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	textFieldChildSuffix.change = function textFieldChildSuffix_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldChildLastName.change = function textFieldChildLastName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldChildAge.change = function textFieldChildAge_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldChildBirthdate.change = function textFieldChildBirthdate_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldChildMiddleName.change = function textFieldChildMiddleName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldChildFirstName.change = function textFieldChildFirstName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldChildSuffix", "change", textFieldChildSuffix.change, "WAF");
	WAF.addListener(this.id + "_textFieldChildLastName", "change", textFieldChildLastName.change, "WAF");
	WAF.addListener(this.id + "_textFieldChildAge", "change", textFieldChildAge.change, "WAF");
	WAF.addListener(this.id + "_textFieldChildBirthdate", "change", textFieldChildBirthdate.change, "WAF");
	WAF.addListener(this.id + "_textFieldChildMiddleName", "change", textFieldChildMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldChildFirstName", "change", textFieldChildFirstName.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
