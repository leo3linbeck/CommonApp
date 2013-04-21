
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

	function verifyAddress(role, location) {
		sources[role].addressLookup(
			{
				location: location.toLowerCase(),
				street1: $$(getHtmlId('textField' + location + 'Street1Entry')).getValue(),
				street2: $$(getHtmlId('textField' + location + 'Street2Entry')).getValue(),
				city: $$(getHtmlId('textField' + location + 'CityEntry')).getValue(),
				zipCode: $$(getHtmlId('textField' + location + 'ZipCodeEntry')).getValue(),
				debug: false 
			},
			{
				onSuccess: function(event) {
					console.log('buttonVerify' + location + 'Address.click', event);
					if (event.result && event.result.success) {
						sources[role].serverRefresh({forceReload: true});
						$$(getHtmlId('buttonVerify' + location + 'Address')).disable();
					}
					else {
						$$(getHtmlId('buttonVerify' + location + 'Address')).enable();
					}
				},
				onError: function(error) {
					console.log('ERROR: buttonVerify' + location + 'Address.click', error);
					$$(getHtmlId('buttonVerify' + location + 'Address')).enable();
				}
			}
		);
	}

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'FatherEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldWorkZipEntry = {};	// @textField
	var textFieldHomeZipEntry = {};	// @textField
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

	textFieldWorkZipEntry.change = function textFieldWorkZipEntry_change (event)// @startlock
	{// @endlock
		$$(getHtmlId('buttonVerifyWorkAddress')).enable();
	};// @lock

	textFieldHomeZipEntry.change = function textFieldHomeZipEntry_change (event)// @startlock
	{// @endlock
		$$(getHtmlId('buttonVerifyHomeAddress')).enable();
	};// @lock

	buttonVerifyWorkAddress.click = function buttonVerifyWorkAddress_click (event)// @startlock
	{// @endlock
		verifyAddress('father', 'Work');
	};// @lock

	buttonVerifyHomeAddress.click = function buttonVerifyHomeAddress_click (event)// @startlock
	{// @endlock
		verifyAddress('father', 'Home');
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
			sources.father.getAttribute('homeUSPSLine1').setValue(sources.family.uspsLine1);
			sources.father.getAttribute('homeUSPSLine2').setValue(sources.family.uspsLine2);
			sources.father.getAttribute('homeUSPSDeliveryPoint').setValue(sources.family.uspsDeliveryPoint);
			sources.father.getAttribute('homeMapCoords').setValue(sources.family.mapCoords);
		}
	};// @lock

	textFieldWorkCityEntry.change = function textFieldWorkCityEntry_change (event)// @startlock
	{// @endlock
		$$(getHtmlId('buttonVerifyWorkAddress')).enable();
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldWorkAddress2Entry.change = function textFieldWorkAddress2Entry_change (event)// @startlock
	{// @endlock
		$$(getHtmlId('buttonVerifyWorkAddress')).enable();
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldWorkAddress1Entry.change = function textFieldWorkAddress1Entry_change (event)// @startlock
	{// @endlock
		$$(getHtmlId('buttonVerifyWorkAddress')).enable();
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldHomeAddress1Entry.change = function textFieldHomeAddress1Entry_change (event)// @startlock
	{// @endlock
		$$(getHtmlId('buttonVerifyHomeAddress')).enable();
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldHomeCityEntry.change = function textFieldHomeCityEntry_change (event)// @startlock
	{// @endlock
		$$(getHtmlId('buttonVerifyHomeAddress')).enable();
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldHomeAddress2Entry.change = function textFieldHomeAddress2Entry_change (event)// @startlock
	{// @endlock
		$$(getHtmlId('buttonVerifyHomeAddress')).enable();
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
	WAF.addListener(this.id + "_textFieldWorkZipEntry", "change", textFieldWorkZipEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomeZipEntry", "change", textFieldHomeZipEntry.change, "WAF");
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
