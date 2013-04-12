
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'SchoolMap';
	// @endregion// @endlock
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonLoadSchools = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonLoadSchools.click = function buttonLoadSchools_click (event)// @startlock
	{// @endlock
		var d;
		
		d = $$(getHtmlId('textFieldDistance')).getValue();
		if (d) {
			source.family.getNearbySchools(
				{
					familyID: source.family.ID,
					distance: d,
					debug: false 
				},
				{
					onSuccess: function(response) {
						if (response.result) {
							$comp.sources.familySchool.setEntityCollection(response.result);
						}
						else {
							$$(getHtmlId('richTextVerifyAddressError')).setValue('Validation failed!');
						}
					},
					onError: function(error) {
						$$(getHtmlId('richTextVerifyAddressError')).setValue(error.message);
					}
				}
			);
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonLoadSchools", "click", buttonLoadSchools.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
