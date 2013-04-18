﻿var L3 = L3 || {};L3.step = ['componentSelectFamily','componentAddressEntry','componentFamilyInfoEntry','placeholderForExpansion'];L3.stack = [];L3.buildStepArray = function buildStepArray() {	L3.step.length = 3;		switch (sources.family.applier) {		case 'Mother':			L3.step.push('componentMotherEntry');			if (sources.family.fatherStatus !== 'Deceased' && sources.family.fatherStatus !== 'Unknown') {				L3.step.push('componentFatherEntry');			}			break;		case 'Father':			L3.step.push('componentFatherEntry');			if (sources.family.motherStatus !== 'Deceased' && sources.family.motherStatus !== 'Unknown') {				L3.step.push('componentMotherEntry');			}			break;		case 'Student':			if (sources.family.fatherStatus !== 'Deceased' && sources.family.fatherStatus !== 'Unknown') {				L3.step.push('componentFatherEntry');			}			if (sources.family.motherStatus !== 'Deceased' && sources.family.motherStatus !== 'Unknown') {				L3.step.push('componentMotherEntry');			}			break;		default:			L3.step.push('componentGuardianEntry');			if (sources.family.motherStatus !== 'Deceased' && sources.family.motherStatus !== 'Unknown') {				L3.step.push('componentMotherEntry');			}			if (sources.family.fatherStatus !== 'Deceased' && sources.family.fatherStatus !== 'Unknown') {				L3.step.push('componentFatherEntry');			}			break;	}		L3.step.push('componentChildEntry');	L3.step.push('componentContactInfoEntry');	L3.step.push('componentSchoolMap');}L3.formatPhoneString = function formatPhoneString() {	}L3.formatPhoneAttribute = function formatPhoneAttribute(that) {	var p, v = $$(that.id).getValue();		if (v.length !== 10 || v.indexOf('(') !== -1 || v.indexOf('-') !== -1 || v.indexOf('+') !== -1) {		return;	}		p = '(' + v.substr(0, 3) + ') ' + v.substr(3, 3) + '-' + v.substr(6, 4);	that.sourceAtt.setValue(p);}L3.calcAgeOnSept1 = function calcAgeOnSept1(bday) {	if (bday) {		var today = new Date;		var refYear = today.getFullYear() + (today.getMonth() >= 8 ? 1 : 0);		return ( refYear - bday.getFullYear() + (bday.getMonth() >= 8 ? -1 : 0) );	}	else {		return '';	}}L3.gradeMap = {	'-2': 'EE', '-1': 'PK', '0': 'K',	'1': '1st', '2': '2nd', '3': '3rd', '4': '4th', '5': '5th',	'6': '6th', '7': '7th', '8': '8th',	'9': '9th', '10': '10th', '11': '11th', '12': '12th',	'13': 'Post Grad',	'999': 'Not Sure'}L3.toTitleCase = function toTitleCase(s) {	return s.replace(/\b([a-z])/g, function (_, i) {  			return i.toUpperCase();  		}  	);}L3.convertAttributeToTitleCase = function convertAttributeToTitleCase(that) {	var v = L3.toTitleCase($$(that.id).getValue());	that.sourceAtt.setValue(v);}L3.convertToTitleCase = function convertToTitleCase(that) {	var i, r;	var o = that.source.getID();	var p = that.config['data-binding'];	var a = p.split('.');	r = window;	for (i = 0; i < a.length-1; i += 1) {		r = r[a[i]];	}	r[a[a.length-1]] = L3.toTitleCase(that.getValue());	source[o].autoDispatch();}L3.numberToWord = function numberToWord(num) {	switch (num) {		case 0:			return 'no';		case 1:			return 'one';		case 2:			return 'two';		case 3:			return 'three';		case 4:			return 'four';		case 5:			return 'five';		case 6:			return 'six';		case 7:			return 'seven';		case 8:			return 'eight';		case 9:			return 'nine';		case 10:			return 'ten';		default:			return String(num);	}}L3.loadGoogleMap = function loadGoogleMap(container, location, address) {	var a, c, m, o;		a = location.split(',');	c = new google.maps.LatLng(a[0], a[1]);	o = {			center: c, 			zoom: 12, 			mapTypeId: google.maps.MapTypeId.ROADMAP		};	L3.googleMap = L3.googleMap || new google.maps.Map(document.getElementById(container), o);		L3.markers = [];	m = L3.addGoogleMapMarker(c, 'red', 'Home', address);}L3.addGoogleMapMarker = function addGoogleMapMarker(location, color, title, info) {	var a, c, m, s, w;		if (typeof location === 'string') {		a = location.split(',');		c = new google.maps.LatLng(a[0], a[1]);	}	else {		c = location;	}		m = new google.maps.Marker({ map: L3.googleMap, position: c, visible: true });	L3.markers.push(m);	if (color) {		m.setIcon('http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png');	}		if (title) {		m.setTitle(title);	}		if (info) {		w = new google.maps.InfoWindow({				content: info,				size: new google.maps.Size(120, 60)			});		google.maps.event.addListener(m, 'click', function() {			w.open(L3.googleMap, m);		});	}		return m;}L3.clearGoogleMapMarkers = function clearGoogleMarkers() {	L3.markers.forEach(		function(m, i) {			if (i > 0) {				m.setMap(null);			}		}	);	L3.markers.length = 1;}