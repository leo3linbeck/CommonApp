
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'SchoolMap';
	// @endregion// @endlock
	
	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
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
	
	function updateSchoolList() {
		var d = getDistance();
		
		L3.clearGoogleMapMarkers();
		source.family.getNearbySchools(
			{
				familyID: source.family.ID,
				distance: (d ? d : 5),
				selected: $$(getHtmlId('checkboxShowSelected')).getValue(),
				debug: false 
			},
			{
				onSuccess: function(response) {
					if (response.result) {
						$comp.sources.schoolOption.setEntityCollection(response.result);
						L3.googleMap.setZoom(parseInt(12 - 0.15 * d));
						google.maps.event.trigger(L3.googleMap, 'resize');
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

//	function showSelectedSchools() {
//		var d = getDistance();
//		
//		$comp.sources.schoolOption.query('family.ID === :1 AND distance <= :2 AND selected === true',
//			{
//				onSuccess: function(response) {
////					L3.addGoogleMapMarker($comp.sources.schoolMapCoords, 'green');
//				},
//				onError: function(error) {
//					$$(getHtmlId('richTextVerifyAddressError')).setValue(error.message);
//				},
//				params: [source.family.ID, d]
//			}
//		);
//	}

	// eventHandlers// @lock
	
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
		updateSchoolList();
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
		updateSchoolList();

	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_schoolOption", "onCurrentElementChange", schoolOptionEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_checkboxShowSelected", "change", checkboxShowSelected.change, "WAF");
	WAF.addListener(this.id + "_dataGridSchools", "onRowDraw", dataGridSchools.onRowDraw, "WAF");
	WAF.addListener(this.id + "_textFieldDistance", "change", textFieldDistance.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
