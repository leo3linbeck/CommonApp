
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'SelectFamily';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonCreateFamily = {};	// @button
	var textFieldFamilyName = {};	// @textField
	// @endregion// @endlock
	
	sources.family.all(
		{
			onSuccess: function(event) {
				console.log('selectedFamily.all', event);
			},
			onError: function(error) {
				console.log('ERROR: selectedFamily.all', error);
			},
			orderBy: 'name'
		}
	)
	// eventHandlers// @lock

	buttonCreateFamily.click = function buttonCreateFamily_click (event)// @startlock
	{// @endlock
		sources.family.addNewElement();
		sources.family.getAttribute('name').setValue($$(getHtmlId('textFieldFamilyName')).getValue());
		sources.family.save(
			{ 
				onSuccess: function(event) {
					console.log('selectedFamily.save', event);
				},
				onError: function(error) {
					console.log('ERROR: selectedFamily.save', error);
				}
			}
		);
	};// @lock

	textFieldFamilyName.keyup = function textFieldFamilyName_keyup (event)// @startlock
	{// @endlock
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
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonCreateFamily", "click", buttonCreateFamily.click, "WAF");
	WAF.addListener(this.id + "_textFieldFamilyName", "keyup", textFieldFamilyName.keyup, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
