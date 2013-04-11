
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'FatherEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldWorkZipEntry = {};	// @textField
	var textFieldWorkCityEntry = {};	// @textField
	var textFieldWorkAddress2Entry = {};	// @textField
	var textFieldWorkAddress1Entry = {};	// @textField
	var textFieldHomeAddress1Entry = {};	// @textField
	var textFieldHomeCityEntry = {};	// @textField
	var textFieldHomeAddress2Entry = {};	// @textField
	var textFieldFatherSuffix = {};	// @textField
	var textFieldFatherLastName = {};	// @textField
	var textFieldFatherMiddleName = {};	// @textField
	var textFieldFatherFirstName = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	textFieldWorkZipEntry.change = function textFieldWorkZipEntry_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldWorkCityEntry.change = function textFieldWorkCityEntry_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldWorkAddress2Entry.change = function textFieldWorkAddress2Entry_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldWorkAddress1Entry.change = function textFieldWorkAddress1Entry_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldHomeAddress1Entry.change = function textFieldHomeAddress1Entry_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldHomeCityEntry.change = function textFieldHomeCityEntry_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldHomeAddress2Entry.change = function textFieldHomeAddress2Entry_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherSuffix.change = function textFieldFatherSuffix_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherLastName.change = function textFieldFatherLastName_change (event)// @startlock
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
	WAF.addListener(this.id + "_textFieldWorkZipEntry", "change", textFieldWorkZipEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkCityEntry", "change", textFieldWorkCityEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkAddress2Entry", "change", textFieldWorkAddress2Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkAddress1Entry", "change", textFieldWorkAddress1Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomeAddress1Entry", "change", textFieldHomeAddress1Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomeCityEntry", "change", textFieldHomeCityEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomeAddress2Entry", "change", textFieldHomeAddress2Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherSuffix", "change", textFieldFatherSuffix.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherLastName", "change", textFieldFatherLastName.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherMiddleName", "change", textFieldFatherMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherFirstName", "change", textFieldFatherFirstName.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
