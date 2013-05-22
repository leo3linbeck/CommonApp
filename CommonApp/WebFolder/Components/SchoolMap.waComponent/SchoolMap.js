
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'SchoolMap';
	// @endregion// @endlock
	
	this.setupSchoolMap = function setupSchoolMap(current, next) {
		console.log('setupSchoolMap', current, next);
		if (currentFamilyID) {
			sources.family.query('ID === :1',
				{
					onSuccess: function(event) {
						var d = event.dataSource;
						console.log('setupSchoolMap', event);
						maxDistance = d.searchDistance;
						sources.maxDistance.sync();
						L3.transitionPages(current, next);
						L3.loadGoogleMap('componentSchoolMap_containerGoogleMap', maxDistance, d.mainMapCoords, d.mainUSPSLine1 + '\n' + d.mainUSPSLine2);
					},
					onError: function(error) {
						console.log('ERROR: setupSchoolMap', error);
					},
					params: [currentFamilyID]
				}
			);
		}
	}
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var sliderDistance = {};	// @slider
	var textFieldSchoolName = {};	// @textField
	var comboboxCategory = {};	// @combobox
	var checkboxShowSelected = {};	// @checkbox
	var dataGridSchools = {};	// @dataGrid
	// @endregion// @endlock
	
	function updateSchoolList(recalcDistance) {
		var d =  parseInt($$(getHtmlId('richTextDistance')).getValue(), 10);
		
		L3.clearGoogleMapMarkers();

		Addresses.getNearbySchoolsAsync(
			{
				onSuccess: function(event) {
					console.log('family.getNearbySchools', event);
					if (event) {
						L3.googleMapLoadMarkers(event.result);
						sources.schoolOption.query(event.queryString,
							{
								onSuccess: function (evt) {
									console.log('schoolOption.query', evt);
								},
								onError: function(err) {
									console.log('ERROR: schoolOption.query', err);
								},
								orderBy: 'distance'
							}
						);
					}
				},
				onError: function(error) {
					console.log('ERROR: family.getNearbySchools', error);
				},
				params: [{
					familyID: currentFamilyID,
					distance: maxDistance,
					recalc: (recalcDistance || sources.schoolOption.length === 0),
					selected: $$(getHtmlId('checkboxShowSelected')).getValue(),
					name: $$(getHtmlId('textFieldSchoolName')).getValue() + WAF.wildchar,
					category: $$(getHtmlId('comboboxCategory')).getValue(),
					debug: false 
				}]
			}
		);
	}

	// eventHandlers// @lock

	sliderDistance.slidechange = function sliderDistance_slidechange (event)// @startlock
	{// @endlock
		updateSchoolList(true);
		if (L3.googleMap) {
			sources.family.searchDistance = maxDistance;
			sources.family.save({onSuccess: function(e) { console.log('sources.family.save slider', e) } });
			L3.googleMap.setZoom(L3.googleMapCalculateZoom(maxDistance));
		}
	};// @lock

	textFieldSchoolName.keyup = function textFieldSchoolName_keyup (event)// @startlock
	{// @endlock
		updateSchoolList(false);
	};// @lock

	comboboxCategory.change = function comboboxCategory_change (event)// @startlock
	{// @endlock
		updateSchoolList(false);
	};// @lock
	
	checkboxShowSelected.change = function checkboxShowSelected_change (event)// @startlock
	{// @endlock
		updateSchoolList(false);
	};// @lock

	dataGridSchools.onRowClick = function dataGridSchools_onRowClick (event)// @startlock
	{// @endlock
		google.maps.event.trigger(L3.markerMap[sources.schoolOption.ID], 'click');
	};// @lock

	dataGridSchools.onRowDblClick = function dataGridSchools_onRowDblClick (event)// @startlock
	{// @endlock
		var a, v;
		
		console.log('dataGridSchools.onRowDblClick', event);
		a = sources.schoolOption.getAttribute('selected');
		v = a.getValue() ? false : true;
		a.setValue(v);
		sources.schoolOption.save({ onSuccess: function() {} });

	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dataGridSchools", "onRowClick", dataGridSchools.onRowClick, "WAF");
	WAF.addListener(this.id + "_sliderDistance", "slidechange", sliderDistance.slidechange, "WAF");
	WAF.addListener(this.id + "_textFieldSchoolName", "keyup", textFieldSchoolName.keyup, "WAF");
	WAF.addListener(this.id + "_comboboxCategory", "change", comboboxCategory.change, "WAF");
	WAF.addListener(this.id + "_dataGridSchools", "onRowDblClick", dataGridSchools.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_checkboxShowSelected", "change", checkboxShowSelected.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
