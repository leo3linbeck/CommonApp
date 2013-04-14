
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var iconLogin = {};	// @icon
	var iconHome = {};	// @icon
	var documentEvent = {};	// @document
	var comboboxLanguage = {};	// @combobox
	var buttonNextStep = {};	// @button
	var buttonGoBack = {};	// @button
	var buttonStart = {};	// @button
// @endregion// @endlock

	function validateCurrentPage(current) {
		return true;
	}
	
	function prepareNextPage(next) {
		if (next === 'componentSchoolMap') {
			L3.loadGoogleMap('componentSchoolMap_containerGoogleMap', sources.family.mapCoords, sources.family.uspsLine1 + '\n' + sources.family.uspsLine2);
		}
	}

// eventHandlers// @lock

	iconLogin.click = function iconLogin_click (event)// @startlock
	{// @endlock
		alert('login - to come');
	};// @lock

	iconHome.click = function iconHome_click (event)// @startlock
	{// @endlock
		L3.stack.forEach(function(e) {
			$$(e).hide();
		});
		L3.stack.length = 0;
		
		$$('iconHome').hide();
		$$('iconLogin').hide();
		$$('buttonGoBack').hide();
		$$('buttonNextStep').hide();
		
		$$('buttonStart').show();
		$$('richTextSplashDescription').show();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		$$('buttonNextStep').disable();
		L3.localization.changeLanguage($$('comboboxLanguage').getValue());
	};// @lock

	comboboxLanguage.change = function comboboxLanguage_change (event)// @startlock
	{// @endlock
		L3.localization.changeLanguage($$('comboboxLanguage').getValue());
	};// @lock

	buttonNextStep.click = function buttonNextStep_click (event)// @startlock
	{// @endlock
		var current, next;
		
		if (L3.stack.length < L3.step.length) {
			current = L3.step[L3.stack.length-1];
			next = L3.step[L3.stack.length];
			if (validateCurrentPage(current)) {
				$$(current).hide();
				$$(next).show();
				L3.stack.push(next);
				prepareNextPage(next);
			}
		}
	};// @lock

	buttonGoBack.click = function buttonGoBack_click (event)// @startlock
	{// @endlock
		var old = L3.stack.pop();
		$$(old).hide();
		
		if (L3.stack.length === 0) {
			$$('iconHome').hide();
			$$('iconLogin').hide();
			$$('buttonGoBack').hide();
			$$('buttonNextStep').hide();
			
			$$('buttonStart').show();
			$$('richTextSplashDescription').show();
		}
		else {
			$$(L3.stack[L3.stack.length-1]).show();
		}
	};// @lock

	buttonStart.click = function buttonStart_click (event)// @startlock
	{// @endlock
		var next = L3.step[0];
		
		$$('buttonStart').hide();
		$$('richTextSplashDescription').hide();
		
		$$('iconHome').show();
		$$('iconLogin').show();
		$$('buttonGoBack').show();
		$$('buttonNextStep').show();

		L3.stack.push(next);
		$$(next).show();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("iconLogin", "click", iconLogin.click, "WAF");
	WAF.addListener("iconHome", "click", iconHome.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("comboboxLanguage", "change", comboboxLanguage.change, "WAF");
	WAF.addListener("buttonNextStep", "click", buttonNextStep.click, "WAF");
	WAF.addListener("buttonGoBack", "click", buttonGoBack.click, "WAF");
	WAF.addListener("buttonStart", "click", buttonStart.click, "WAF");
// @endregion
};// @endlock
