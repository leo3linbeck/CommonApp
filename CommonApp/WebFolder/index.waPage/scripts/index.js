
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var fatherEvent = {};	// @dataSource
	var motherEvent = {};	// @dataSource
	var childrenEvent = {};	// @dataSource
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
				sources.family.save({onSuccess: function(event) {}});
				break;
			case 'componentFamilyInfoEntry':
				sources.family.save({onSuccess: function(event) {}});
				L3.buildStepArray();
				break;
			case 'componentMotherEntry':
				sources.mother.save({onSuccess: function(event) {}});
				sources.family.save({onSuccess: function(event) {}});
				break;
			case 'componentFatherEntry':
				sources.father.save({onSuccess: function(event) {}});
				sources.family.save({onSuccess: function(event) {}});
				break;
			case 'componentGuardianEntry':
				sources.guardian.save({onSuccess: function(event) {}});
				sources.family.save({onSuccess: function(event) {}});
				break;
			case 'componentChildEntry':
				sources.children.save({onSuccess: function(event) {}});
				break;
			case 'componentContactInfoEntry':
				break;
			case 'componentSchoolMap':
				r = sources.family.ID
				sources.family.save({onSuccess: function(event) {}});
				break;
		}
		
		return r;
	}
	
	function createFamilyRelation(role) {
		if (!sources[role].ID) {
			sources.person.addNewElement();
			sources.person.getAttribute('lastName').setValue(sources.family.name);
			sources.person.save(
				{
					onSuccess: function(event) {
						sources.family[role].set(sources.person);
						sources.family.save();
						sources[role].serverRefresh();
					}
				}
			);
		}
	}
	
	function prepareNextPage(next) {
		var i, v;
		
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
				createFamilyRelation('mother');
				break;
			case 'componentFatherEntry':
				createFamilyRelation('father');
				break;
			case 'componentGuardianEntry':
				createFamilyRelation('guardian');
				break;
			case 'componentChildEntry':
				if (sources.family.numberOfChildren === 0) {
					sources.children.addNewElement({onSuccess: function(event) {}});
				}
				break;
			case 'componentContactInfoEntry':
				$$(next).sources.activeFamily.query('ID === :1',
					{
						params: [sources.family.ID],
						onSuccess: function(event) {
							console.log('componentContactInfoEntry find activeFamily', event);
						}
					}
				);
				
				sources.children.toArray('ID',
					{
						onSuccess: function(event) {
							var a = [];
							
							console.log('sources.children.toArray', event);
							event.result.forEach(function(e) {
								a.push(e.ID);
							});
							if (sources.father.ID) {
								a.push(sources.father.ID);
							}
							if (sources.mother.ID) {
								a.push(sources.mother.ID);
							}
							if (sources.guardian.ID) {
								a.push(sources.guardian.ID);
							}
							$$(next).sources.contactList.query('ID in :1',
								{
									onSuccess: function(evt) {
										console.log('contactInfo query', evt);
									},
									params: [a]
								}
							);
						}
					}
				);
				break;
			case 'componentSchoolMap':
				break;
		}
		$$(next).show();
		if (next === 'componentSchoolMap') {
			L3.loadGoogleMap('componentSchoolMap_containerGoogleMap', sources.family.mapCoords, sources.family.uspsLine1 + '\n' + sources.family.uspsLine2);
		}
	}

// eventHandlers// @lock

	fatherEvent.onCurrentElementChange = function fatherEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		console.log('index.fatherEvent.onCollectionChange');
		if (!event.dataSource.lastName) {
			event.dataSource.getAttribute('lastName').setValue(sources.family.name);
		}
	};// @lock

	motherEvent.onCurrentElementChange = function motherEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		console.log('index.motherEvent.onCollectionChange');
		if (!event.dataSource.lastName) {
			event.dataSource.getAttribute('lastName').setValue(sources.family.name);
		}
	};// @lock

	childrenEvent.onCurrentElementChange = function childrenEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		console.log('index.childrenEvent.onCollectionChange');
		if (!event.dataSource.lastName) {
			event.dataSource.getAttribute('lastName').setValue(sources.family.name);
		}
		$$('componentChildEntry').setChildrenCount(event.dataSource);
		$$('componentChildEntry').setChildAge(event.dataSource.birthdate);
	};// @lock

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
		console.log('iconHome.click');
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
	WAF.addListener("father", "onCurrentElementChange", fatherEvent.onCurrentElementChange, "WAF");
	WAF.addListener("mother", "onCurrentElementChange", motherEvent.onCurrentElementChange, "WAF");
	WAF.addListener("children", "onCurrentElementChange", childrenEvent.onCurrentElementChange, "WAF");
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
