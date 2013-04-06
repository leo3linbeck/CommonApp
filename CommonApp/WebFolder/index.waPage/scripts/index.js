
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var buttonCAStart = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	buttonCAStart.click = function buttonCAStart_click (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("buttonCAStart", "click", buttonCAStart.click, "WAF");
// @endregion
};// @endlock
