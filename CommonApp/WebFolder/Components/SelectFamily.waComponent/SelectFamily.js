
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'SelectFamily';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldFamilyName = {};	// @textField
	// @endregion// @endlock
	
	sources.family.all(
		{
			onSuccess: function(response) {

			},
			onError: function(error) {
				alert(error.message);
			},
			orderBy: 'name'
		}
	)
	// eventHandlers// @lock

	textFieldFamilyName.keyup = function textFieldFamilyName_keyup (event)// @startlock
	{// @endlock
		sources.family.query('name == :1',
			{
				onSuccess: function(response) {

				},
				onError: function(error) {
					alert(error.message);
				},
				orderBy: 'name',
				params: [ $$(getHtmlId('textFieldFamilyName')).getValue() + '*' ]
			}
		);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldFamilyName", "keyup", textFieldFamilyName.keyup, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
