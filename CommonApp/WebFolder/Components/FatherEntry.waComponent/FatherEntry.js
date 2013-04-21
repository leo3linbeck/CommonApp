
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'FatherEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonVerifyWorkAddress = {};	// @button
	var buttonVerifyHomeAddress = {};	// @button
	var textFieldEmployer = {};	// @textField
	var textFieldOccupation = {};	// @textField
	var checkboxSameAddress = {};	// @checkbox
	var textFieldWorkCityEntry = {};	// @textField
	var textFieldWorkAddress2Entry = {};	// @textField
	var textFieldWorkAddress1Entry = {};	// @textField
	var textFieldHomeAddress1Entry = {};	// @textField
	var textFieldHomeCityEntry = {};	// @textField
	var textFieldHomeAddress2Entry = {};	// @textField
	var textFieldLastName = {};	// @textField
	var textFieldMiddleName = {};	// @textField
	var textFieldFirstName = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonVerifyWorkAddress.click = function buttonVerifyWorkAddress_click (event)// @startlock
	{// @endlock
		sources.family.addressLookup(
			{
				street1: $$(getHtmlId('textFieldStreet1Entry')).getValue(),
				street2: $$(getHtmlId('textFieldStreet2Entry')).getValue(),
				city: $$(getHtmlId('textFieldCityEntry')).getValue(),
				zipCode: $$(getHtmlId('textFieldZipCodeEntry')).getValue(),
				debug: false 
			},
			{
				onSuccess: function(event) {
					console.log('buttonVerifyAddress.click', event);
					if (event.result && event.result.success) {
						sources.family.serverRefresh({forceReload: true});
						$$('buttonNextStep').enable();
						$$(getHtmlId('buttonVerifyAddress')).disable();
					}
					else {
						unverifyAddress();
						$$(getHtmlId('richTextVerifyAddressError')).setValue('Validation failed!');
					}
				},
				onError: function(error) {
					console.log('ERROR: buttonVerifyAddress.click', error);
					unverifyAddress();
				}
			}
		);
	};// @lock

	buttonVerifyHomeAddress.click = function buttonVerifyHomeAddress_click (event)// @startlock
	{// @endlock
		sources.family.addressLookup(
			{
				street1: $$(getHtmlId('textFieldStreet1Entry')).getValue(),
				street2: $$(getHtmlId('textFieldStreet2Entry')).getValue(),
				city: $$(getHtmlId('textFieldCityEntry')).getValue(),
				zipCode: $$(getHtmlId('textFieldZipCodeEntry')).getValue(),
				debug: false 
			},
			{
				onSuccess: function(event) {
					console.log('buttonVerifyAddress.click', event);
					if (event.result && event.result.success) {
						sources.family.serverRefresh({forceReload: true});
						$$('buttonNextStep').enable();
						$$(getHtmlId('buttonVerifyAddress')).disable();
					}
					else {
						unverifyAddress();
						$$(getHtmlId('richTextVerifyAddressError')).setValue('Validation failed!');
					}
				},
				onError: function(error) {
					console.log('ERROR: buttonVerifyAddress.click', error);
					unverifyAddress();
				}
			}
		);
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
		if(this.getValue()) {
			sources.father.getAttribute('homeStreet1').setValue(sources.family.mainStreet1);
			sources.father.getAttribute('homeStreet2').setValue(sources.family.mainStreet2);
			sources.father.getAttribute('homeCity').setValue(sources.family.mainCity);
			sources.father.getAttribute('homeState').setValue(sources.family.mainState);
			sources.father.getAttribute('homeZipCode').setValue(sources.family.mainZipCode);
		}
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
	WAF.addListener(this.id + "_buttonVerifyWorkAddress", "click", buttonVerifyWorkAddress.click, "WAF");
	WAF.addListener(this.id + "_buttonVerifyHomeAddress", "click", buttonVerifyHomeAddress.click, "WAF");
	WAF.addListener(this.id + "_textFieldEmployer", "change", textFieldEmployer.change, "WAF");
	WAF.addListener(this.id + "_textFieldOccupation", "change", textFieldOccupation.change, "WAF");
	WAF.addListener(this.id + "_checkboxSameAddress", "change", checkboxSameAddress.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkCityEntry", "change", textFieldWorkCityEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkAddress2Entry", "change", textFieldWorkAddress2Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkAddress1Entry", "change", textFieldWorkAddress1Entry.change, "WAF");
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
