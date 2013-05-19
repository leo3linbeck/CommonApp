
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var buttonBind = {};	// @button
	var textFieldFamilyName = {};	// @textField
	var textFieldStreetQuery = {};	// @textField
	var buttonFindUser = {};	// @button
	var buttonAddUser = {};	// @button
// @endregion// @endlock

	function entryErrorMessage(m) {
		$$('richTextCreateUserMessage').setValue(m);
		$$('richTextCreateUserMessage').setTextColor('red');		
	}

	function entrySuccessMessage(m) {
		$$('richTextCreateUserMessage').setValue(m);
		$$('richTextCreateUserMessage').setTextColor('green');		
	}
	
	function findErrorMessage(m) {
		$$('richTextUserFoundMessage').setValue(m);
		$$('richTextUserFoundMessage').setTextColor('red');		
	}
	
	function findSuccessMessage(m) {
		$$('richTextUserFoundMessage').setValue(m);
		$$('richTextUserFoundMessage').setTextColor('green');		
	}
	
	function bindErrorMessage(m) {
		$$('richTextBindMessage').setValue(m);
		$$('richTextBindMessage').setTextColor('red');		
	}
	
	function bindSuccessMessage(m) {
		$$('richTextBindMessage').setValue(m);
		$$('richTextBindMessage').setTextColor('green');		
	}
	


// eventHandlers// @lock

	buttonBind.click = function buttonBind_click (event)// @startlock
	{// @endlock
		var familyName = $$('textFieldFamilyName').getValue();
		
		if (!bindUserID) {
			bindErrorMessage('You must find a user before binding  - go to Step 1');
		}
		else if (!sources.family.ID) {
			bindErrorMessage('You must select an address before binding - go to Step 2');
		}
		else if (!familyName) {
			bindErrorMessage('You must enter a family name before binding - go to Step 3');
		}
		else {
			Admin.bindUserToAddressAsync(
				{
					onSuccess: function(evt) {
						console.log('Admin.createNewUserAsync', evt);
						sources.family.serverRefresh({forceReload: true});
						bindSuccessMessage('User ' + evt.user.fullName + ' successfully bound to address!');
					},
					onError: function(err) {
						console.log('ERROR: Admin.createNewUserAsync', err);
						bindErrorMessage('Failed to bind user: ' + err.message);
					},
					params: [familyName, sources.family.ID, bindUserID]
				}
			);
		}

	};// @lock

	textFieldFamilyName.change = function textFieldFamilyName_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldStreetQuery.keyup = function textFieldStreetQuery_keyup (event)// @startlock
	{// @endlock
		sources.family.query('mainUSPSLine1 == :1',
			{
				onSuccess: function(event) {
					console.log('textFieldStreetQuery.keyup', evt);
				},
				onError: function(error) {
					console.log('ERROR: textFieldStreetQuery.keyup', err);
				},
				orderBy: 'mainUSPSLine1',
				params: [ $$('textFieldStreetQuery').getValue() + WAF.wildchar ]
			}
		);

	};// @lock

	buttonFindUser.click = function buttonFindUser_click (event)// @startlock
	{// @endlock
		Admin.findUserAsync(
			{
				onSuccess: function(evt) {
					console.log('Admin.findUserAsync', evt);
					if (evt) {
						findSuccessMessage('User ' + evt.fullName + ' found!');
						bindUserID = evt.ID;
					}
					else {
						findErrorMessage('User not found');
						bindUserID = null;
					}
				},
				onError: function(err) {
					console.log('ERROR: Admin.findUserAsync', err);
					findErrorMessage('Failed to find user: ' + err.message);
					bindUserID = null;
				},
				params: [$$('textFieldUsernameBinding').getValue()]
			}
		);
	};// @lock

	buttonAddUser.click = function buttonAddUser_click (event)// @startlock
	{// @endlock
		var fullname = $$('textFieldFullName').getValue();
		var username = $$('textFieldUsername').getValue();
		var password = $$('textFieldTempPassword').getValue();
		
		if (!fullname) {
			entryErrorMessage('Missing Full Name - required entry');
		}
		else if (!username) {
			entryErrorMessage('Missing Username - required entry');
		}
		else if (!password) {
			entryErrorMessage('Missing Password - required entry');
		}
		else if (password.length < 6) {
			entryErrorMessage('Password too short - must be at least 6 characters');
		}
		else {
			Admin.createNewUserAsync(
				{
					onSuccess: function(evt) {
						console.log('Admin.createNewUserAsync', evt);
						entrySuccessMessage('User ' + evt.name + ' successfully created!');
					},
					onError: function(err) {
						console.log('ERROR: Admin.createNewUserAsync', err);
						entryErrorMessage('Failed to create new user: ' + err.message);
					},
					params: [fullname, username, password]
				}
			);
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("buttonBind", "click", buttonBind.click, "WAF");
	WAF.addListener("textFieldFamilyName", "change", textFieldFamilyName.change, "WAF");
	WAF.addListener("textFieldStreetQuery", "keyup", textFieldStreetQuery.keyup, "WAF");
	WAF.addListener("buttonFindUser", "click", buttonFindUser.click, "WAF");
	WAF.addListener("buttonAddUser", "click", buttonAddUser.click, "WAF");
// @endregion
};// @endlock
