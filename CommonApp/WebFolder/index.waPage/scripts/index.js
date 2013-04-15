﻿
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var loginMain = {};	// @login
	var iconLogin = {};	// @icon
	var iconHome = {};	// @icon
	var documentEvent = {};	// @document
	var comboboxLanguage = {};	// @combobox
	var buttonNextStep = {};	// @button
	var buttonGoBack = {};	// @button
	var buttonStart = {};	// @button
// @endregion// @endlock

	function validateField(w, test) {
		var v = $$(w);
		if (!test) {
			test = v.getValue();
		}
		if (test) {
			v.setBackgroundColor('white');
		}
		else {
			v.focus();
			v.setBackgroundColor('red');
		}
		
		return test;
	}
	
	function validateCurrentPage(current) {
		var r = true, v;
		
		switch (current) {
			case 'componentAddressEntry':
				r = sources.family.uspsDeliveryPoint;
				sources.family.save();
				break;
			case 'componentSchoolMap':
				r = sources.family.ID
				sources.family.save();
				break;
			case 'componentFamilyInfoEntry':
				r = r && validateField('componentFamilyInfoEntry_textFieldNumberOfChildren');
				r = r && validateField('componentFamilyInfoEntry_textFieldNumberOfApplicants');
				if (r) {
					sources.family.save();
					L3.buildStepArray();
				}
				break;
			case 'componentMotherEntry':
				sources.mother.save();
				sources.family.save();
			case 'componentFatherEntry':
				sources.father.save();
				sources.family.save();
		}
		
		return r;
	}
	
	function prepareNextPage(next) {
		var v;
		
		switch (next) {
			case 'componentAddressEntry':
				if (sources.family.uspsDeliveryPoint) {
					$$(next + '_textFieldStreet1Entry').setValue(sources.family.mainStreet1);
					$$(next + '_textFieldStreet2Entry').setValue(sources.family.mainStreet2);
					$$(next + '_textFieldCityEntry').setValue(sources.family.mainCity);
					$$(next + '_textFieldZipCodeEntry').setValue(sources.family.mainZipCode);
					$$(next + '_richTextUSPSLine1').setValue(sources.family.uspsLine1);
					$$(next + '_richTextUSPSLine2').setValue(sources.family.uspsLine2);
					$$('buttonNextStep').enable();
				}
				else {
					$$(next + '_textFieldStreet1Entry').setValue('');
					$$(next + '_textFieldStreet2Entry').setValue('');
					$$(next + '_textFieldCityEntry').setValue('');
					$$(next + '_textFieldZipCodeEntry').setValue('');
					$$(next + '_richTextUSPSLine1').setValue('');
					$$(next + '_richTextUSPSLine2').setValue('');
					$$('buttonNextStep').disable();
				}
				break;
			case 'componentMotherEntry':
				if (!sources.mother.ID) {
					sources.person.addNewElement();
					sources.person.getAttribute('lastName').setValue(sources.family.name);
					sources.person.save(
						{
							onSuccess: function(event) {
								sources.family.mother.set(sources.person);
								sources.family.save();
								sources.mother.serverRefresh();
							}
						}
					);
				}
				break;
			case 'componentFatherEntry':
				if (!sources.father.ID) {
					sources.person.addNewElement();
					sources.person.getAttribute('lastName').setValue(sources.family.name);
					sources.person.save(
						{
							onSuccess: function(event) {
								sources.family.father.set(sources.person);
								sources.family.save();
								sources.father.serverRefresh();
							}
						}
					);
				}
				break;
			case 'componentSchoolMap':
				L3.loadGoogleMap('componentSchoolMap_containerGoogleMap', sources.family.mapCoords, sources.family.uspsLine1 + '\n' + sources.family.uspsLine2);
				break;
		}
		$$(next).show();
	}

// eventHandlers// @lock

	loginMain.login = function loginMain_login (event)// @startlock
	{// @endlock
		$$('iconSettings').show();
	};// @lock

	iconLogin.click = function iconLogin_click (event)// @startlock
	{// @endlock
		$$('loginMain').showLoginDialog();
	};// @lock

	iconHome.click = function iconHome_click (event)// @startlock
	{// @endlock
		L3.stack.forEach(function(e) {
			$$(e).hide();
		});
		L3.stack.length = 0;
		
		$$('buttonGoBack').hide();
		$$('buttonNextStep').hide();
		
		$$('buttonStart').show();
		$$('richTextSplashDescription').show();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
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
			if (validateCurrentPage(current)) {
				next = L3.step[L3.stack.length];
				$$(current).hide();
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
			$$('buttonGoBack').hide();
			$$('buttonNextStep').hide();
			
			$$('buttonStart').show();
			$$('richTextSplashDescription').show();
		}
		else {
			$$(L3.stack[L3.stack.length-1]).show();
			$$('buttonNextStep').enable();
		}
	};// @lock

	buttonStart.click = function buttonStart_click (event)// @startlock
	{// @endlock
		var next = L3.step[0];
		
		$$('buttonStart').hide();
		$$('richTextSplashDescription').hide();
		
		$$('buttonGoBack').show();
		$$('buttonNextStep').show();

		L3.stack.push(next);
		$$(next).show();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("loginMain", "login", loginMain.login, "WAF");
	WAF.addListener("iconLogin", "click", iconLogin.click, "WAF");
	WAF.addListener("iconHome", "click", iconHome.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("comboboxLanguage", "change", comboboxLanguage.change, "WAF");
	WAF.addListener("buttonNextStep", "click", buttonNextStep.click, "WAF");
	WAF.addListener("buttonGoBack", "click", buttonGoBack.click, "WAF");
	WAF.addListener("buttonStart", "click", buttonStart.click, "WAF");
// @endregion
};// @endlock
