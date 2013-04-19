
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'AddressEntryAndVerify';
	// @endregion// @endlock

	var $sources = $comp.sources;
	var $sourcesVar = $comp.sourcesVar;
	
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
		$$(getHtmlId('buttonVerifyAddress')).enable();
		
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
		$$(getHtmlId('textFieldStreet1Entry')).setValue('2407 Reba');
		$$(getHtmlId('textFieldStreet2Entry')).setValue('');
		$$(getHtmlId('textFieldCityEntry')).setValue('Houston');
		$$(getHtmlId('textFieldZipCodeEntry')).setValue('77019');
	};// @lock

	textFieldCityEntry.change = function textFieldCityEntry_change (event)// @startlock
	{// @endlock
		unverifyAddress();
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldStreet2Entry.change = function textFieldStreet2Entry_change (event)// @startlock
	{// @endlock
		unverifyAddress();
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldStreet1Entry.change = function textFieldStreet1Entry_change (event)// @startlock
	{// @endlock
		unverifyAddress();
		L3.convertAttributeToTitleCase(this);
	};// @lock
	

	buttonVerifyAddress.click = function buttonVerifyAddress_click (event)// @startlock
	{// @endlock
		$comp.sources.selectedFamily.addressLookup(
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
						$comp.sources.selectedFamily.serverRefresh({forceReload: true});
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
