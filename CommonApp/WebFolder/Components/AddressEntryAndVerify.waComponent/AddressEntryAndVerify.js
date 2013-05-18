
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'AddressEntryAndVerify';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldMainStateEntry = {};	// @textField
	var textFieldMainZipCodeEntry = {};	// @textField
	var textFieldMainCityEntry = {};	// @textField
	var textFieldMainStreet2Entry = {};	// @textField
	var textFieldMainStreet1Entry = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	textFieldMainStateEntry.change = function textFieldMainStateEntry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToUpperCase(this);
		L3.verifyAddress(this);
	};// @lock

	textFieldMainZipCodeEntry.change = function textFieldMainZipCodeEntry_change (event)// @startlock
	{// @endlock
		L3.verifyAddress(this);
	};// @lock

	textFieldMainCityEntry.change = function textFieldMainCityEntry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyAddress(this);
	};// @lock

	textFieldMainStreet2Entry.change = function textFieldMainStreet2Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyAddress(this);
	};// @lock

	textFieldMainStreet1Entry.change = function textFieldMainStreet1Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyAddress(this);
	};// @lock
	

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldMainStateEntry", "change", textFieldMainStateEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldMainZipCodeEntry", "change", textFieldMainZipCodeEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldMainCityEntry", "change", textFieldMainCityEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldMainStreet2Entry", "change", textFieldMainStreet2Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldMainStreet1Entry", "change", textFieldMainStreet1Entry.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
