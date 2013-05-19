
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'SchoolMap';
	// @endregion// @endlock
	
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

		source.family.getNearbySchools(
			{
				familyID: sources.family.ID,
				distance: sources.family.searchDistance,
				recalc: (recalcDistance || sources.schoolOption.length === 0),
				selected: $$(getHtmlId('checkboxShowSelected')).getValue(),
				name: $$(getHtmlId('textFieldSchoolName')).getValue() + WAF.wildchar,
				category: $$(getHtmlId('comboboxCategory')).getValue(),
				debug: false 
			},
			{
				onSuccess: function(event) {
					console.log('family.getNearbySchools', event);
					if (event.result) {
						sources.schoolOption.setEntityCollection(event.result);
						event.result.toArray('schoolName, schoolMapCoords, selected',
							{
								onSuccess: function(evt) {
									console.log('family.getNearbySchools getMarkerData', evt);
									L3.googleMapLoadMarkers(evt.result);
								},
								onError: function(err) {
									console.log('ERROR: family.getNearbySchools getMarkerData', err);
								}
							}
						);
					}
				},
				onError: function(error) {
					console.log('ERROR: family.getNearbySchools', error);
				}
			}
		);
	}

	// eventHandlers// @lock

	sliderDistance.slidechange = function sliderDistance_slidechange (event)// @startlock
	{// @endlock
		updateSchoolList(true);

		if (L3.googleMap) {
			L3.googleMap.setZoom(L3.googleMapCalculateZoom(sources.family.searchDistance));
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
	
	function getInfoWindowText(d) {
		return ('<h4>' + d.schoolName + '</h4><span>' +
				'<br/>Starting Grade: ' + L3.gradeMap[d.schoolStart] + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
				'Ending Grade: ' + L3.gradeMap[d.schoolEnd] + 
				'<br/>Enrollment: ' + d.schoolEnroll +  '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
				'Rating: ' + d.schoolRating + ' (out of 100)' +
				'<br/>Attendance: ' + d.schoolAttend +  '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' +
				'Graduation: ' + d.schoolGraduate + '</span>'
			);
	}

	checkboxShowSelected.change = function checkboxShowSelected_change (event)// @startlock
	{// @endlock
		updateSchoolList(false);
	};// @lock

	dataGridSchools.onRowDblClick = function dataGridSchools_onRowDblClick (event)// @startlock
	{// @endlock
		var a, v;
		
		console.log('dataGridSchools.onRowDblClick', event);
		a = sources.schoolOption.getAttribute('selected');
		v = a.getValue() ? false : true;
		a.setValue(v);
		sources.schoolOption.save({ onSuccess: function() {} });
		L3.googleMapAddMarker(sources.schoolOption.schoolMapCoords, (v ? 'green' : 'blue'), sources.schoolOption.schoolName, getInfoWindowText(sources.schoolOption));
	};// @lock

	// @region eventManager// @startlock
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
