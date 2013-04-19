
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var iconSettings = {};	// @icon
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
				sources.family.save({onSuccess: function(event) {}});
				break;
			case 'componentCreateApplications':
				break;
		}
		
		return r;
	}
	
	function createFamilyRelation(role, comp) {
		if (!sources[role].ID) {
			sources.person.addNewElement();
			sources.person.getAttribute('lastName').setValue(sources.family.name);
			sources.person.save(
				{
					onSuccess: function(event) {
						sources.family[role].set(sources.person);
						sources.family.save();
						sources[role].serverRefresh();
						$$(comp).show();
					}
				}
			);
		}
		else {
			$$(comp).show();
		}
	}
	
	function loadAddressEntryData() {
		if (sources.family.uspsDeliveryPoint) {
			$$('componentAddressEntry_textFieldStreet1Entry').setValue(sources.family.mainStreet1);
			$$('componentAddressEntry_textFieldStreet2Entry').setValue(sources.family.mainStreet2);
			$$('componentAddressEntry_textFieldCityEntry').setValue(sources.family.mainCity);
			$$('componentAddressEntry_textFieldZipCodeEntry').setValue(sources.family.mainZipCode);
			$$('componentAddressEntry_richTextUSPSLine1').setValue(sources.family.uspsLine1);
			$$('componentAddressEntry_richTextUSPSLine2').setValue(sources.family.uspsLine2);
			$$('buttonNextStep').enable();
		}
		else {
			$$('componentAddressEntry_textFieldStreet1Entry').setValue('');
			$$('componentAddressEntry_textFieldStreet2Entry').setValue('');
			$$('componentAddressEntry_textFieldCityEntry').setValue('');
			$$('componentAddressEntry_textFieldZipCodeEntry').setValue('');
			$$('componentAddressEntry_richTextUSPSLine1').setValue('');
			$$('componentAddressEntry_richTextUSPSLine2').setValue('');
			$$('buttonNextStep').disable();
		}
	}

	
	function prepareNextPage(next) {
		var i, v;
		
		switch (next) {
			case 'componentAddressEntry':
				loadAddressEntryData();
				$$(next).show();
				break;
			case 'componentFamilyInfoEntry':
				$$(next).show();
				break;
			case 'componentMotherEntry':
				createFamilyRelation('mother', next);
				break;
			case 'componentFatherEntry':
				createFamilyRelation('father', next);
				break;
			case 'componentGuardianEntry':
				createFamilyRelation('guardian', next);
				break;
			case 'componentChildEntry':
				if (sources.family.numberOfChildren === 0) {
					sources.children.addNewElement(
						{
							onSuccess: function(event) {
								$$(next).show();
							}
						}
					);
				}
				else {
					$$(next).show();
				}
				break;
			case 'componentContactInfoEntry':
				$$(next).sources.activeFamily.query('ID === :1',
					{
						onSuccess: function(event) {
							console.log('componentContactInfoEntry find activeFamily', event);
						},
						onError: function(error) {
							console.log('ERROR: load activeFamily', next, event);
						},
						params: [sources.family.ID]
					}
				);
				
				$$(next).sources.contactList.query('belongsTo.ID === :1 OR fatherFamilies.ID === :1 OR motherFamilies.ID === :1 OR guardianships.ID === :1',
					{
						onSuccess: function(event) {
							console.log('load contactList', next, event);
						},
						onError: function(error) {
							console.log('ERROR: load contactList', next, event);
						},
						orderBy: 'firstName',
						params: [sources.family.ID]
					}
				);
				$$(next).show();
				break;
			case 'componentSchoolMap':
				$$(next).show();
				if (next === 'componentSchoolMap') {
					L3.loadGoogleMap('componentSchoolMap_containerGoogleMap', sources.family.mapCoords, sources.family.uspsLine1 + '\n' + sources.family.uspsLine2);
				}
				break;
			case 'componentCreateApplications':
				$$('componentCreateApplications').sources.applyingChildren.query('belongsTo.ID === :1 AND isApplying === true',
					{
						onSuccess: function(event) {
							console.log('load applyingChildren', event);
							L3.loadSchoolOptions();
							$$('componentCreateApplications').sources.schoolApplication.query('applicant.belongsTo.ID === :1',
								{
									onSuccess: function(evt) {
										console.log('load schoolApplication', evt);
									},
									params: [sources.family.ID]
								}
							);
						},
						onError: function(error) {
							console.log('ERROR: load applyingChildren', error);
						},
						orderBy: 'birthdate',
						params: [sources.family.ID]
					}
				);
				$$(next).show();
				break;
		}
	}
	
	function loginSetup() {
		if (WAF.directory.currentUser()) {
			$$('iconSettings').show();
			$$('richTextSettingsTitle').show();
			$$('richTextSignInAndStart').hide();
			$$('buttonStart').show();
		}
		else {
			$$('iconSettings').hide();
			$$('richTextSettingsTitle').hide();
			$$('richTextSignInAndStart').show();
			$$('buttonStart').hide();
		}
	}

// eventHandlers// @lock

	iconSettings.click = function iconSettings_click (event)// @startlock
	{// @endlock
		alert('Not yet implemented.');
	};// @lock

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

	loginMain.logout = function loginMain_logout (event)// @startlock
	{// @endlock
		loginSetup();
	};// @lock

	loginMain.login = function loginMain_login (event)// @startlock
	{// @endlock
		loginSetup();
	};// @lock

	iconLogin.click = function iconLogin_click (event)// @startlock
	{// @endlock
		if (WAF.directory.currentUser()) {
			WAF.directory.logout(
				{
					onSuccess: function(event) {
						location.reload();
					},
					onError: function(error) {
						console.log('ERROR: logout', error);
					}
				}
			);
		}
		else {
			$$('loginMain').showLoginDialog();
		}
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
		loginSetup();
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
	WAF.addListener("iconSettings", "click", iconSettings.click, "WAF");
	WAF.addListener("loginMain", "logout", loginMain.logout, "WAF");
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
