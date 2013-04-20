
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'SchoolMap';
	// @endregion// @endlock
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldSchoolName = {};	// @textField
	var comboboxCategory = {};	// @combobox
	var schoolOptionEvent = {};	// @dataSource
	var checkboxShowSelected = {};	// @checkbox
	var dataGridSchools = {};	// @dataGrid
	var textFieldDistance = {};	// @textField
	// @endregion// @endlock
	
	$$(getHtmlId('textFieldDistance')).setValue(5);
	
	function getDistance() {
		var d;
		
		d = $$(getHtmlId('textFieldDistance')).getValue();
		if (!d) {
			$$(getHtmlId('textFieldDistance')).setValue(5);
			d = 5;
		}
		
		return d;
	}
	
	function updateSchoolList(recalcDistance) {
		var d = getDistance();
		
		L3.clearGoogleMapMarkers();
		source.family.getNearbySchools(
			{
				familyID: sources.family.ID,
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
						L3.googleMap.setZoom(parseInt(12 - 0.15 * d));
						google.maps.event.trigger(L3.googleMap, 'resize');
					}
					else {
						$$(getHtmlId('richTextVerifyAddressError')).setValue('Loading failed!');
					}
				},
				onError: function(error) {
					$$(getHtmlId('richTextVerifyAddressError')).setValue(error.message);
				}
			}
		);
	}

	// eventHandlers// @lock

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

	schoolOptionEvent.onCurrentElementChange = function schoolOptionEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		if (event.dataSource.schoolMapCoords) {
			var d = event.dataSource;
			var info = getInfoWindowText(d);
			L3.addGoogleMapMarker(event.dataSource.schoolMapCoords, 'green', d.schoolCategory, info);
		}
	};// @lock

	checkboxShowSelected.change = function checkboxShowSelected_change (event)// @startlock
	{// @endlock
		updateSchoolList(false);
	};// @lock

	dataGridSchools.onRowDblClick = function dataGridSchools_onRowDblClick (event)// @startlock
	{// @endlock
		var a;
		
		console.log('dataGridSchools.onRowDblClick', event);
		a = sources.schoolOption.getAttribute('selected');
		a.setValue(a.getValue() ? false : true);
		sources.schoolOption.save({ onSuccess: function() {} });
	};// @lock

	dataGridSchools.onRowDraw = function dataGridSchools_onRowDraw (event)// @startlock
	{// @endlock
		if (event.element) {
			var d = event.element;
			var info = getInfoWindowText(d);
			L3.addGoogleMapMarker(event.element.schoolMapCoords, 'blue', d.schoolCategory, info);				
		}
	};// @lock

	textFieldDistance.change = function textFieldDistance_change (event)// @startlock
	{// @endlock
		sources.family.save({onSuccess: function(event) {}});
		updateSchoolList(true);

	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldSchoolName", "keyup", textFieldSchoolName.keyup, "WAF");
	WAF.addListener(this.id + "_comboboxCategory", "change", comboboxCategory.change, "WAF");
	WAF.addListener(this.id + "_dataGridSchools", "onRowDblClick", dataGridSchools.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_schoolOption", "onCurrentElementChange", schoolOptionEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_checkboxShowSelected", "change", checkboxShowSelected.change, "WAF");
	WAF.addListener(this.id + "_dataGridSchools", "onRowDraw", dataGridSchools.onRowDraw, "WAF");
	WAF.addListener(this.id + "_textFieldDistance", "change", textFieldDistance.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
