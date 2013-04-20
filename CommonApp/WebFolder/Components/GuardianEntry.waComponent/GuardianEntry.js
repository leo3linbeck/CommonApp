
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'GuardianEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldRelationship = {};	// @textField
	var textFieldWorkCityEntry = {};	// @textField
	var textFieldWorkAddress2Entry = {};	// @textField
	var textFieldWorkAddress1Entry = {};	// @textField
	var checkboxSameAddress = {};	// @checkbox
	var textFieldHomeAddress1Entry = {};	// @textField
	var textFieldHomeCityEntry = {};	// @textField
	var textFieldHomeAddress2Entry = {};	// @textField
	var textFieldLastName = {};	// @textField
	var textFieldMiddleName = {};	// @textField
	var textFieldFirstName = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	textFieldRelationship.change = function textFieldRelationship_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldWorkCityEntry.change = function textFieldWorkCityEntry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldWorkAddress2Entry.change = function textFieldWorkAddress2Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldWorkAddress1Entry.change = function textFieldWorkAddress1Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	checkboxSameAddress.change = function checkboxSameAddress_change (event)// @startlock
	{// @endlock
		if(this.getValue()) {
			sources.guardian.getAttribute('homeStreet1').setValue(sources.family.mainStreet1);
			sources.guardian.getAttribute('homeStreet2').setValue(sources.family.mainStreet2);
			sources.guardian.getAttribute('homeCity').setValue(sources.family.mainCity);
			sources.guardian.getAttribute('homeState').setValue(sources.family.mainState);
			sources.guardian.getAttribute('homeZipCode').setValue(sources.family.mainZipCode);
		}
	};// @lock

	textFieldHomeAddress1Entry.change = function textFieldHomeAddress1Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldHomeCityEntry.change = function textFieldHomeCityEntry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldHomeAddress2Entry.change = function textFieldHomeAddress2Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
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
	WAF.addListener(this.id + "_textFieldRelationship", "change", textFieldRelationship.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkCityEntry", "change", textFieldWorkCityEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkAddress2Entry", "change", textFieldWorkAddress2Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkAddress1Entry", "change", textFieldWorkAddress1Entry.change, "WAF");
	WAF.addListener(this.id + "_checkboxSameAddress", "change", checkboxSameAddress.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomeAddress1Entry", "change", textFieldHomeAddress1Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomeCityEntry", "change", textFieldHomeCityEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomeAddress2Entry", "change", textFieldHomeAddress2Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldLastName", "change", textFieldLastName.change, "WAF");
	WAF.addListener(this.id + "_textFieldMiddleName", "change", textFieldMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldFirstName", "change", textFieldFirstName.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
