
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'FatherEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldWorkStateEntry = {};	// @textField
	var textFieldHomeStateEntry = {};	// @textField
	var textFieldWorkZipCodeEntry = {};	// @textField
	var textFieldHomeZipCodeEntry = {};	// @textField
	var textFieldEmployer = {};	// @textField
	var textFieldOccupation = {};	// @textField
	var checkboxSameAddress = {};	// @checkbox
	var textFieldWorkCityEntry = {};	// @textField
	var textFieldWorkStreet2Entry = {};	// @textField
	var textFieldWorkStreet1Entry = {};	// @textField
	var textFieldHomeStreet1Entry = {};	// @textField
	var textFieldHomeCityEntry = {};	// @textField
	var textFieldHomeStreet2Entry = {};	// @textField
	var textFieldLastName = {};	// @textField
	var textFieldMiddleName = {};	// @textField
	var textFieldFirstName = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	textFieldWorkStateEntry.change = function textFieldWorkStateEntry_change (event)// @startlock
	{// @endlock
		L3.verifyPersonAddress(this);
	};// @lock

	textFieldHomeStateEntry.change = function textFieldHomeStateEntry_change (event)// @startlock
	{// @endlock
		L3.verifyPersonAddress(this);
	};// @lock

	textFieldWorkZipCodeEntry.change = function textFieldWorkZipCodeEntry_change (event)// @startlock
	{// @endlock
		L3.verifyPersonAddress(this);
	};// @lock

	textFieldHomeZipCodeEntry.change = function textFieldHomeZipCodeEntry_change (event)// @startlock
	{// @endlock
		L3.verifyPersonAddress(this);
	};// @lock

	textFieldEmployer.change = function textFieldEmployer_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldOccupation.change = function textFieldOccupation_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	checkboxSameAddress.change = function checkboxSameAddress_change (event)// @startlock
	{// @endlock
		L3.addressesSameAddress(this.getValue(), 'father', 'Home');
	};// @lock

	textFieldWorkCityEntry.change = function textFieldWorkCityEntry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyPersonAddress(this);
	};// @lock

	textFieldWorkStreet2Entry.change = function textFieldWorkStreet2Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyPersonAddress(this);
	};// @lock

	textFieldWorkStreet1Entry.change = function textFieldWorkStreet1Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyPersonAddress(this);
	};// @lock

	textFieldHomeStreet1Entry.change = function textFieldHomeStreet1Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyPersonAddress(this);
	};// @lock

	textFieldHomeCityEntry.change = function textFieldHomeCityEntry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyPersonAddress(this);
	};// @lock

	textFieldHomeStreet2Entry.change = function textFieldHomeStreet2Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyPersonAddress(this);
	};// @lock

	textFieldLastName.change = function textFieldLastName_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldMiddleName.change = function textFieldMiddleName_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldFirstName.change = function textFieldFirstName_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldWorkStateEntry", "change", textFieldWorkStateEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomeStateEntry", "change", textFieldHomeStateEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkZipCodeEntry", "change", textFieldWorkZipCodeEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomeZipCodeEntry", "change", textFieldHomeZipCodeEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldEmployer", "change", textFieldEmployer.change, "WAF");
	WAF.addListener(this.id + "_textFieldOccupation", "change", textFieldOccupation.change, "WAF");
	WAF.addListener(this.id + "_checkboxSameAddress", "change", checkboxSameAddress.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkCityEntry", "change", textFieldWorkCityEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkStreet2Entry", "change", textFieldWorkStreet2Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkStreet1Entry", "change", textFieldWorkStreet1Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomeStreet1Entry", "change", textFieldHomeStreet1Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomeCityEntry", "change", textFieldHomeCityEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomeStreet2Entry", "change", textFieldHomeStreet2Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldLastName", "change", textFieldLastName.change, "WAF");
	WAF.addListener(this.id + "_textFieldMiddleName", "change", textFieldMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldFirstName", "change", textFieldFirstName.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
