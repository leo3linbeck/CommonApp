
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'FamilyTreeEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var comboboxLanguageSpokenAtHome = {};	// @combobox
	var comboboxNativeLanguage = {};	// @combobox
	var comboboxFatherStatus = {};	// @combobox
	var comboboxMotherStatus = {};	// @combobox
	// @endregion// @endlock

	function updateCustody() {
		var m = $$(getHtmlId('comboboxMotherStatus')).getValue();
		var f = $$(getHtmlId('comboboxFatherStatus')).getValue();
		if ((m === 'Divorced') || (f === 'Divorced') || (m === 'Divorced') || (f === 'Divorced')) {
			$$(getHtmlId('comboboxChildCustody')).show()
		}
		else {
			$$(getHtmlId('comboboxChildCustody')).hide()
		}
	}
	// eventHandlers// @lock

	comboboxLanguageSpokenAtHome.change = function comboboxLanguageSpokenAtHome_change (event)// @startlock
	{// @endlock
		updateCustody();
	};// @lock

	comboboxNativeLanguage.change = function comboboxNativeLanguage_change (event)// @startlock
	{// @endlock
		updateCustody();
	};// @lock

	comboboxFatherStatus.change = function comboboxFatherStatus_change (event)// @startlock
	{// @endlock
		updateCustody();
	};// @lock

	comboboxMotherStatus.change = function comboboxMotherStatus_change (event)// @startlock
	{// @endlock
		updateCustody();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_comboboxLanguageSpokenAtHome", "change", comboboxLanguageSpokenAtHome.change, "WAF");
	WAF.addListener(this.id + "_comboboxNativeLanguage", "change", comboboxNativeLanguage.change, "WAF");
	WAF.addListener(this.id + "_comboboxFatherStatus", "change", comboboxFatherStatus.change, "WAF");
	WAF.addListener(this.id + "_comboboxMotherStatus", "change", comboboxMotherStatus.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
