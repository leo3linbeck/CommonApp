
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'AddressEntryAndVerify';
	// @endregion// @endlock

//	localization.changeLanguage($$('comboboxLanguage').getValue());

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldZipCodeEntry = {};	// @textField
	var richTextStepTitle = {};	// @richText
	var textFieldCityEntry = {};	// @textField
	var textFieldStreet2Entry = {};	// @textField
	var textFieldStreet1Entry = {};	// @textField
	var buttonVerifyAddress = {};	// @button
	// @endregion// @endlock

	function unverifyAddress() {
		$$('buttonNextStep').disable();
		$$(getHtmlId('richTextUSPSLine1')).setValue('');
		$$(getHtmlId('richTextUSPSLine2')).setValue('');
		$$(getHtmlId('richTextVerifyAddressError')).setValue('');
	}

	// eventHandlers// @lock

	textFieldZipCodeEntry.change = function textFieldZipCodeEntry_change (event)// @startlock
	{// @endlock
		unverifyAddress();
	};// @lock

	richTextStepTitle.click = function richTextStepTitle_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('textFieldStreet1Entry')).setValue('2132 Rice Blvd');
		$$(getHtmlId('textFieldStreet2Entry')).setValue('');
		$$(getHtmlId('textFieldCityEntry')).setValue('Houston');
		$$(getHtmlId('textFieldZipCodeEntry')).setValue('77005');
	};// @lock

	textFieldCityEntry.change = function textFieldCityEntry_change (event)// @startlock
	{// @endlock
		unverifyAddress();
		L3.convertToTitleCase(this);
	};// @lock

	textFieldStreet2Entry.change = function textFieldStreet2Entry_change (event)// @startlock
	{// @endlock
		unverifyAddress();
		L3.convertToTitleCase(this);
	};// @lock

	textFieldStreet1Entry.change = function textFieldStreet1Entry_change (event)// @startlock
	{// @endlock
		unverifyAddress();
		L3.convertToTitleCase(this);
	};// @lock
	

	buttonVerifyAddress.click = function buttonVerifyAddress_click (event)// @startlock
	{// @endlock
		sources.family.addressLookup(
			{	street1: $$(getHtmlId('textFieldStreet1Entry')).getValue(),
				street2: $$(getHtmlId('textFieldStreet2Entry')).getValue(),
				city: $$(getHtmlId('textFieldCityEntry')).getValue(),
				zipCode: $$(getHtmlId('textFieldZipCodeEntry')).getValue(),
				debug: false 
			},
			{
				onSuccess: function(response) {
					var r = response.result;

					if (response.result) {
						sources.family.setEntityCollection(response.result);
						$$(getHtmlId('textFieldZipCodeEntry')).setValue(sources.family.mainZipCode);
						$$(getHtmlId('richTextUSPSLine1')).setValue(sources.family.uspsLine1);
						$$(getHtmlId('richTextUSPSLine2')).setValue(sources.family.uspsLine2);
						$$('buttonNextStep').enable();
					}
					else {
						unverifyAddress();
						$$(getHtmlId('richTextVerifyAddressError')).setValue('Validation failed!');
					}
				},
				onError: function(error) {
					unverifyAddress();
					$$(getHtmlId('richTextVerifyAddressError')).setValue(JSON.stringify(error));
				}
			}
		);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldZipCodeEntry", "change", textFieldZipCodeEntry.change, "WAF");
	WAF.addListener(this.id + "_richTextStepTitle", "click", richTextStepTitle.click, "WAF");
	WAF.addListener(this.id + "_textFieldCityEntry", "change", textFieldCityEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldStreet2Entry", "change", textFieldStreet2Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldStreet1Entry", "change", textFieldStreet1Entry.change, "WAF");
	WAF.addListener(this.id + "_buttonVerifyAddress", "click", buttonVerifyAddress.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
