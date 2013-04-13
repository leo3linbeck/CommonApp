
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'ContactInfo';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var comboboxContactFor = {};	// @combobox
	var textFieldOtherCellPhone = {};	// @textField
	var textFieldOtherWorkPhone = {};	// @textField
	var textFieldOtherHomePhone = {};	// @textField
	var textFieldOtherEmail = {};	// @textField
	var textFieldGuardianCellPhone = {};	// @textField
	var textFieldGuardianWorkPhone = {};	// @textField
	var textFieldGuardianHomePhone = {};	// @textField
	var textFieldGuardianEmail = {};	// @textField
	var textFieldMotherCellPhone = {};	// @textField
	var textFieldMotherWorkPhone = {};	// @textField
	var textFieldMotherHomePhone = {};	// @textField
	var textFieldMotherEmail = {};	// @textField
	var textFieldFatherCellPhone = {};	// @textField
	var textFieldFatherWorkPhone = {};	// @textField
	var textFieldFatherHomePhone = {};	// @textField
	var textFieldFatherEmail = {};	// @textField
	var textFieldStudentEmail = {};	// @textField
	var textFieldStudentCellPhone = {};	// @textField
	var textFieldStudentWorkPhone = {};	// @textField
	var textFieldStudentHomePhone = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	comboboxContactFor.change = function comboboxContactFor_change (event)// @startlock
	{// @endlock
		var v = $$(getHtmlId('comboboxContactFor')).getValue();
		['Student','Father','Mother','Guardian','Other'].forEach(
			function(e) {
				if (v === e) {
					$$(getHtmlId('container' + e)).show();
				}
				else {
					$$(getHtmlId('container' + e)).hide();
				}
			});
	};// @lock

	textFieldOtherCellPhone.change = function textFieldOtherCellPhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldOtherWorkPhone.change = function textFieldOtherWorkPhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldOtherHomePhone.change = function textFieldOtherHomePhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldOtherEmail.change = function textFieldOtherEmail_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldGuardianCellPhone.change = function textFieldGuardianCellPhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldGuardianWorkPhone.change = function textFieldGuardianWorkPhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldGuardianHomePhone.change = function textFieldGuardianHomePhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldGuardianEmail.change = function textFieldGuardianEmail_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldMotherCellPhone.change = function textFieldMotherCellPhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldMotherWorkPhone.change = function textFieldMotherWorkPhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldMotherHomePhone.change = function textFieldMotherHomePhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldMotherEmail.change = function textFieldMotherEmail_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherCellPhone.change = function textFieldFatherCellPhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherWorkPhone.change = function textFieldFatherWorkPhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherHomePhone.change = function textFieldFatherHomePhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldFatherEmail.change = function textFieldFatherEmail_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldStudentEmail.change = function textFieldStudentEmail_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldStudentCellPhone.change = function textFieldStudentCellPhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldStudentWorkPhone.change = function textFieldStudentWorkPhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	textFieldStudentHomePhone.change = function textFieldStudentHomePhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_comboboxContactFor", "change", comboboxContactFor.change, "WAF");
	WAF.addListener(this.id + "_textFieldOtherCellPhone", "change", textFieldOtherCellPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldOtherWorkPhone", "change", textFieldOtherWorkPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldOtherHomePhone", "change", textFieldOtherHomePhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldOtherEmail", "change", textFieldOtherEmail.change, "WAF");
	WAF.addListener(this.id + "_textFieldGuardianCellPhone", "change", textFieldGuardianCellPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldGuardianWorkPhone", "change", textFieldGuardianWorkPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldGuardianHomePhone", "change", textFieldGuardianHomePhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldGuardianEmail", "change", textFieldGuardianEmail.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherCellPhone", "change", textFieldMotherCellPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherWorkPhone", "change", textFieldMotherWorkPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherHomePhone", "change", textFieldMotherHomePhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldMotherEmail", "change", textFieldMotherEmail.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherCellPhone", "change", textFieldFatherCellPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherWorkPhone", "change", textFieldFatherWorkPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherHomePhone", "change", textFieldFatherHomePhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldFatherEmail", "change", textFieldFatherEmail.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentEmail", "change", textFieldStudentEmail.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentCellPhone", "change", textFieldStudentCellPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentWorkPhone", "change", textFieldStudentWorkPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentHomePhone", "change", textFieldStudentHomePhone.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
