
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'ChildEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldChildBirthdate = {};	// @textField
	var textFieldChildMiddleName = {};	// @textField
	var textFieldChildFirstName = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	textFieldChildBirthdate.change = function textFieldChildBirthdate_change (event)// @startlock
	{// @endlock
		familyName = L3.toTitleCase(this.getValue());
		source.familyName.sync();
	};// @lock

	textFieldChildMiddleName.change = function textFieldChildMiddleName_change (event)// @startlock
	{// @endlock
		familyName = L3.toTitleCase(this.getValue());
		source.familyName.sync();
	};// @lock

	textFieldChildFirstName.change = function textFieldChildFirstName_change (event)// @startlock
	{// @endlock
		familyName = L3.toTitleCase(this.getValue());
		source.familyName.sync();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldChildBirthdate", "change", textFieldChildBirthdate.change, "WAF");
	WAF.addListener(this.id + "_textFieldChildMiddleName", "change", textFieldChildMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldChildFirstName", "change", textFieldChildFirstName.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
