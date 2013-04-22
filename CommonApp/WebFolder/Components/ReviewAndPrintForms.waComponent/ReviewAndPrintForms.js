
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'ReviewAndPrintForms';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonPrintForms = {};	// @button
	var buttonSaveForms = {};	// @button
	var buttonReviewForm = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonPrintForms.click = function buttonPrintForms_click (event)// @startlock
	{// @endlock
		alert('Not yet implemented. Coming soon!');
	};// @lock

	buttonSaveForms.click = function buttonSaveForms_click (event)// @startlock
	{// @endlock
		alert('Not yet implemented. Coming soon!');
	};// @lock

	buttonReviewForm.click = function buttonReviewForm_click (event)// @startlock
	{// @endlock
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonPrintForms", "click", buttonPrintForms.click, "WAF");
	WAF.addListener(this.id + "_buttonSaveForms", "click", buttonSaveForms.click, "WAF");
	WAF.addListener(this.id + "_buttonReviewForm", "click", buttonReviewForm.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
