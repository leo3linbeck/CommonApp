
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
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
	
	function clearEntryMessage() {
		$$('richTextCreateUserMessage').setValue('');
	}



// eventHandlers// @lock

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
	WAF.addListener("buttonAddUser", "click", buttonAddUser.click, "WAF");
// @endregion
};// @endlock
