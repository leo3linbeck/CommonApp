
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'ContactInfoEntry';
	// @endregion// @endlock
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var comboboxSecondaryContact = {};	// @combobox
	var comboboxPrimaryContact = {};	// @combobox
	var textFieldEmail = {};	// @textField
	var textFieldCellPhone = {};	// @textField
	var textFieldWorkPhone = {};	// @textField
	var textFieldHomePhone = {};	// @textField
	// @endregion// @endlock
	
	function updateContactData(that, f) {
		var s = false;
		var t = sources.contactList.relationship + '_' + f;
		var v = $$(that.id).getValue();
		if (t === $$(getHtmlId('comboboxPrimaryContact')).getValue()) {
			sources.family.getAttribute('primaryPhone').setValue(v);
			s = true;
		}
		if (t === $$(getHtmlId('comboboxSecondaryContact')).getValue()) {
			sources.family.getAttribute('secondaryPhone').setValue(v);
			s = true;
		}
		if (s) {
			sources.family.save({ onSuccess: function(e) { console.log('family contact updated', e); } });
		}
	}
	
	// eventHandlers// @lock

	comboboxSecondaryContact.change = function comboboxSecondaryContact_change (event)// @startlock
	{// @endlock
		var v;
		
		console.log('comboboxSecondaryContact.change', event);
		v = $$(getHtmlId('comboboxSecondaryContact')).getValue();
		if (v !== sources.family.secondaryPhoneType) {
			sources.family.getPhoneByType(
				{
					phoneType: v,
					debug: false
				},
				{
					onSuccess: function(event) {
						console.log('family.getPhoneByType secondary', event);
						sources.family.getAttribute('secondaryPhoneType').setValue(v);
						sources.family.getAttribute('secondaryPhone').setValue(event.result);
						sources.family.save({ onSuccess: function(e) { console.log('Save secondary contact', e) } });
					},
					onError: function(error) {
						console.log('ERROR: family.getPhoneByType secondary', error);
					}
				}
			);			
		}
	};// @lock

	comboboxPrimaryContact.change = function comboboxPrimaryContact_change (event)// @startlock
	{// @endlock
		var v;

		console.log('comboboxPrimaryContact.change', event);
		v = $$(getHtmlId('comboboxPrimaryContact')).getValue();
		if (v !== sources.family.primaryPhoneType) {
			sources.family.getPhoneByType(
				{
					phoneType: v,
					debug: false
				},
				{
					onSuccess: function(event) {
						console.log('family.getPhoneByType primary', event);
						sources.family.getAttribute('primaryPhoneType').setValue(v);
						sources.family.getAttribute('primaryPhone').setValue(event.result);
						sources.family.save({ onSuccess: function(e) { console.log('Save primary contact', e) } });
					},
					onError: function(error) {
						console.log('ERROR: family.getPhoneByType primary', error);
					}
				}
			);			
		}
	};// @lock

	textFieldEmail.change = function textFieldEmail_change (event)// @startlock
	{// @endlock
		updateContactData(this, 'emailAddress');
		sources.contactList.save(
			{
				onSuccess: function(event) {
					console.log('Email saved', event);
				}
			}
		);
	};// @lock

	textFieldCellPhone.change = function textFieldCellPhone_change (event)// @startlock
	{// @endlock
		L3.formatPhoneAttribute(this);
		updateContactData(this, 'cellPhone');
		sources.contactList.save(
			{
				onSuccess: function(event) {
					console.log('Cell phone saved', event);
				}
			}
		);
	};// @lock

	textFieldWorkPhone.change = function textFieldWorkPhone_change (event)// @startlock
	{// @endlock
		L3.formatPhoneAttribute(this);
		updateContactData(this, 'workPhone');
		sources.contactList.save(
			{
				onSuccess: function(event) {
					console.log('Work phone saved', event);
				}
			}
		);
	};// @lock

	textFieldHomePhone.change = function textFieldHomePhone_change (event)// @startlock
	{// @endlock
		L3.formatPhoneAttribute(this);
		updateContactData(this, 'homePhone');
		sources.contactList.save(
			{
				onSuccess: function(event) {
					console.log('Home phone saved', event);
				}
			}
		);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_comboboxSecondaryContact", "change", comboboxSecondaryContact.change, "WAF");
	WAF.addListener(this.id + "_comboboxPrimaryContact", "change", comboboxPrimaryContact.change, "WAF");
	WAF.addListener(this.id + "_textFieldEmail", "change", textFieldEmail.change, "WAF");
	WAF.addListener(this.id + "_textFieldCellPhone", "change", textFieldCellPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldWorkPhone", "change", textFieldWorkPhone.change, "WAF");
	WAF.addListener(this.id + "_textFieldHomePhone", "change", textFieldHomePhone.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
