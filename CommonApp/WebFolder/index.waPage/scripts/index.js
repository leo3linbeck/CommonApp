
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var buttonNextStep = {};	// @button
	var buttonGoBack = {};	// @button
	var buttonStart = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	buttonNextStep.click = function buttonNextStep_click (event)// @startlock
	{// @endlock
		$$('componentAddressEntry').hide();
	};// @lock

	buttonGoBack.click = function buttonGoBack_click (event)// @startlock
	{// @endlock
		$$('buttonGoBack').hide();
		$$('buttonNextStep').hide();
		$$('componentAddressEntry').hide();
		
		$$('buttonStart').show();
		$$('richTextSplashDescription').show();
	};// @lock

	buttonStart.click = function buttonStart_click (event)// @startlock
	{// @endlock
		$$('buttonStart').hide();
		$$('richTextSplashDescription').hide();
		
		$$('buttonGoBack').show();
		$$('buttonNextStep').show();
		$$('componentAddressEntry').show();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("buttonNextStep", "click", buttonNextStep.click, "WAF");
	WAF.addListener("buttonGoBack", "click", buttonGoBack.click, "WAF");
	WAF.addListener("buttonStart", "click", buttonStart.click, "WAF");
// @endregion
};// @endlock
