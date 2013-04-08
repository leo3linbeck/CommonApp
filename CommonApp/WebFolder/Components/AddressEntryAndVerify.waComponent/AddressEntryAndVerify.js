
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
	var buttonVerifyAddress = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonVerifyAddress.click = function buttonVerifyAddress_click (event)// @startlock
	{// @endlock
		CommonApp.verifyAddress({
			onSuccess: function(response) {
				if (response) {
					if (!response.success) {
						alert('Address not found');
						$$(getHtmlId('buttonVerifyAddress')).enable();
					}
					else {
						$$(getHtmlId('textFieldZipEntry')).setValue(response.zip9);
						$$(getHtmlId('richTextUSPSLine1')).setValue(response.USPS[0]);
						$$(getHtmlId('richTextUSPSLine2')).setValue(response.USPS[1]);
						$$(getHtmlId('buttonVerifyAddress')).disable();
					}
				}
				else {
					alert('Validation failed');
					$$(getHtmlId('buttonVerifyAddress')).enable();
				}
			},
			onError: function(error) {
				alert('Validation error');
				$$(getHtmlId('buttonVerifyAddress')).enable();
			},
			params: [ {}, true ]
		});
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonVerifyAddress", "click", buttonVerifyAddress.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
