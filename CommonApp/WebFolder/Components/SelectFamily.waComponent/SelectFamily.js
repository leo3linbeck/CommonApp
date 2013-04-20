
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'SelectFamily';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var iconTrashCan = {};	// @icon
	var iconClearLine = {};	// @icon
	var buttonCreateFamily = {};	// @button
	var textFieldFamilyName = {};	// @textField
	// @endregion// @endlock
	
	sources.family.all(
		{
			onSuccess: function(event) {
				console.log('family.all', event);
			},
			onError: function(error) {
				console.log('ERROR: family.all', error);
			},
			orderBy: 'name'
		}
	)
	
	function searchFamilyName() {
		sources.family.query('name == :1',
			{
				onSuccess: function(event) {
					console.log('textFieldFamilyName.keyup', event);
				},
				onError: function(error) {
					console.log('ERROR: textFieldFamilyName.keyup', error);
				},
				orderBy: 'name',
				params: [ $$(getHtmlId('textFieldFamilyName')).getValue() + WAF.wildchar ]
			}
		);
	}
	
	// eventHandlers// @lock

	iconTrashCan.click = function iconTrashCan_click (event)// @startlock
	{// @endlock
		if (confirm('Are you sure you want to delete the ' + sources.family.name + ' family? This operation cannot be undone.')) {
			sources.family.removeCurrent();
			sources.family.all();
			$$(getHtmlId('textFieldFamilyName')).setValue('');
		}
	};// @lock

	iconClearLine.click = function iconClearLine_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('textFieldFamilyName')).setValue('');
		searchFamilyName();
		$$(getHtmlId('textFieldFamilyName')).focus();
	};// @lock

	buttonCreateFamily.click = function buttonCreateFamily_click (event)// @startlock
	{// @endlock
		sources.family.addNewElement();
		sources.family.getAttribute('name').setValue( L3.toTitleCase( $$(getHtmlId('textFieldFamilyName')).getValue() ) );
		sources.family.save(
			{ 
				onSuccess: function(event) {
					console.log('family.save', event);
				},
				onError: function(error) {
					console.log('ERROR: family.save', error);
				}
			}
		);
	};// @lock

	textFieldFamilyName.keyup = function textFieldFamilyName_keyup (event)// @startlock
	{// @endlock
		searchFamilyName();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_iconTrashCan", "click", iconTrashCan.click, "WAF");
	WAF.addListener(this.id + "_iconClearLine", "click", iconClearLine.click, "WAF");
	WAF.addListener(this.id + "_buttonCreateFamily", "click", buttonCreateFamily.click, "WAF");
	WAF.addListener(this.id + "_textFieldFamilyName", "keyup", textFieldFamilyName.keyup, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
