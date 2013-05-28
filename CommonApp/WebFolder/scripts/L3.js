﻿var L3 = L3 || {};L3.focusField = {	componentSelectFamily: 'textFieldFamilyName',	componentAddressEntry: 'textFieldStreet1Entry',	componentFamilyInfoEntry: 'comboboxApplicant',	componentFatherEntry: 'textFieldFirstName',	componentMotherEntry: 'textFieldFirstName',	componentGuardianEntry: 'textFieldFirstName',	componentChildEntry: 'textFieldFirstName',	componentContactInfoEntry: 'textFieldHomePhone',	componentSchoolMap: 'textFieldDistance',	componentCreateApplications: 'textFieldForSchoolYear',	componentCreateApplications: 'textFieldForSchoolYear'}L3.transitionPages = function transitionPages(hideThis, showThis, dir) {	var effect = 'slide', easing = 'linear', speed = 500;	console.log('transitionPages', hideThis, showThis);	dir = dir || 'forward';	if (showThis) {		$('#' + showThis).show({			effect: effect,			direction: (dir === 'forward' ? 'right' : 'left'),			easing: easing,			duration: speed		});		$('#' + showThis + '_' + L3.focusField[showThis]).select();	}	if (hideThis) {		$('#' + hideThis).hide({			effect: effect,			direction: (dir === 'forward' ? 'left' : 'right'),			easing: easing,			duration: speed		});	}}	L3.transitionButtons = function transitionButtons(mode) {	var effect = 'slide', easing = 'linear', speed = 500;	console.log('transitionButtons', mode);	switch (mode) {	 case 'start':		$('#buttonStart').hide({			effect: effect,			direction: 'down',			easing: easing,			duration: speed		});		$('#containerButtons').show({			effect: effect,			direction: 'up',			easing: easing,			duration: speed		});		break;	case 'return':		$('#containerButtons').hide({			effect: effect,			direction: 'up',			easing: easing,			duration: speed		});		$('#buttonStart').show({			effect: effect,			direction: 'down',			easing: easing,			duration: speed		});		break;	case 'startSearch':		$('#containerButtons').show({			effect: effect,			direction: 'up',			easing: easing,			duration: speed		});		$('#buttonStart').hide({			effect: 'fade',			easing: easing,			duration: speed		});		$('#richTextSearchInvitationText').hide({			effect: 'fade',			easing: easing,			duration: speed		});		break;	case 'returnSearch':		$('#containerButtons').hide({			effect: effect,			direction: 'up',			easing: easing,			duration: speed		});		$('#buttonStart').show({			effect: 'fade',			easing: easing,			duration: speed		});		$('#richTextSearchInvitationText').show({			effect: 'fade',			easing: easing,			duration: speed		});		break;	}}	L3.step = ['componentAddressEntry','componentSchoolMap'];L3.stack = [];L3.buildStepArray = function buildStepArray(applier) {	var f = sources.family;	if (applier) {		switch (applier) {			case 'Mother':				L3.step.push('componentMotherEntry');				if (f.fatherStatus !== 'Deceased' && f.fatherStatus !== 'Unknown') {					L3.step.push('componentFatherEntry');				}				break;			case 'Father':				L3.step.push('componentFatherEntry');				if (f.motherStatus !== 'Deceased' && f.motherStatus !== 'Unknown') {					L3.step.push('componentMotherEntry');				}				break;			case 'Student':				if (f.fatherStatus !== 'Deceased' && f.fatherStatus !== 'Unknown') {					L3.step.push('componentFatherEntry');				}				if (f.motherStatus !== 'Deceased' && f.motherStatus !== 'Unknown') {					L3.step.push('componentMotherEntry');				}				break;			default:				L3.step.push('componentGuardianEntry');				if (f.motherStatus !== 'Deceased' && f.motherStatus !== 'Unknown') {					L3.step.push('componentMotherEntry');				}				if (f.fatherStatus !== 'Deceased' && f.fatherStatus !== 'Unknown') {					L3.step.push('componentFatherEntry');				}				break;		}				L3.step.push('componentChildEntry');		L3.step.push('componentContactInfoEntry');		L3.step.push('componentCreateApplications');		L3.step.push('componentReviewAndPrintForms');	}}L3.loadSchoolOptions = function loadSchoolOptions() {	$$('componentCreateApplications').sources.schoolChoice.query('considerationSet.family.ID === :1 AND considerationSet.selected === true AND startingGrade <= :2 AND endingGrade >= :2',		{			onSuccess: function(event) {				console.log('loadSchoolOptions', event);			},			onError: function(error) {				console.log('ERROR: loadSchoolOptions', error);			},			orderBy: 'name',			params: [ sources.family.ID, $$('componentCreateApplications').sources.applyingChildren.nextGradeLevel ]		}	);}L3.formatPhoneAttribute = function formatPhoneAttribute(that) {	var p, v = $$(that.id).getValue();		if (v.length !== 10 || v.indexOf('(') !== -1 || v.indexOf('-') !== -1 || v.indexOf('+') !== -1) {		return;	}		p = '(' + v.substr(0, 3) + ') ' + v.substr(3, 3) + '-' + v.substr(6, 4);	that.sourceAtt.setValue(p);}L3.calcAgeOnSept1 = function calcAgeOnSept1(bday) {	if (bday) {		var today = new Date;		var refYear = today.getFullYear() + (today.getMonth() >= 8 ? 1 : 0);		return ( refYear - bday.getFullYear() + (bday.getMonth() >= 8 ? -1 : 0) );	}	else {		return '';	}}L3.gradeMap = {	'-2': 'EE', '-1': 'PK', '0': 'K',	'1': '1st', '2': '2nd', '3': '3rd', '4': '4th', '5': '5th',	'6': '6th', '7': '7th', '8': '8th',	'9': '9th', '10': '10th', '11': '11th', '12': '12th',	'13': 'Post Grad',	'999': 'Not Sure'}L3.toTitleCase = function toTitleCase(s) {	return s.replace(/\b([a-z])/g, function (_, i) {  			return i.toUpperCase();  		}  	);}L3.convertAttributeToUpperCase = function convertAttributeToTitleCase(that) {	var v = $$(that.id).getValue().toUpperCase();	that.sourceAtt.setValue(v);}L3.convertAttributeToTitleCase = function convertAttributeToTitleCase(that) {	var v = L3.toTitleCase($$(that.id).getValue());	that.sourceAtt.setValue(v);}L3.convertToTitleCase = function convertToTitleCase(that) {	var i, r;	var o = that.source.getID();	var p = that.config['data-binding'];	var a = p.split('.');	r = window;	for (i = 0; i < a.length-1; i += 1) {		r = r[a[i]];	}	r[a[a.length-1]] = L3.toTitleCase(that.getValue());	source[o].autoDispatch();}L3.numberToWord = function numberToWord(num) {	switch (num) {		case 0:			return 'no';		case 1:			return 'one';		case 2:			return 'two';		case 3:			return 'three';		case 4:			return 'four';		case 5:			return 'five';		case 6:			return 'six';		case 7:			return 'seven';		case 8:			return 'eight';		case 9:			return 'nine';		case 10:			return 'ten';		default:			return String(num);	}}L3.googleMapCalculateZoom = function googleMapCalculateZoom(d) {	var z = 9;		if (d <= 1) {		z = 13;	}	else if (d <= 3) {		z = 12;	}	else if (d <= 6) {		z = 11;	}	else if (d <= 16) {		z = 10;	}		return z;}L3.loadGoogleMap = function loadGoogleMap(container, distance, location, address) {	var a, c, m, o, z;		a = location.split(',');	c = new google.maps.LatLng(a[0], a[1]);	z = L3.googleMapCalculateZoom(distance);	console.log('calc zoom', distance, z);	o = {			center: c, 			zoom: z, 			mapTypeId: google.maps.MapTypeId.ROADMAP		};	L3.googleMap = L3.googleMap || new google.maps.Map(document.getElementById(container), o);		L3.markers = [];	L3.markerMap = {};	L3.markerInfo = {};	m = L3.googleMapAddMarker('home', c, 'red', 'Home', address);}L3.googleMapLoadMarkers = function googleMapLoadMarkers(markers, dataSource) {	L3.clearGoogleMapMarkers();	markers.forEach(function(m) {		L3.googleMapAddMarker(m.ID, m.schoolMapCoords, m.selected ? 'green' : 'blue', m.schoolName, L3.localization.schoolInfoWindow(m), dataSource);	});}L3.googleMapAddMarker = function googleMapAddMarker(ID, location, color, title, info, dataSource) {	var a, c, m, w;		if (typeof location === 'string') {		a = location.split(',');		c = new google.maps.LatLng(a[0], a[1]);	}	else {		c = location;	}		m = new google.maps.Marker({ map: L3.googleMap, position: c, visible: true });	m.uniAppID = ID;	L3.markers.push(m);	L3.markerMap[ID] = m;		if (color) {		m.setIcon('http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png');		if (color === 'red') {			m.setZIndex(200);		}		if (color === 'green') {			m.setZIndex(100);		}	}		if (title) {		m.setTitle(title);	}		if (info) {		w = new google.maps.InfoWindow({				content: info,				size: new google.maps.Size(90, 60)			});		L3.markerInfo[ID] = w;		google.maps.event.addListener(m, 'click', function() {			if (L3.googleMapInfoWindow) {				L3.googleMapInfoWindow.close();			}			w.open(L3.googleMap, this);			L3.googleMapInfoWindow = w;			L3.showStreetView(m);			dataSource.selectByKey(m.uniAppID, { onSuccess: function(e) { console.log('googleMap click selectByKey', e); } });		});	}}L3.showStreetView = function showStreetView(m) {	var div = document.getElementById('componentSchoolMap_containerStreetView');	var o = {			position: m.getPosition()		};	if (div) {		L3.googleMapStreetView = new google.maps.StreetViewPanorama(div, o);	}}L3.clearGoogleMapMarkers = function clearGoogleMarkers() {	if (L3.markers) {		L3.markers.forEach(			function(m, i) {				if (i > 0) {					m.setMap(null);				}			}		);		L3.markers.length = 1;	}	else {		L3.markers = [];	}	L3.markerMap = {};	L3.markerInfo = {};}L3.getPersonAddressParams = function getPersonAddressParams(comp, loc) {	return ({		street1: $$(comp + '_textField' + loc + 'Street1Entry').getValue(),		street2: $$(comp + '_textField' + loc + 'Street2Entry').getValue(),		city: $$(comp + '_textField' + loc + 'CityEntry').getValue(),		state: $$(comp + '_textField' + loc + 'StateEntry').getValue(),		zipCode: $$(comp + '_textField' + loc + 'ZipCodeEntry').getValue(),		oneLineAddress: false,		debug: false 	});}L3.verifyPersonAddress = function verifyPersonAddress(that) {	var a, alertID, comp, dsName, loc, params;		console.log('verifyPersonAddress', that);	a = that.id.split('_');	dsName = that.config['data-binding'].split('.')[0];	loc = that.id.substr('textField'.length + a[0].length + 1, 4);	comp = a[0];	alertID = comp + '_richTextVerify' + loc + 'AddressStatus';	params = L3.getPersonAddressParams(comp, loc);		Addresses.validateAddressAsync(		{			onSuccess: function(event) {				console.log('verifyPersonAddress', params, event);				if (event && event.result) {					L3.verifiedPersonAddress(event.result, dsName, comp, loc);				}				else {					L3.unverifiedPersonAddress(dsName, comp, loc);				}			},			onError: function(error) {				console.log('ERROR: verifyMainAddress', params, error);				L3.unverifiedPersonAddress(dsName, comp, loc);			},			params: [params]		}	);	}L3.verifiedPersonAddress = function verifiedPersonAddress(r, dsName, comp, loc) {	var locLC = loc.toLowerCase();	var alertID = comp + '_richTextVerify' + loc + 'AddressStatus';	var dataSource = sources[dsName];		dataSource.getAttribute(locLC + 'Street1').setValue(r.street1);	dataSource.getAttribute(locLC + 'Street2').setValue(r.street2);	dataSource.getAttribute(locLC + 'City').setValue(r.city);	dataSource.getAttribute(locLC + 'State').setValue(r.state);	dataSource.getAttribute(locLC + 'ZipCode').setValue(r.zipCode);	dataSource.getAttribute(locLC + 'USPSLine1').setValue(r.uspsLine1);	dataSource.getAttribute(locLC + 'USPSLine2').setValue(r.uspsLine2);	dataSource.getAttribute(locLC + 'MapCoords').setValue(r.mapCoords);	dataSource.getAttribute(locLC + 'USPSDeliveryPoint').setValue(r.uspsDeliveryPoint);	$$(alertID).setValue('Validated Address');	$$(alertID).setBackgroundColor('green');}L3.unverifiedPersonAddress = function unverifiedPersonAddress(dsName, comp, loc) {	var locLC = loc.toLowerCase();	var alertID = comp + '_richTextVerify' + loc + 'AddressStatus';	var dataSource = sources[dsName];		dataSource.getAttribute(locLC + 'USPSLine1').setValue('');	dataSource.getAttribute(locLC + 'USPSLine2').setValue('');	dataSource.getAttribute(locLC + 'MapCoords').setValue('');	dataSource.getAttribute(locLC + 'USPSDeliveryPoint').setValue('');	$$(alertID).setValue('Unvalidated Address');	$$(alertID).setBackgroundColor('red');}L3.getMainAddressParams = function getMainAddressParams(comp) {	return ({		street1: $$(comp + '_textFieldMainStreet1Entry').getValue(),		street2: $$(comp + '_textFieldMainStreet2Entry').getValue(),		city: $$(comp + '_textFieldMainCityEntry').getValue(),		state: $$(comp + '_textFieldMainStateEntry').getValue(),		zipCode: $$(comp + '_textFieldMainZipCodeEntry').getValue(),		oneLineAddress: false,		debug: false 	});}L3.verifyMainAddress = function verifyMainAddress(that) {	var comp = that.id.split('_')[0];	var params = L3.getMainAddressParams(comp);	Addresses.validateAddressAsync(		{			onSuccess: function(event) {				console.log('verifyMainAddress', params, event);				if (event && event.result) {					if (event.access) {						L3.verifiedMainAddress(event.result);					}					else {						L3.noAccessToMainAddress(event.result);					}				}				else {					L3.unverifiedMainAddress();				}			},			onError: function(error) {				console.log('ERROR: verifyMainAddress', params, error);				L3.unverifiedMainAddress();			},			params: [params]		}	);	}L3.verifiedMainAddress = function verifiedMainAddress(r) {	var comp = 'componentAddressEntry';	var alertID = comp + '_richTextVerifyMainAddressStatus';	currentFamilyID = r.ID;		$$(comp).sourcesVar.mainStreet1 = r.street1;	$$(comp).sources.mainStreet1.sync();	$$(comp).sourcesVar.mainStreet2 = r.street2;	$$(comp).sources.mainStreet2.sync();	$$(comp).sourcesVar.mainCity = r.city;	$$(comp).sources.mainCity.sync();	$$(comp).sourcesVar.mainState = r.state;	$$(comp).sources.mainState.sync();	$$(comp).sourcesVar.mainZipCode = r.zipCode;	$$(comp).sources.mainZipCode.sync();		$$(comp + '_richTextUSPSLine1').setValue(r.uspsLine1);	$$(comp + '_richTextUSPSLine2').setValue(r.uspsLine2);	$$(alertID).setValue('Validated Address');	$$(alertID).setBackgroundColor('green');		$$('buttonNextStep').enable();}L3.noAccessToMainAddress = function noAccessToMainAddress(r) {	var comp = 'componentAddressEntry';	var alertID = comp + '_richTextVerifyMainAddressStatus';	currentFamilyID = null;		$$(comp).sourcesVar.mainStreet1 = r.street1;	$$(comp).sources.mainStreet1.sync();	$$(comp).sourcesVar.mainStreet2 = r.street2;	$$(comp).sources.mainStreet2.sync();	$$(comp).sourcesVar.mainCity = r.city;	$$(comp).sources.mainCity.sync();	$$(comp).sourcesVar.mainState = r.state;	$$(comp).sources.mainState.sync();	$$(comp).sourcesVar.mainZipCode = r.zipCode;	$$(comp).sources.mainZipCode.sync();		$$(comp + '_richTextUSPSLine1').setValue(r.uspsLine1);	$$(comp + '_richTextUSPSLine2').setValue(r.uspsLine2);	$$(alertID).setValue('Access Denied');	$$(alertID).setBackgroundColor('black');		$$('buttonNextStep').disable();}L3.unverifiedMainAddress = function unverifiedMainAddress() {	var comp = 'componentAddressEntry';	var alertID = comp + '_richTextVerifyMainAddressStatus';		currentFamilyID = null;		$$(comp + '_richTextUSPSLine1').setValue('');	$$(comp + '_richTextUSPSLine2').setValue('');	$$(alertID).setValue('Unvalidated Address');	$$(alertID).setBackgroundColor('red');		$$('buttonNextStep').disable();}L3.setupFamilyWidgets = function setupFamilyWidgets(comp, dataSource) {	var homeAlertID = comp + '_richTextVerifyHomeAddressStatus';	var workAlertID = comp + '_richTextVerifyWorkAddressStatus';	console.log('Enter setupFamilyWidgets', comp, dataSource);	if (dataSource.homeUSPSDeliveryPoint) {		$$(homeAlertID).setValue('Validated Address');		$$(homeAlertID).setBackgroundColor('green');	}	else {		$$(homeAlertID).setValue('Unvalidated Address');		$$(homeAlertID).setBackgroundColor('red');	}	if (dataSource.workUSPSDeliveryPoint) {		$$(workAlertID).setValue('Validated Address');		$$(workAlertID).setBackgroundColor('green');	}	else {		$$(workAlertID).setValue('Unvalidated Address');		$$(workAlertID).setBackgroundColor('red');	}	$$(comp + '_textFieldHomeStreet1Entry').setReadOnly(dataSource.homeAddressSameAsMain);	$$(comp + '_textFieldHomeStreet2Entry').setReadOnly(dataSource.homeAddressSameAsMain);	$$(comp + '_textFieldHomeCityEntry').setReadOnly(dataSource.homeAddressSameAsMain);	$$(comp + '_textFieldHomeStateEntry').setReadOnly(dataSource.homeAddressSameAsMain);	$$(comp + '_textFieldHomeZipCodeEntry').setReadOnly(dataSource.homeAddressSameAsMain);}	L3.addressesSameAddress = function addressesSameAddress(same, role, location) {	var h = location.toLowerCase();	var comp = 'component' + L3.toTitleCase(role) + 'Entry';		if (same) {		sources[role].getAttribute(h + 'Street1').setValue(sources.family.mainStreet1);		sources[role].getAttribute(h + 'Street2').setValue(sources.family.mainStreet2);		sources[role].getAttribute(h + 'City').setValue(sources.family.mainCity);		sources[role].getAttribute(h + 'State').setValue(sources.family.mainState);		sources[role].getAttribute(h + 'ZipCode').setValue(sources.family.mainZipCode);		sources[role].getAttribute(h + 'USPSLine1').setValue(sources.family.mainUSPSLine1);		sources[role].getAttribute(h + 'USPSLine2').setValue(sources.family.mainUSPSLine2);		sources[role].getAttribute(h + 'USPSDeliveryPoint').setValue(sources.family.mainUSPSDeliveryPoint);		sources[role].getAttribute(h + 'MapCoords').setValue(sources.family.mainMapCoords);		$$(comp + '_richTextVerify' + location + 'AddressStatus').setValue('Validated Address');		$$(comp + '_richTextVerify' + location + 'AddressStatus').setBackgroundColor('green');	}	$$(comp + '_textField' + location + 'Street1Entry').setReadOnly(same);	$$(comp + '_textField' + location + 'Street2Entry').setReadOnly(same);	$$(comp + '_textField' + location + 'CityEntry').setReadOnly(same);	$$(comp + '_textField' + location + 'StateEntry').setReadOnly(same);	$$(comp + '_textField' + location + 'ZipCodeEntry').setReadOnly(same);}L3.generateReport = function generateReport() {	var params = {		familyID: currentFamilyID,		language: L3.localization.selectedLanguage,		debug: false	};		Addresses.generateReportAsync(		{			onSuccess: function(event) {				console.log('Addresses.generateReportAsync', event);				if (event) {					window.open(event.url);				}			},			onError: function(error) {				console.log('ERROR: Addresses.generateReportAsync', error);			},			params: [params]		}	);}