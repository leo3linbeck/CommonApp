
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var dataGridSchoolOptions = {};	// @dataGrid
	var buttonReport = {};	// @button
	var textFieldSchoolName = {};	// @textField
	var switchboxShowSelected = {};	// @switchbox
	var selectCategory = {};	// @select
	var sliderDistance = {};	// @slider
	var buttonLoad = {};	// @button
	var documentEvent = {};	// @document
	var textFieldMainZipCodeEntry = {};	// @textField
	var textFieldMainStateEntry = {};	// @textField
	var textFieldMainCityEntry = {};	// @textField
	var textFieldMainStreet2Entry = {};	// @textField
	var textFieldMainStreet1Entry = {};	// @textField
// @endregion// @endlock

	function setupSearchMap() {
		console.log('Entering setupSchoolMap');
		sources.family.declareDependencies('schoolOptions');
		if (currentFamilyID) {
			sources.family.query('ID === :1',
				{
					onSuccess: function(event) {
						var d = event.dataSource;
						console.log('setupSearchMap', event);
						maxDistance = d.searchDistance;
						sources.maxDistance.sync();
						$$('bodySchools').show();
						L3.markers = [];
						L3.loadGoogleMap('containerGoogleMap',
							maxDistance,
							d.mainMapCoords,
							d.mainUSPSLine1 + '\n' + d.mainUSPSLine2
						);
						google.maps.event.trigger(L3.googleMap, 'resize');
					},
					onError: function(error) {
						console.log('ERROR: setupSearchMap', error);
					},
					params: [currentFamilyID]
				}
			);
		}
	}
	
	function updateSchoolList(recalcDistance) {
		Addresses.getNearbySchoolsAsync(
			{
				onSuccess: function(event) {
					console.log('getGoogleMarkers', event);
					if (event) {
						L3.googleMapLoadMarkers(event.result, sources.schoolOption);
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
					recalc: (recalcDistance || (sources.schoolOption.length === 0)),
					selected: showSelectedSchools,
					name: ($$('textFieldSchoolName').getValue() || '') + WAF.wildchar,
					category: $$('selectCategory').getValue(),
					debug: false 
				}]
			}
		);
	}
	
	function loadFamilyAndSetupSearchMap() {
		sources.family.conjureID(L3.getMainAddressParams(),
			{
				onSuccess: function(event) {
					console.log('loadFamilyAndSetupSearchMap', event);
					currentFamilyID = event.result;
					setupSearchMap();
				},
				onError: function(error) {
					console.log('ERROR: loadFamilyAndSetupSearchMap', error);
				}
			}
		);
	}

// eventHandlers// @lock

	dataGridSchoolOptions.onRowClick = function dataGridSchoolOptions_onRowClick (event)// @startlock
	{// @endlock
		google.maps.event.trigger(L3.markerMap[sources.schoolOption.ID], 'click');
	};// @lock

	dataGridSchoolOptions.onRowDblClick = function dataGridSchoolOptions_onRowDblClick (event)// @startlock
	{// @endlock
		var a, v;
		
		console.log('dataGridSchools.onRowDblClick', event);
		a = sources.schoolOption.getAttribute('selected');
		v = a.getValue() ? false : true;
		a.setValue(v);
		sources.schoolOption.save({ onSuccess: function() {} });
	};// @lock

	buttonReport.click = function buttonReport_click (event)// @startlock
	{// @endlock
		if (currentFamilyID) {
			L3.generateReport();
		}
	};// @lock

	textFieldSchoolName.keyup = function textFieldSchoolName_keyup (event)// @startlock
	{// @endlock
		updateSchoolList(false);
	};// @lock

	switchboxShowSelected.click = function switchboxShowSelected_click (event)// @startlock
	{// @endlock
		updateSchoolList(false);
	};// @lock

	selectCategory.change = function selectCategory_change (event)// @startlock
	{// @endlock
		updateSchoolList(false);
	};// @lock

	sliderDistance.slidechange = function sliderDistance_slidechange (event)// @startlock
	{// @endlock
		updateSchoolList(true);
		if (L3.googleMap) {
			sources.family.searchDistance = maxDistance;
			sources.family.save({onSuccess: function(e) { console.log('sources.family.save slider', e) } });
			L3.googleMap.setZoom(L3.googleMapCalculateZoom(maxDistance));
		}
	};// @lock

	buttonLoad.click = function buttonLoad_click (event)// @startlock
	{// @endlock
		loadFamilyAndSetupSearchMap();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		L3.localization.changeLanguage('en');
		$$('buttonLoad').disable();
	};// @lock

	textFieldMainZipCodeEntry.change = function textFieldMainZipCodeEntry_change (event)// @startlock
	{// @endlock
		L3.verifyMainAddress(this, 'tablet');
	};// @lock

	textFieldMainStateEntry.change = function textFieldMainStateEntry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToUpperCase(this);
		L3.verifyMainAddress(this, 'tablet');
	};// @lock

	textFieldMainCityEntry.change = function textFieldMainCityEntry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyMainAddress(this, 'tablet');
	};// @lock

	textFieldMainStreet2Entry.change = function textFieldMainStreet2Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyMainAddress(this, 'tablet');
	};// @lock

	textFieldMainStreet1Entry.change = function textFieldMainStreet1Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyMainAddress(this, 'tablet');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("dataGridSchoolOptions", "onRowClick", dataGridSchoolOptions.onRowClick, "WAF");
	WAF.addListener("dataGridSchoolOptions", "onRowDblClick", dataGridSchoolOptions.onRowDblClick, "WAF");
	WAF.addListener("buttonReport", "click", buttonReport.click, "WAF");
	WAF.addListener("textFieldSchoolName", "keyup", textFieldSchoolName.keyup, "WAF");
	WAF.addListener("switchboxShowSelected", "click", switchboxShowSelected.click, "WAF");
	WAF.addListener("selectCategory", "change", selectCategory.change, "WAF");
	WAF.addListener("sliderDistance", "slidechange", sliderDistance.slidechange, "WAF");
	WAF.addListener("buttonLoad", "click", buttonLoad.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("textFieldMainZipCodeEntry", "change", textFieldMainZipCodeEntry.change, "WAF");
	WAF.addListener("textFieldMainStateEntry", "change", textFieldMainStateEntry.change, "WAF");
	WAF.addListener("textFieldMainCityEntry", "change", textFieldMainCityEntry.change, "WAF");
	WAF.addListener("textFieldMainStreet2Entry", "change", textFieldMainStreet2Entry.change, "WAF");
	WAF.addListener("textFieldMainStreet1Entry", "change", textFieldMainStreet1Entry.change, "WAF");
// @endregion
};// @endlock
