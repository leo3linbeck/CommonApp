
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'ContactInfo';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldStudentHomePhone = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	textFieldStudentHomePhone.change = function textFieldStudentHomePhone_change (event)// @startlock
	{// @endlock
		L3.convertToTitleCase(this);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldStudentHomePhone", "change", textFieldStudentHomePhone.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
