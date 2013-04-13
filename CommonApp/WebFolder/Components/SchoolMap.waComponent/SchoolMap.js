
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'SchoolMap';
	// @endregion// @endlock
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var dataGridSchools = {};	// @dataGrid
	var textFieldDistance = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	dataGridSchools.onRowDraw = function dataGridSchools_onRowDraw (event)// @startlock
	{// @endlock
		if (event.element) {
			L3.addGoogleMapMarker(event.element.schoolMapCoords, 'blue');				
		}
	};// @lock

	dataGridSchools.onRowClick = function dataGridSchools_onRowClick (event)// @startlock
	{// @endlock
		L3.addGoogleMapMarker(this.source.schoolMapCoords, 'green');
	};// @lock

	function updateSchoolList() {
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
							$comp.sources.schoolChoice.setEntityCollection(response.result);
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
	}

	textFieldDistance.change = function textFieldDistance_change (event)// @startlock
	{// @endlock
		L3.clearGoogleMapMarkers();
		updateSchoolList();
		L3.googleMap.setZoom(parseInt(12 - 0.12 * this.getValue()));
		google.maps.event.trigger(L3.googleMap, 'resize');
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dataGridSchools", "onRowDraw", dataGridSchools.onRowDraw, "WAF");
	WAF.addListener(this.id + "_dataGridSchools", "onRowClick", dataGridSchools.onRowClick, "WAF");
	WAF.addListener(this.id + "_textFieldDistance", "change", textFieldDistance.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
