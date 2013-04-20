
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
	
	// eventHandlers// @lock

	comboboxSecondaryContact.change = function comboboxSecondaryContact_change (event)// @startlock
	{// @endlock
		var v;
		
		console.log('comboboxSecondaryContact.change', event);
		v = $$(getHtmlId('comboboxSecondaryContact')).getValue();
		if (v !== sources.family.secondaryPhoneType) {
			var a = v.split('_');
			sources.family.getAttribute('secondaryPhone').setValue(sources[a[0]][a[1]]);
			sources.family.save({ onSuccess: function(e) { console.log('Save secondary contact', e) } });
		}
	};// @lock

	comboboxPrimaryContact.change = function comboboxPrimaryContact_change (event)// @startlock
	{// @endlock
		var v;
		
		console.log('comboboxPrimaryContact.change', event);
		v = $$(getHtmlId('comboboxPrimaryContact')).getValue();
		if (v !== sources.family.primaryPhoneType) {
			var a = v.split('_');
			sources.family.getAttribute('primaryPhone').setValue(sources[a[0]][a[1]]);
			sources.family.save({ onSuccess: function(e) { console.log('Save primary contact', e) } });
		}
	};// @lock

	textFieldEmail.change = function textFieldEmail_change (event)// @startlock
	{// @endlock
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
