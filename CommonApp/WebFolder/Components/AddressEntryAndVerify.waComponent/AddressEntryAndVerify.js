
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
	var textFieldCityEntry = {};	// @textField
	var textFieldStreet2Entry = {};	// @textField
	var textFieldStreet1Entry = {};	// @textField
	var buttonVerifyAddress = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

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
		CommonApp.verifyAddressAsync({
			onSuccess: function(response) {
				if (response) {
					if (!response.success) {
						alert('Address not found');
						L3.currentAddress = null;
					}
					else {
						L3.currentAddress = response.fullAddress;
						$$(getHtmlId('textFieldZipEntry')).setValue(response.fullAddress.components.zipcode + '-' + response.fullAddress.components.plus4_code);
						$$(getHtmlId('richTextUSPSLine1')).setValue(response.USPS[0]);
						$$(getHtmlId('richTextUSPSLine2')).setValue(response.USPS[1]);
					}
				}
				else {
					alert('Validation failed');
					L3.currentAddress = null;
				}
			},
			onError: function(error) {
				alert('Validation error');
				L3.currentAddress = null;
			},
			params: [ {	addr1: $$(getHtmlId('textFieldStreet1Entry')).getValue(),
						addr2: $$(getHtmlId('textFieldStreet2Entry')).getValue(),
						city: $$(getHtmlId('textFieldCityEntry')).getValue(),
						zip: $$(getHtmlId('textFieldZipEntry')).getValue() }, false ]
		});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldCityEntry", "change", textFieldCityEntry.change, "WAF");
	WAF.addListener(this.id + "_textFieldStreet2Entry", "change", textFieldStreet2Entry.change, "WAF");
	WAF.addListener(this.id + "_textFieldStreet1Entry", "change", textFieldStreet1Entry.change, "WAF");
	WAF.addListener(this.id + "_buttonVerifyAddress", "click", buttonVerifyAddress.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
