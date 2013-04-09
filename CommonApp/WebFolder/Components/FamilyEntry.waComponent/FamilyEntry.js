
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'FamilyEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldGuardianMiddleName = {};	// @textField
	var textFieldGuardianFirstName = {};	// @textField
	var textFieldMotherMiddleName = {};	// @textField
	var textFieldMotherFirstName = {};	// @textField
	var textFieldFatherMiddleName = {};	// @textField
	var textFieldFatherFirstName = {};	// @textField
	var textFieldChildMiddleName = {};	// @textField
	var textFieldChildFirstName = {};	// @textField
	var textFieldFamilyName = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	textFieldGuardianMiddleName.change = function textFieldGuardianMiddleName_change (event)// @startlock
	{// @endlock
		familyName = L3.toTitleCase(this.getValue());
		source.familyName.sync();
	};// @lock

	textFieldGuardianFirstName.change = function textFieldGuardianFirstName_change (event)// @startlock
	{// @endlock
		familyName = L3.toTitleCase(this.getValue());
		source.familyName.sync();
	};// @lock

	textFieldMotherMiddleName.change = function textFieldMotherMiddleName_change (event)// @startlock
	{// @endlock
		familyName = L3.toTitleCase(this.getValue());
		source.familyName.sync();
	};// @lock

	textFieldMotherFirstName.change = function textFieldMotherFirstName_change (event)// @startlock
	{// @endlock
		familyName = L3.toTitleCase(this.getValue());
		source.familyName.sync();
	};// @lock

	textFieldFatherMiddleName.change = function textFieldFatherMiddleName_change (event)// @startlock
	{// @endlock
		familyName = L3.toTitleCase(this.getValue());
		source.familyName.sync();
	};// @lock

	textFieldFatherFirstName.change = function textFieldFatherFirstName_change (event)// @startlock
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

	textFieldFamilyName.change = function textFieldFamilyName_change (event)// @startlock
	{// @endlock
		familyName = L3.toTitleCase(this.getValue());
		source.familyName.sync();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldGuardianMiddleName", "change", textFieldGuardianMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldGuardianFirstName", "change", textFieldGuardianFirstName.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherMiddleName", "change", textFieldMotherMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherFirstName", "change", textFieldMotherFirstName.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherMiddleName", "change", textFieldFatherMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherFirstName", "change", textFieldFatherFirstName.change, "WAF");
	WAF.addListener(this.id + "_textFieldChildMiddleName", "change", textFieldChildMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldChildFirstName", "change", textFieldChildFirstName.change, "WAF");
	WAF.addListener(this.id + "_textFieldFamilyName", "change", textFieldFamilyName.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
