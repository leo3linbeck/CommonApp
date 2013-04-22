
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
	var loginMain = {};	// @login
	var iconHome = {};	// @icon
	var iconLogin = {};	// @icon
	var iconSettings = {};	// @icon
	var buttonNextStep = {};	// @button
	var buttonGoBack = {};	// @button
	var buttonStart = {};	// @button
// @endregion// @endlock

	function transitionPages(hideThis, showThis, dir) {
		var effect = 'slide', easing = 'easeOutQuad', speed = 500;
		dir = dir || 'forward';

		if (hideThis) {
			$('#' + hideThis).hide({
				effect: effect,
				direction: (dir === 'forward' ? 'left' : 'right'),
				easing: easing,
				duration: speed
			});
		}
		if (showThis) {
			$('#' + showThis).show({
				effect: effect,
				direction: (dir === 'forward' ? 'right' : 'left'),
				easing: easing,
				duration: speed
			});
			$('#' + showThis + '_' + L3.focusField[showThis]).select();
		}
	}
	
	function transitionButtons(mode) {
		var effect = 'slide', easing = 'easeOutQuad', speed = 500;

		if (mode === 'start') {
			$('#buttonStart').hide({
				effect: effect,
				direction: 'down',
				easing: easing,
				duration: speed
			});
			$('#containerButtons').show({
				effect: effect,
				direction: 'up',
				easing: easing,
				duration: speed
			});
		}
		else {
			$('#containerButtons').hide({
				effect: effect,
				direction: 'up',
				easing: easing,
				duration: speed
			});
			$('#buttonStart').show({
				effect: effect,
				direction: 'down',
				easing: easing,
				duration: speed
			});
		}
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
				L3.buildStepArray(sources.family);
				contactListID = null;
				break;
			case 'componentMotherEntry':
				sources.mother.save({ onSuccess: function(e) { console.log('saveCurrentPage', current, e); } });
				break;
			case 'componentFatherEntry':
				sources.father.save({ onSuccess: function(e) { console.log('saveCurrentPage', current, e); } });
				break;
			case 'componentGuardianEntry':
				sources.guardian.save({ onSuccess: function(e) { console.log('saveCurrentPage', current, e); } });
				break;
			case 'componentChildEntry':
				sources.children.save({ onSuccess: function(e) { console.log('saveCurrentPage', current, e); } });
				break;
			case 'componentContactInfoEntry':
				sources.family.save({ onSuccess: function(e) { console.log('saveCurrentPage', current, e); } });
				break;
			case 'componentSchoolMap':
				sources.family.save({ onSuccess: function(e) { console.log('saveCurrentPage', current, e); } });
				break;
			case 'componentCreateApplications':
				break;
		}
	}
	
	function createFamilyRelation(role, current, next) {
		if (!sources[role].ID) {
			sources.tempPerson.addNewElement();
			sources.tempPerson.serverRefresh(
				{
					onSuccess: function(event) {
						console.log('tempPerson.serverRefresh', event);
						event.dataSource.getAttribute('lastName').setValue(sources.family.name);
						sources.family[role].set(event.dataSource);
						sources.family.save({ onSuccess: function(evt) {console.log('Save family.' + role, evt);} });
						contactListID = null;
					},
					onError: function(error) {
						console.log('ERROR: tempPerson.serverRefresh', error);
					}
				}
			);
		}
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
	
	function addNewChild(current, next) {
		sources.children.addNewElement();
		sources.children.serverRefresh(
			{
				onSuccess: function(event) {
					console.log('children.serverRefresh', event);
					event.dataSource.getAttribute('lastName').setValue(sources.family.name);
					sources.family.save({ onSuccess: function(event) {console.log('Save children',event);} });
					$$(next).setChildrenCount(event.dataSource);
					$$(next).setChildAge(event.dataSource.birthdate);
					transitionPages(current, next);
					contactListID = null;
				},
				onError: function(error) {
					console.log('ERROR: children.serverRefresh', error);
				}
			}
		);
	}
	
	function loadContactList(current, next) {
		if (sources.family.ID !== contactListID) {
			sources.contactList.query('childOf.ID === :1 OR fatherFamilies.ID === :1 OR motherFamilies.ID === :1 OR guardianFamilies.ID === :1',
				{
					onSuccess: function(event) {
						console.log('load contactList', event);
						transitionPages(current, next);
						contactListID = sources.family.ID;
					},
					onError: function(error) {
						console.log('ERROR: load contactList', error);
					},
					orderBy: 'firstName',
					params: [sources.family.ID]
				}
			);
		}
		else {
			transitionPages(current, next);
		}
	}
	
	function selectApplyingChildren(current, next) {
		$$(next).sources.applyingChildren.query('childOf.ID === :1 AND isApplying === true',
			{
				onSuccess: function(event) {
					console.log('load applyingChildren', event);
					L3.loadSchoolOptions();
					$$(next).sources.schoolApplication.query('applicant.childOf.ID === :1',
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
	}
	
	function switchPages(current, next) {
		console.log('switchPages(current, next)', current, next);
		switch (next) {
			case 'componentSelectFamily':
				transitionPages(current, next);
				break;
			case 'componentAddressEntry':
				setupAddressEntry(sources.family.mainUSPSDeliveryPoint, next);
				transitionPages(current, next);
				break;
			case 'componentFamilyInfoEntry':
				transitionPages(current, next);
				break;
			case 'componentMotherEntry':
				createFamilyRelation('mother', current, next);
				transitionPages(current, next);
				break;
			case 'componentFatherEntry':
				createFamilyRelation('father', current, next);
				transitionPages(current, next);
				break;
			case 'componentGuardianEntry':
				createFamilyRelation('guardian', current, next);
				transitionPages(current, next);
				break;
			case 'componentChildEntry':
				if (sources.family.numberOfChildren === 0) {
					addNewChild(current, next);
				}
				else {
					$$(next).setChildrenCount(sources.children);
					$$(next).setChildAge(sources.children.birthdate);
					transitionPages(current, next);
				}
				break;
			case 'componentContactInfoEntry':
				loadContactList(current, next);
				break;
			case 'componentSchoolMap':
				transitionPages(current, next);
				L3.loadGoogleMap('componentSchoolMap_containerGoogleMap', sources.family.mainMapCoords, sources.family.mainUSPSLine1 + '\n' + sources.family.mainUSPSLine2);
				break;
			case 'componentCreateApplications':
				selectApplyingChildren(current, next);
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

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		L3.stack.length = [];
		loginSetup();
		L3.localization.changeLanguage('en');
		sources.family.declareDependencies('father');
		sources.family.declareDependencies('mother');
		sources.family.declareDependencies('guardian');
		sources.family.declareDependencies('children');
	};// @lock

	loginMain.logout = function loginMain_logout (event)// @startlock
	{// @endlock
		loginSetup();
	};// @lock

	loginMain.login = function loginMain_login (event)// @startlock
	{// @endlock
		loginSetup();
	};// @lock

	iconHome.click = function iconHome_click (event)// @startlock
	{// @endlock
		console.log('iconHome.click');
		var old = L3.stack.pop();
		
		saveCurrentPage(old);
		transitionPages(old, null, 'backward');
		transitionButtons('return');
		L3.stack.length = 0;
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

	iconSettings.click = function iconSettings_click (event)// @startlock
	{// @endlock
		alert('Not yet implemented.');
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
			transitionPages(old, null, 'backward');
			transitionButtons('return');
		}
		else {
			transitionPages(old, L3.stack[L3.stack.length-1], 'backward');
			$$('buttonNextStep').enable();
		}
	};// @lock

	buttonStart.click = function buttonStart_click (event)// @startlock
	{// @endlock
		var next = L3.step[0];
		
		L3.stack.push(next);
		transitionButtons('start');
		transitionPages(null, next);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("loginMain", "logout", loginMain.logout, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("loginMain", "login", loginMain.login, "WAF");
	WAF.addListener("iconHome", "click", iconHome.click, "WAF");
	WAF.addListener("iconLogin", "click", iconLogin.click, "WAF");
	WAF.addListener("iconSettings", "click", iconSettings.click, "WAF");
	WAF.addListener("buttonNextStep", "click", buttonNextStep.click, "WAF");
	WAF.addListener("buttonGoBack", "click", buttonGoBack.click, "WAF");
	WAF.addListener("buttonStart", "click", buttonStart.click, "WAF");
// @endregion
};// @endlock
