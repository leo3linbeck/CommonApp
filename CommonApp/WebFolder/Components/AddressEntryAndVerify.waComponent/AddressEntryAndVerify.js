
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
	var buttonSelectFamily = {};	// @button
	var textFieldCityEntry = {};	// @textField
	var textFieldStreet2Entry = {};	// @textField
	var textFieldStreet1Entry = {};	// @textField
	var buttonVerifyAddress = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonSelectFamily.click = function buttonSelectFamily_click (event)// @startlock
	{// @endlock
		sources.family.name = '';
		$$(getHtmlId("dialogSelectFamily")).closeDialog(); //ok button
	};// @lock

	textFieldCityEntry.change = function textFieldCityEntry_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldStreet2Entry.change = function textFieldStreet2Entry_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldStreet1Entry.change = function textFieldStreet1Entry_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock
	

	buttonVerifyAddress.click = function buttonVerifyAddress_click (event)// @startlock
	{// @endlock
		sources.family.addressLookup(
			{	street1: $$(getHtmlId('textFieldStreet1Entry')).getValue(),
				street2: $$(getHtmlId('textFieldStreet2Entry')).getValue(),
				city: $$(getHtmlId('textFieldCityEntry')).getValue(),
				zip: $$(getHtmlId('textFieldZipEntry')).getValue(),
				debug: false 
			},
			{
				onSuccess: function(response) {
					var r = response.result;

					if (response.result) {
						sources.family.setEntityCollection(response.result);
						sources.family.autoDispatch();
						$$(getHtmlId('dialogSelectFamily')).displayDialog();
						$$(getHtmlId('textFieldZipEntry')).setValue(sources.family.homeZipCode);
						$$(getHtmlId('richTextUSPSLine1')).setValue(sources.family.uspsLine1);
						$$(getHtmlId('richTextUSPSLine2')).setValue(sources.family.uspsLine2);
					}
					else {
						$$(getHtmlId('richTextVerifyAddressError')).setValue('Validation failed!');
					}
				},
				onError: function(error) {
					$$(getHtmlId('richTextVerifyAddressError')).setValue(error.message);
				}
			}
		);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonSelectFamily", "click", buttonSelectFamily.click, "WAF");
	WAF.addListener(this.id + "_textFieldCityEntry", "change", textFieldCityEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldStreet2Entry", "change", textFieldStreet2Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldStreet1Entry", "change", textFieldStreet1Entry.change, "WAF");
	WAF.addListener(this.id + "_buttonVerifyAddress", "click", buttonVerifyAddress.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
