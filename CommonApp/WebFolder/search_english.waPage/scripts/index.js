
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var buttonStart = {};	// @button
	var buttonNextStep = {};	// @button
	var buttonGoBack = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

	function loadFamilyAndSetupSearchMap(current, next) {
		sources.family.conjureID(L3.getMainAddressParams(current),
			{
				onSuccess: function(event) {
					console.log('switchPages', next, event);
					currentFamilyID = event.result;
					$$(next).setupSearchMap(current, next);
					$$('buttonNextStep').setValue('PDF Report');
				},
				onError: function(error) {
					console.log('ERROR: switchPages', next, error);
				}
			}
		);
	}
	
	function switchPages(current, next) {
		console.log('Enter switchPages', current, next);
		switch (next) {
			case 'componentSchoolMap':
				loadFamilyAndSetupSearchMap(current, next);
				break;
		}
	}
	
	function getNextPage(current) {
		var next = null;
		
		next = L3.step[L3.stack.length]

		return next;
	}
	
// eventHandlers// @lock

	buttonStart.click = function buttonStart_click (event)// @startlock
	{// @endlock
		var next = L3.step[0];
		L3.stack.push(next);
		L3.transitionButtons('startSearch');
		L3.transitionPages(null, next);
		if ($$('componentAddressEntry_richTextUSPSLine1').getValue()) {
			$$('buttonNextStep').enable();
		}
		else {
			$$('buttonNextStep').disable();
		}

	};// @lock

	buttonNextStep.click = function buttonNextStep_click (event)// @startlock
	{// @endlock
		var current = L3.step[L3.stack.length-1], next;
		
		next = getNextPage(current);
		
		if (next) {
			L3.stack.push(next);
			switchPages(current, next);
		}
		else {
			L3.generateReport();
		}
		if (L3.stack.length !== L3.step.length) {
			this.setValue('Next Step');
		}
	};// @lock

	buttonGoBack.click = function buttonGoBack_click (event)// @startlock
	{// @endlock
		var old = L3.stack.pop();
		
		if (L3.stack.length === 0) {
			L3.transitionPages(old, null, 'backward');
			L3.transitionButtons('returnSearch');
		}
		else {
			L3.transitionPages(old, L3.stack[L3.stack.length-1], 'backward');
			$$('buttonNextStep').enable();
			$$('buttonNextStep').setValue('Next Step');
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		L3.localization.changeLanguage('en');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("buttonStart", "click", buttonStart.click, "WAF");
	WAF.addListener("buttonNextStep", "click", buttonNextStep.click, "WAF");
	WAF.addListener("buttonGoBack", "click", buttonGoBack.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
