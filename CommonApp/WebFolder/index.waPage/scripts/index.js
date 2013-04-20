
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var familyEvent = {};	// @dataSource
	var iconSettings = {};	// @icon
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
	
	function transitionPages(current, next) {
		$$(current).hide();
		$$(next).show();
	}
	
	function saveCurrentPage(current) {
		switch (current) {
			case 'componentSelectFamily':
				break;
			case 'componentAddressEntry':
				sources.family.save({ onSuccess: function(e) { console.log('saveCurrentPage', current, e); } });
				break;
			case 'componentFamilyInfoEntry':
				sources.family.save({ onSuccess: function(e) { console.log('saveCurrentPage', current, e); } });
				L3.buildStepArray(sources.infoFamily);
				break;
			case 'componentMotherEntry':
				$$(current).sources.mother.save({
						onSuccess: function(e) { console.log('saveCurrentPage', current, e); }
					});
				break;
			case 'componentFatherEntry':
				$$(current).sources.father.save({
						onSuccess: function(e) { console.log('saveCurrentPage', current, e); }
					});
				break;
			case 'componentGuardianEntry':
				$$(current).sources.guardian.save({
						onSuccess: function(e) { console.log('saveCurrentPage', current, e); }
					});
				break;
			case 'componentChildEntry':
				$$(current).sources.children.save({
						onSuccess: function(e) { console.log('saveCurrentPage', current, e); }
					});
				break;
			case 'componentContactInfoEntry':
				break;
			case 'componentSchoolMap':
				sources.family.save({onSuccess: function(event) {}});
				break;
			case 'componentCreateApplications':
				break;
		}
	}
	
	function createFamilyRelation(role, current, next) {
		$$(next).sources[role].query(role + 'Families.ID === :1',
			{
				onSuccess: function(event) {
					console.log('createFamilyRelation selectedFamily query', event);
					if (event.dataSource.length === 0) {
						$$(next).sources[role].addNewElement();
						$$(next).sources[role].getAttribute('lastName').setValue(sources.family.name);
						$$(next).sources[role].save({
							onSuccess: function(evt) {
								console.log('save ' + role, evt);
								sources.family[role].set(evt.dataSource.getCurrentElement());
								sources.family.save({
									onSuccess: function(e) { console.log('save family', e); }
								});
							}
						});						
						$$(next).sources[role].serverRefresh();
					}
					transitionPages(current, next);
				},
				onError: function(error) {
					console.log('ERROR: createFamilyRelation selectedFamily query', error);
				},
				params: [currentFamilyID]
			}
		);
	}
	
	function setupAddressEntry(usps, next) {
		if (usps) {
			$$('buttonNextStep').enable();
			$$(next + '_buttonVerifyAddress').disable();
		}
		else {
			$$('buttonNextStep').disable();
			$$(next + '_buttonVerifyAddress').enable();
		}
	}
	
	function switchPages(current, next) {
		console.log('switchPages(current, next)', current, next);
		switch (next) {
			case 'componentSelectFamily':
				transitionPages(current, next);
				break;
			case 'componentAddressEntry':
				setupAddressEntry(sources.family.uspsDeliveryPoint, next);
				transitionPages(current, next);
				break;
			case 'componentFamilyInfoEntry':
				transitionPages(current, next);
				break;
			case 'componentMotherEntry':
				createFamilyRelation('mother', current, next);
				break;
			case 'componentFatherEntry':
				createFamilyRelation('father', current, next);
				break;
			case 'componentGuardianEntry':
				createFamilyRelation('guardian', current, next);
				break;
			case 'componentChildEntry':
				if (!$$(next).sources.children.ID) {
					$$(next).sources.children.query('belongsTo.ID === :1',
						{
							onSuccess: function(event) {
								console.log('componentChildEntry query', event);
								if (event.dataSource.length === 0) {
									$$(next).sources.children.addNewElement();
									$$(next).sources.children.getAttribute('lastName').setValue(sources.family.name);
									$$(next).sources.children.belongsTo.set(sources.family);
									$$(next).sources.children.save({
										onSuccess: function(e) { console.log('save ' + role, e); }
									});
									$$(next).sources.children.serverRefresh();
								}
								transitionPages(current, next);
							},
							onError: function(error) {
								console.log('ERROR: componentChildEntry query', error);
							},
							params: [currentFamilyID]
						}
					);
				}
				else {
					transitionPages(current, next);
				}
				break;
			case 'componentContactInfoEntry':
				$$(next).sources.activeFamily.query('ID === :1',
					{
						onSuccess: function(event) {
							console.log('componentContactInfoEntry find activeFamily', event);
						},
						onError: function(error) {
							console.log('ERROR: load activeFamily', next, error);
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
							console.log('ERROR: load contactList', next, error);
						},
						orderBy: 'firstName',
						params: [sources.family.ID]
					}
				);
				transitionPages(current, next);
				break;
			case 'componentSchoolMap':
				if ($$(next).sources.selectedFamily.ID !== currentFamilyID) {
					$$(next).sources.selectedFamily.query('ID === :1',
						{
							onSuccess: function(event) {
								console.log('componentSchoolMap selectedFamily query', event);
								transitionPages(current, next);
								L3.loadGoogleMap('componentSchoolMap_containerGoogleMap', sources.family.mapCoords, sources.family.uspsLine1 + '\n' + sources.family.uspsLine2);
							},
							onError: function(error) {
								console.log('ERROR: componentSchoolMap selectedFamily query', error);
							},
							params: [currentFamilyID]
						}
					);
				}
				else {
					transitionPages(current, next);
					L3.loadGoogleMap('componentSchoolMap_containerGoogleMap', sources.family.mapCoords, sources.family.uspsLine1 + '\n' + sources.family.uspsLine2);
				}
				break;
			case 'componentCreateApplications':
				$$(next).sources.applyingChildren.query('belongsTo.ID === :1 AND isApplying === true',
					{
						onSuccess: function(event) {
							console.log('load applyingChildren', event);
							L3.loadSchoolOptions();
							$$(next).sources.schoolApplication.query('applicant.belongsTo.ID === :1',
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
				transitionPages(current, next);
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

	familyEvent.onCurrentElementChange = function familyEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		console.log('familyEvent.onCurrentElementChange', event);
		$$('componentFatherEntry').sources.father.setEntityCollection(ds.Person.newCollection());
		$$('componentMotherEntry').sources.mother.setEntityCollection(ds.Person.newCollection());
		$$('componentGuardianEntry').sources.guardian.setEntityCollection(ds.Person.newCollection());
		$$('componentChildEntry').sources.children.setEntityCollection(ds.Person.newCollection());
	};// @lock

	iconSettings.click = function iconSettings_click (event)// @startlock
	{// @endlock
		alert('Not yet implemented.');
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
		var next;
		var current = L3.step[L3.stack.length-1];
		
		saveCurrentPage(current);
		
		if (L3.stack.length < L3.step.length) {
			next = L3.step[L3.stack.length];
			L3.stack.push(next);
			switchPages(current, next);
		}
	};// @lock

	buttonGoBack.click = function buttonGoBack_click (event)// @startlock
	{// @endlock
		var old = L3.stack.pop();
		
		saveCurrentPage(old);
		
		if (L3.stack.length === 0) {
			$$(old).hide();
			$$('buttonGoBack').hide();
			$$('buttonNextStep').hide();
			
			$$('buttonStart').show();
			$$('richTextSplashDescription').show();
		}
		else {
			$$(old).hide();
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
	WAF.addListener("family", "onCurrentElementChange", familyEvent.onCurrentElementChange, "WAF");
	WAF.addListener("iconSettings", "click", iconSettings.click, "WAF");
	WAF.addListener("loginMain", "logout", loginMain.logout, "WAF");
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
