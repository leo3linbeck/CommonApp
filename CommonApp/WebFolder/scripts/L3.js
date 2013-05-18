﻿var L3 = L3 || {};//L3.step = ['componentSelectFamily','componentAddressEntry','componentFamilyInfoEntry','placeholderForExpansion'];L3.step = ['componentAddressEntry','componentFamilyInfoEntry','placeholderForExpansion'];L3.stack = [];L3.buildStepArray = function buildStepArray(familyDS) {	L3.step.length = 3;		switch (familyDS.applier) {		case 'Mother':			L3.step.push('componentMotherEntry');			if (familyDS.fatherStatus !== 'Deceased' && familyDS.fatherStatus !== 'Unknown') {				L3.step.push('componentFatherEntry');			}			break;		case 'Father':			L3.step.push('componentFatherEntry');			if (familyDS.motherStatus !== 'Deceased' && familyDS.motherStatus !== 'Unknown') {				L3.step.push('componentMotherEntry');			}			break;		case 'Student':			if (familyDS.fatherStatus !== 'Deceased' && familyDS.fatherStatus !== 'Unknown') {				L3.step.push('componentFatherEntry');			}			if (familyDS.motherStatus !== 'Deceased' && familyDS.motherStatus !== 'Unknown') {				L3.step.push('componentMotherEntry');			}			break;		default:			L3.step.push('componentGuardianEntry');			if (familyDS.motherStatus !== 'Deceased' && familyDS.motherStatus !== 'Unknown') {				L3.step.push('componentMotherEntry');			}			if (familyDS.fatherStatus !== 'Deceased' && familyDS.fatherStatus !== 'Unknown') {				L3.step.push('componentFatherEntry');			}			break;	}		L3.step.push('componentChildEntry');	L3.step.push('componentContactInfoEntry');	L3.step.push('componentSchoolMap');	L3.step.push('componentCreateApplications');	L3.step.push('componentReviewAndPrintForms');}L3.focusField = {	componentSelectFamily: 'textFieldFamilyName',	componentAddressEntry: 'textFieldStreet1Entry',	componentFamilyInfoEntry: 'comboboxApplicant',	componentFatherEntry: 'textFieldFirstName',	componentMotherEntry: 'textFieldFirstName',	componentGuardianEntry: 'textFieldFirstName',	componentChildEntry: 'textFieldFirstName',	componentContactInfoEntry: 'textFieldHomePhone',	componentSchoolMap: 'textFieldDistance',	componentCreateApplications: 'textFieldForSchoolYear',	componentCreateApplications: 'textFieldForSchoolYear'}L3.loadSchoolOptions = function loadSchoolOptions() {	$$('componentCreateApplications').sources.schoolChoice.query('considerationSet.family.ID === :1 AND considerationSet.selected === true AND startingGrade <= :2 AND endingGrade >= :2',		{			onSuccess: function(event) {				console.log('loadSchoolOptions', event);			},			onError: function(error) {				console.log('ERROR: loadSchoolOptions', error);			},			orderBy: 'name',			params: [ sources.family.ID, $$('componentCreateApplications').sources.applyingChildren.nextGradeLevel ]		}	);}L3.formatPhoneAttribute = function formatPhoneAttribute(that) {	var p, v = $$(that.id).getValue();		if (v.length !== 10 || v.indexOf('(') !== -1 || v.indexOf('-') !== -1 || v.indexOf('+') !== -1) {		return;	}		p = '(' + v.substr(0, 3) + ') ' + v.substr(3, 3) + '-' + v.substr(6, 4);	that.sourceAtt.setValue(p);}L3.calcAgeOnSept1 = function calcAgeOnSept1(bday) {	if (bday) {		var today = new Date;		var refYear = today.getFullYear() + (today.getMonth() >= 8 ? 1 : 0);		return ( refYear - bday.getFullYear() + (bday.getMonth() >= 8 ? -1 : 0) );	}	else {		return '';	}}L3.gradeMap = {	'-2': 'EE', '-1': 'PK', '0': 'K',	'1': '1st', '2': '2nd', '3': '3rd', '4': '4th', '5': '5th',	'6': '6th', '7': '7th', '8': '8th',	'9': '9th', '10': '10th', '11': '11th', '12': '12th',	'13': 'Post Grad',	'999': 'Not Sure'}L3.toTitleCase = function toTitleCase(s) {	return s.replace(/\b([a-z])/g, function (_, i) {  			return i.toUpperCase();  		}  	);}L3.convertAttributeToUpperCase = function convertAttributeToTitleCase(that) {	var v = $$(that.id).getValue().toUpperCase();	that.sourceAtt.setValue(v);}L3.convertAttributeToTitleCase = function convertAttributeToTitleCase(that) {	var v = L3.toTitleCase($$(that.id).getValue());	that.sourceAtt.setValue(v);}L3.convertToTitleCase = function convertToTitleCase(that) {	var i, r;	var o = that.source.getID();	var p = that.config['data-binding'];	var a = p.split('.');	r = window;	for (i = 0; i < a.length-1; i += 1) {		r = r[a[i]];	}	r[a[a.length-1]] = L3.toTitleCase(that.getValue());	source[o].autoDispatch();}L3.numberToWord = function numberToWord(num) {	switch (num) {		case 0:			return 'no';		case 1:			return 'one';		case 2:			return 'two';		case 3:			return 'three';		case 4:			return 'four';		case 5:			return 'five';		case 6:			return 'six';		case 7:			return 'seven';		case 8:			return 'eight';		case 9:			return 'nine';		case 10:			return 'ten';		default:			return String(num);	}}L3.loadGoogleMap = function loadGoogleMap(container, location, address) {	var a, c, m, o;		a = location.split(',');	c = new google.maps.LatLng(a[0], a[1]);	o = {			center: c, 			zoom: 12, 			mapTypeId: google.maps.MapTypeId.ROADMAP		};	L3.googleMap = L3.googleMap || new google.maps.Map(document.getElementById(container), o);		L3.markers = [];	m = L3.addGoogleMapMarker(c, 'red', 'Home', address);}L3.addGoogleMapMarker = function addGoogleMapMarker(location, color, title, info) {	var a, c, m, s, w;		if (typeof location === 'string') {		a = location.split(',');		c = new google.maps.LatLng(a[0], a[1]);	}	else {		c = location;	}		m = new google.maps.Marker({ map: L3.googleMap, position: c, visible: true });	L3.markers.push(m);	if (color) {		m.setIcon('http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png');	}		if (title) {		m.setTitle(title);	}		if (info) {		w = new google.maps.InfoWindow({				content: info,				size: new google.maps.Size(120, 60)			});		google.maps.event.addListener(m, 'click', function() {			w.open(L3.googleMap, m);		});	}		return m;}L3.clearGoogleMapMarkers = function clearGoogleMarkers() {	L3.markers.forEach(		function(m, i) {			if (i > 0) {				m.setMap(null);			}		}	);	L3.markers.length = 1;}L3.addressValidation = function addressValidation(comp, loc, dataSource, alertID, required, forceReload) {	var param = {		forceReload: forceReload,		location: loc.toLowerCase(),		street1: $$(comp + '_textField' + loc + 'Street1Entry').getValue(),		street2: $$(comp + '_textField' + loc + 'Street2Entry').getValue(),		city: $$(comp + '_textField' + loc + 'CityEntry').getValue(),		state: $$(comp + '_textField' + loc + 'StateEntry').getValue(),		zipCode: $$(comp + '_textField' + loc + 'ZipCodeEntry').getValue(),		debug: true 	}	console.log('L3.addressValidation', param, comp, loc, dataSource, alertID, required, forceReload);	dataSource.addressLookup([param],		{			onSuccess: function(event) {				console.log('addressValidation', alertID, param, event);				if (event.result && event.result.success) {					$$(alertID).setValue('Validated Address');					$$(alertID).setBackgroundColor('green');					$$('buttonNextStep').enable();					if (comp === 'componentAddressEntry') {						sources.family.query('ID === :1',							{								onSuccess: function(event) {									console.log('Load family after address lookup', event);									dataSource.serverRefresh({forceReload: true});								},								onError: function(error) {									console.log('ERROR: load family after address lookup', error);								},								params: [event.result.result.ID]							}						);					}				}				else {					L3.unverifiedAddress(dataSource, loc.toLowerCase(), alertID, required);				}			},			onError: function(error) {				console.log('ERROR: buttonVerify' + loc + 'Address.click', error);				L3.unverifiedAddress(dataSource, loc.toLowerCase(), alertID, required);			}		}	);}L3.verifyAddress = function verifyAddress(that, dontForceReload) {	var a, alertID, comp, dataSource, dsName, loc, param, required;		console.log('verifyAddress', that);	a = that.id.split('_');	dsName = that.config['data-binding'].split('.')[0];	if (dsName === 'family') {		dataSource = sources.family;		loc = 'Main';		required = true;	}	else {		dataSource = sources[dsName];		loc = that.id.substr('textField'.length + a[0].length + 1, 4);		required = false;	}	comp = a[0];	alertID = comp + '_richTextVerify' + loc + 'AddressStatus';		L3.addressValidation(comp, loc, dataSource, alertID, required, (dontForceReload === undefined || !dontForceReload));}L3.unverifiedAddress = function unverifyAddress(dataSource, locLC, alertID, required) {	console.log('unverifiedAddress ', locLC, dataSource);		dataSource.getAttribute(locLC + 'USPSLine1').setValue('');	dataSource.getAttribute(locLC + 'USPSLine2').setValue('');	dataSource.getAttribute(locLC + 'USPSDeliveryPoint').setValue('');	dataSource.getAttribute(locLC + 'MapCoords').setValue('');	$$(alertID).setValue('Unvalidated Address');	$$(alertID).setBackgroundColor('red');		$$('buttonNextStep')[ (required ? 'disable' : 'enable') ]();}L3.addressesSameAddress = function addressesSameAddress(same, role, location) {	var h = location.toLowerCase();	var comp = 'component' + L3.toTitleCase(role) + 'Entry';		if (same) {		sources[role].getAttribute(h + 'Street1').setValue(sources.family.mainStreet1);		sources[role].getAttribute(h + 'Street2').setValue(sources.family.mainStreet2);		sources[role].getAttribute(h + 'City').setValue(sources.family.mainCity);		sources[role].getAttribute(h + 'State').setValue(sources.family.mainState);		sources[role].getAttribute(h + 'ZipCode').setValue(sources.family.mainZipCode);		sources[role].getAttribute(h + 'USPSLine1').setValue(sources.family.mainUSPSLine1);		sources[role].getAttribute(h + 'USPSLine2').setValue(sources.family.mainUSPSLine2);		sources[role].getAttribute(h + 'USPSDeliveryPoint').setValue(sources.family.mainUSPSDeliveryPoint);		sources[role].getAttribute(h + 'MapCoords').setValue(sources.family.mainMapCoords);		$$(comp + '_richTextVerify' + location + 'AddressStatus').setValue('Validated Address');		$$(comp + '_richTextVerify' + location + 'AddressStatus').setBackgroundColor('green');	}	$$(comp + '_textField' + location + 'Street1Entry').setReadOnly(same);	$$(comp + '_textField' + location + 'Street2Entry').setReadOnly(same);	$$(comp + '_textField' + location + 'CityEntry').setReadOnly(same);	$$(comp + '_textField' + location + 'StateEntry').setReadOnly(same);	$$(comp + '_textField' + location + 'ZipCodeEntry').setReadOnly(same);}