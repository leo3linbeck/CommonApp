﻿
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var textFieldSchoolName = {};	// @textField
	var selectCategory = {};	// @select
	var sliderDistance = {};	// @slider
	var switchboxShowSelected = {};	// @switchbox
	var documentEvent = {};	// @document
	var textFieldMainStreet1Entry = {};	// @textField
	var textFieldMainZipCodeEntry = {};	// @textField
	var textFieldMainStateEntry = {};	// @textField
	var textFieldMainCityEntry = {};	// @textField
	var textFieldMainStreet2Entry = {};	// @textField
// @endregion// @endlock

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

// eventHandlers// @lock

	textFieldSchoolName.keyup = function textFieldSchoolName_keyup (event)// @startlock
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

	switchboxShowSelected.click = function switchboxShowSelected_click (event)// @startlock
	{// @endlock
		updateSchoolList(false);
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		L3.localization.changeLanguage('en');
	};// @lock

	textFieldMainStreet1Entry.change = function textFieldMainStreet1Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyMainAddress(this, 'smartphone');
	};// @lock

	textFieldMainZipCodeEntry.change = function textFieldMainZipCodeEntry_change (event)// @startlock
	{// @endlock
		L3.verifyMainAddress(this, 'smartphone');
	};// @lock

	textFieldMainStateEntry.change = function textFieldMainStateEntry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToUpperCase(this);
		L3.verifyMainAddress(this, 'smartphone');
	};// @lock

	textFieldMainCityEntry.change = function textFieldMainCityEntry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyMainAddress(this, 'smartphone');
	};// @lock

	textFieldMainStreet2Entry.change = function textFieldMainStreet2Entry_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		L3.verifyMainAddress(this, 'smartphone');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("textFieldSchoolName", "keyup", textFieldSchoolName.keyup, "WAF");
	WAF.addListener("selectCategory", "change", selectCategory.change, "WAF");
	WAF.addListener("sliderDistance", "slidechange", sliderDistance.slidechange, "WAF");
	WAF.addListener("switchboxShowSelected", "click", switchboxShowSelected.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("textFieldMainStreet1Entry", "change", textFieldMainStreet1Entry.change, "WAF");
	WAF.addListener("textFieldMainZipCodeEntry", "change", textFieldMainZipCodeEntry.change, "WAF");
	WAF.addListener("textFieldMainStateEntry", "change", textFieldMainStateEntry.change, "WAF");
	WAF.addListener("textFieldMainCityEntry", "change", textFieldMainCityEntry.change, "WAF");
	WAF.addListener("textFieldMainStreet2Entry", "change", textFieldMainStreet2Entry.change, "WAF");
// @endregion
};// @endlock
