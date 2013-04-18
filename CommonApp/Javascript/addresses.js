﻿L3.addressesGetInfo = function addressesGetInfo(param) {	var xhr, getString, api_key = require(getFolder('path') + 'APIKeys/SmartyStreets.js');	if (param.debug) {		debugger;	}		try {		xhr = new XMLHttpRequest(); 		if (param.oneLineAddress) {			getString = 'https://api.smartystreets.com/street-address?street=' + param.street1 + '&candidates=5&auth-id=' + api_key.auth_id() + '&auth-token=' + api_key.auth_token();		}		else {			getString = 'https://api.smartystreets.com/street-address?street=' + param.street1 + (param.street2 ? '&street2=' + param.street2 : '') + '&city=' + param.city + '&state=TX&zipcode=' + param.zipCode + '&candidates=5&auth-id=' + api_key.auth_id() + '&auth-token=' + api_key.auth_token();		}		xhr.open('GET', getString.replace(/ /g,'+'), false); // to connect to a Web site synchronously		xhr.send(); // send the request	} catch (e) {		return null;	}	if (xhr.status === 200) {		return JSON.parse(xhr.responseText)[0];	}	else {		return null;	}}L3.deg2rad = function deg2rad(deg) {  return deg * (Math.PI/180)}L3.getDistanceFromLatLonInKm = function getDistanceFromLatLonInKm(c1, c2) {  var R = 6378.1; // Radius of the earth in km  var lat1 = parseFloat(c1[0]), lon1 = parseFloat(c1[1]);  var lat2 = parseFloat(c2[0]), lon2 = parseFloat(c2[1]);  var dLat = L3.deg2rad(lat2-lat1);  // deg2rad below  var dLon = L3.deg2rad(lon2-lon1);   var a =     Math.sin(dLat/2) * Math.sin(dLat/2) +    Math.cos(L3.deg2rad(lat1)) * Math.cos(L3.deg2rad(lat2)) *     Math.sin(dLon/2) * Math.sin(dLon/2)    ;   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));   var d = R * c; // Distance in km  return d;}L3.getDistanceFromLatLonInMiles = function getDistanceFromLatLonInMiles(c1, c2) {  var R = 3963.1676; // Radius of the earth in miles  var lat1 = parseFloat(c1[0]), lon1 = parseFloat(c1[1]);  var lat2 = parseFloat(c2[0]), lon2 = parseFloat(c2[1]);  var dLat = L3.deg2rad(lat2-lat1);  // deg2rad below  var dLon = L3.deg2rad(lon2-lon1);   var a =     Math.sin(dLat/2) * Math.sin(dLat/2) +    Math.cos(L3.deg2rad(lat1)) * Math.cos(L3.deg2rad(lat2)) *     Math.sin(dLon/2) * Math.sin(dLon/2)    ;   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));   var d = R * c; // Distance in km  return d;}L3.deg2rad = function deg2rad(deg) {  return deg * (Math.PI/180)}L3.parseAddress1 = function parseAddress1(v) {	return 	(		(v.components.primary_number ? v.components.primary_number + ' ' : '') +		(v.components.street_predirection ? v.components.street_predirection + ' ' : '') +		(v.components.street_name ? v.components.street_name + ' ' : '') +		(v.components.street_suffix ? v.components.street_suffix + ' ' : '') +		(v.components.street_postdirection ? v.components.street_postdirection + ' ' : '')	)}L3.parseAddress2 = function parseAddress2(v) {	return 	(		(v.components.secondary_designator ? v.components.secondary_designator + ' ' : '') +		(v.components.secondary_number ? v.components.secondary_number + ' ' : '') +		(v.components.pmb_designator ? v.components.pmb_designator + ' ' : '') +		(v.components.pmb_number ? v.components.pmb_number + ' ' : '')	)}