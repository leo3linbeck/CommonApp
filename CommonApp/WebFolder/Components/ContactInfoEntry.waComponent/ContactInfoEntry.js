
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
	WAF.addListener(this.id + "_textFieldStudentEmail", "change", textFieldStudentEmail.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentCellPhone", "change", textFieldStudentCellPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentWorkPhone", "change", textFieldStudentWorkPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentHomePhone", "change", textFieldStudentHomePhone.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
