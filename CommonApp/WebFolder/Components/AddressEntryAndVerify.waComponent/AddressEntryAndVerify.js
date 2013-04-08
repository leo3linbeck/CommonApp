
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
		homeCity = L3.toTitleCase(this.getValue());
		source.homeCity.sync();
	};// @lock

	textFieldStreet2Entry.change = function textFieldStreet2Entry_change (event)// @startlock
	{// @endlock
		homeAddress2 = L3.toTitleCase(this.getValue());
		source.homeAddress2.sync();
	};// @lock

	textFieldStreet1Entry.change = function textFieldStreet1Entry_change (event)// @startlock
	{// @endlock
		homeAddress1 = L3.toTitleCase(this.getValue());
		source.homeAddress1.sync();
	};// @lock

	buttonVerifyAddress.click = function buttonVerifyAddress_click (event)// @startlock
	{// @endlock
		CommonApp.verifyAddressAsync({
			onSuccess: function(response) {
				if (response) {
					if (!response.success) {
						alert('Address not found');
					}
					else {
						$$(getHtmlId('textFieldZipEntry')).setValue(response.fullAddress.components.zipcode + '-' + response.fullAddress.components.plus4_code);
						$$(getHtmlId('richTextUSPSLine1')).setValue(response.USPS[0]);
						$$(getHtmlId('richTextUSPSLine2')).setValue(response.USPS[1]);
					}
				}
				else {
					alert('Validation failed');
				}
			},
			onError: function(error) {
				alert('Validation error');
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
