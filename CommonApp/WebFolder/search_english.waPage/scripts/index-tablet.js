
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var buttonNextStep = {};	// @button
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
						loadSchoolMarkers();
					},
					onError: function(error) {
						console.log('ERROR: setupSearchMap', error);
					},
					params: [currentFamilyID]
				}
			);
		}
	}
	
	function loadSchoolMarkers() {
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
					recalc: (sources.schoolOption.length === 0),
					selected: false,
					name: WAF.wildchar,
					category: 'All',
//					selected: $$(getHtmlId('checkboxShowSelected')).getValue(),
//					name: $$(getHtmlId('textFieldSchoolName')).getValue() + WAF.wildchar,
//					category: $$(getHtmlId('comboboxCategory')).getValue(),
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

	buttonNextStep.click = function buttonNextStep_click (event)// @startlock
	{// @endlock
		loadFamilyAndSetupSearchMap();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		L3.localization.changeLanguage('en');
		$$('buttonNextStep').disable();
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
	WAF.addListener("buttonNextStep", "click", buttonNextStep.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("textFieldMainZipCodeEntry", "change", textFieldMainZipCodeEntry.change, "WAF");
	WAF.addListener("textFieldMainStateEntry", "change", textFieldMainStateEntry.change, "WAF");
	WAF.addListener("textFieldMainCityEntry", "change", textFieldMainCityEntry.change, "WAF");
	WAF.addListener("textFieldMainStreet2Entry", "change", textFieldMainStreet2Entry.change, "WAF");
	WAF.addListener("textFieldMainStreet1Entry", "change", textFieldMainStreet1Entry.change, "WAF");
// @endregion
};// @endlock
