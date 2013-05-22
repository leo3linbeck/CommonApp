  
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var buttonRegistrationDialogClose = {};	// @button
	var iconAdmin = {};	// @icon
	var loginMain = {};	// @login
	var iconLogin = {};	// @icon
	var iconHome = {};	// @icon
	var documentEvent = {};	// @document
	var comboboxLanguage = {};	// @combobox
	var buttonNextStep = {};	// @button
	var buttonGoBack = {};	// @button
	var buttonStart = {};	// @button
// @endregion// @endlock

	function createFamilyRelation(role, current, next) {
		console.log('Enter createFamilyRelation', current, next);
		if (!sources[role].ID) {
			sources.tempPerson.addNewElement();
			sources.tempPerson.serverRefresh(
				{
					onSuccess: function(event) {
						console.log('tempPerson.serverRefresh', event);
						event.dataSource.getAttribute('lastName').setValue(sources.family.name);
						event.dataSource.getAttribute('relationship').setValue(role);
						sources.family[role].set(event.dataSource);
						L3.setupFamilyWidgets(next, event.dataSource);
						L3.transitionPages(current, next);
					},
					onError: function(error) {
						console.log('ERROR: tempPerson.serverRefresh', error);
					}
				}
			);
		}
		else {
			L3.setupFamilyWidgets(next, sources[role]);
			L3.transitionPages(current, next);
		}
	}
			
	function saveCurrentPage(current) {
		console.log('Enter saveCurrentPage', current);
		var dataSource = null;
		
		switch (current) {
			case 'componentSchoolMap':
			case 'componentFamilyInfoEntry':
			case 'componentContactInfoEntry':
				dataSource = sources.family;
				break;
			case 'componentMotherEntry':
				dataSource = sources.mother;
				break;
			case 'componentFatherEntry':
				dataSource = sources.father;
				break;
			case 'componentGuardianEntry':
				dataSource = sources.guardian;
				break;
			case 'componentChildEntry':
				dataSource = sources.children;
				break;
		}
		
		if (dataSource) {
			dataSource.save(
				{
					onSuccess: function(event) {
						console.log('saveCurrentPage', event); 
					},
					onError: function(error) {
						console.log('ERROR: saveCurrentPage', error); 					
					}
				}
			);
		}
	}
	
	function loadFamilyAndSetupSchoolMap(current, next) {
		sources.family.conjureID(L3.getMainAddressParams(current),
			{
				onSuccess: function(event) {
					console.log('switchPages', next, event);
					currentFamilyID = event.result;
					contactListID = null;
					L3.markers = [];
					$$(next).setupSchoolMap(current, next);
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
				loadFamilyAndSetupSchoolMap(current, next);
				break;
			case 'componentSelectFamily':
				L3.transitionPages(current, next);
				break;
			case 'componentFamilyInfoEntry':
				L3.transitionPages(current, next);
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
				if (sources.family.numberOfChildren === 0) {
					L3.addNewChild(current, next);
				}
				else {
					$$(next).setChildrenCount(sources.children);
					$$(next).setChildAge(sources.children.birthdate);
					L3.transitionPages(current, next);
				}
				go = false;
				break;
			case 'componentContactInfoEntry':
				$$(next).loadContactList(current, next);
				go = false;
				break;
			case 'componentCreateApplications':
				$$(next).selectApplyingChildren(current, next);
				break;
			case 'componentReviewAndPrintForms':
				L3.transitionPages(current, next);
				break;
		}
	}
	
	function getNextPage(current) {
		var next = null;
		
		console.log('Enter getNextPage', current);
		if (current === 'componentSchoolMap') {
			if (WAF.directory.currentUser()) {
				if (L3.step.length < 3) {
					if (WAF.directory.currentUserBelongsTo('Staff')) {
						L3.step.push('componentSelectFamily');
					}
					L3.step.push('componentFamilyInfoEntry');
				}
				next = L3.step[2];
			}
			else {
				$$('dialogRegistration').displayDialog();
			}
		}
		else {
			if ((current === 'componentFamilyInfoEntry') && (L3.step.length < 5)) {
				L3.buildStepArray($$(current + '_comboboxApplicant').getValue());
			}
			next = L3.step[L3.stack.length]
		}

		return next;
	}
	
	function loginSetup() {
		if (WAF.directory.currentUser()) {
			if (WAF.directory.currentUserBelongsTo('staff')) {
				$$('iconAdmin').show();
				$$('richTextAdminTitle').show();		
			}
			else {
				$$('iconAdmin').hide();
				$$('richTextAdminTitle').hide();						
			}
		}
		else {
			$$('iconAdmin').hide();
			$$('richTextAdminTitle').hide();
		}
		if (L3.stack.length) {
			location.reload();
		}
	}
	

// eventHandlers// @lock

	buttonRegistrationDialogClose.click = function buttonRegistrationDialogClose_click (event)// @startlock
	{// @endlock
		$$('dialogRegistration').closeDialog();
	};// @lock

	iconAdmin.click = function iconAdmin_click (event)// @startlock
	{// @endlock
		window.open('admin');
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
		var old = L3.stack.pop();
		
		saveCurrentPage(old);
		L3.transitionPages(old, null, 'backward');
		L3.transitionButtons('return');
		L3.stack.length = 0;
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		loginSetup();
		L3.localization.changeLanguage($$('comboboxLanguage').getValue());
		sources.family.declareDependencies('father');
		sources.family.declareDependencies('mother');
		sources.family.declareDependencies('guardian');
		currentFamilyID = null;
	};// @lock

	comboboxLanguage.change = function comboboxLanguage_change (event)// @startlock
	{// @endlock
		L3.localization.changeLanguage($$('comboboxLanguage').getValue());
	};// @lock

	buttonNextStep.click = function buttonNextStep_click (event)// @startlock
	{// @endlock
		var current = L3.step[L3.stack.length-1], next;
		
		saveCurrentPage(current);
		
		next = getNextPage(current);
		
		if (next) {
			L3.stack.push(next);
			switchPages(current, next);
		}
	};// @lock

	buttonGoBack.click = function buttonGoBack_click (event)// @startlock
	{// @endlock
		var old = L3.stack.pop();
		
		saveCurrentPage(old);
		
		if (L3.stack.length === 0) {
			L3.transitionPages(old, null, 'backward');
			L3.transitionButtons('return');
		}
		else {
			L3.transitionPages(old, L3.stack[L3.stack.length-1], 'backward');
			$$('buttonNextStep').enable();
		}
	};// @lock

	buttonStart.click = function buttonStart_click (event)// @startlock
	{// @endlock
		var next = L3.step[0];
		L3.stack.push(next);
		L3.transitionButtons('start');
		L3.transitionPages(null, next);
		$$('buttonNextStep').disable();

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("buttonRegistrationDialogClose", "click", buttonRegistrationDialogClose.click, "WAF");
	WAF.addListener("iconAdmin", "click", iconAdmin.click, "WAF");
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
