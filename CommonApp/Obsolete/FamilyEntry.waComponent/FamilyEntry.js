
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'FamilyEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldGuardianZip = {};	// @textField
	var textFieldMotherZip = {};	// @textField
	var textFieldFatherZip = {};	// @textField
	var textFieldFatherCity = {};	// @textField
	var textFieldMotherCity = {};	// @textField
	var textFieldGuardianCity = {};	// @textField
	var textFieldFatherAddress2 = {};	// @textField
	var textFieldMotherAddress2 = {};	// @textField
	var textFieldGuardianAddress2 = {};	// @textField
	var textFieldGuardianAddress1 = {};	// @textField
	var textFieldMotherAddress1 = {};	// @textField
	var textFieldFatherStreet = {};	// @textField
	var textFieldMotherFirstName = {};	// @textField
	var textFieldGuardianLastName = {};	// @textField
	var textFieldMotherLastName = {};	// @textField
	var textFieldFatherLastName = {};	// @textField
	var textFieldGuardianMiddleName = {};	// @textField
	var textFieldGuardianFirstName = {};	// @textField
	var textFieldMotherMiddleName = {};	// @textField
	var textFieldFatherMiddleName = {};	// @textField
	var textFieldFatherFirstName = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	textFieldGuardianZip.change = function textFieldGuardianZip_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldMotherZip.change = function textFieldMotherZip_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherZip.change = function textFieldFatherZip_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherCity.change = function textFieldFatherCity_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldMotherCity.change = function textFieldMotherCity_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldGuardianCity.change = function textFieldGuardianCity_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherAddress2.change = function textFieldFatherAddress2_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldMotherAddress2.change = function textFieldMotherAddress2_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldGuardianAddress2.change = function textFieldGuardianAddress2_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldGuardianAddress1.change = function textFieldGuardianAddress1_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldMotherAddress1.change = function textFieldMotherAddress1_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherStreet.change = function textFieldFatherStreet_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldMotherFirstName.change = function textFieldMotherFirstName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldGuardianLastName.change = function textFieldGuardianLastName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldMotherLastName.change = function textFieldMotherLastName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherLastName.change = function textFieldFatherLastName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldGuardianMiddleName.change = function textFieldGuardianMiddleName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldGuardianFirstName.change = function textFieldGuardianFirstName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldMotherMiddleName.change = function textFieldMotherMiddleName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherMiddleName.change = function textFieldFatherMiddleName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherFirstName.change = function textFieldFatherFirstName_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldGuardianZip", "change", textFieldGuardianZip.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherZip", "change", textFieldMotherZip.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherZip", "change", textFieldFatherZip.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherCity", "change", textFieldFatherCity.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherCity", "change", textFieldMotherCity.change, "WAF");
	WAF.addListener(this.id + "_textFieldGuardianCity", "change", textFieldGuardianCity.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherAddress2", "change", textFieldFatherAddress2.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherAddress2", "change", textFieldMotherAddress2.change, "WAF");
	WAF.addListener(this.id + "_textFieldGuardianAddress2", "change", textFieldGuardianAddress2.change, "WAF");
	WAF.addListener(this.id + "_textFieldGuardianAddress1", "change", textFieldGuardianAddress1.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherAddress1", "change", textFieldMotherAddress1.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherStreet", "change", textFieldFatherStreet.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherFirstName", "change", textFieldMotherFirstName.change, "WAF");
	WAF.addListener(this.id + "_textFieldGuardianLastName", "change", textFieldGuardianLastName.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherLastName", "change", textFieldMotherLastName.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherLastName", "change", textFieldFatherLastName.change, "WAF");
	WAF.addListener(this.id + "_textFieldGuardianMiddleName", "change", textFieldGuardianMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldGuardianFirstName", "change", textFieldGuardianFirstName.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherMiddleName", "change", textFieldMotherMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherMiddleName", "change", textFieldFatherMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherFirstName", "change", textFieldFatherFirstName.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
