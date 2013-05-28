﻿include('Javascript/addresses.js');include('Javascript/report.js');exports.validateAddress = function validateAddress (params) {	var access, deliveryPoint = null, f, result = null, token, v;		if (params.debug) {		debugger;	}		v = L3.addressesGetInfo(params);		if (v) {		token = currentSession().promoteWith('Staff');		deliveryPoint = v.delivery_point_barcode;		f = ds.Family.find('mainUSPSDeliveryPoint === :1', deliveryPoint);		currentSession().unPromote(token);		if (f) {			access = currentSession().belongsTo('Staff') || (f.userID === currentUser().ID);		}		else {			access = true;		}				result = {			street1: 			L3.addressesStreet1String(v),			street2: 			L3.addressesStreet2String(v),			city: 				v.components.city_name,			state: 				v.components.state_abbreviation,			zipCode:			v.components.zipcode + '-' + v.components.plus4_code,			uspsLine1:			v.delivery_line_1,			uspsLine2:			v.last_line,			mapCoords:			v.metadata.latitude + ',' + v.metadata.longitude,			uspsDeliveryPoint:	v.delivery_point_barcode		};	}	else {		access = false;	}		return ( { result: result, access: access, deliveryPoint: deliveryPoint } );};exports.getNearbySchools = function getNearbySchools(param) {	var a, f, h, m = null, q, s = null;	if (param.debug) {		debugger;	}		if (param.familyID) {		f = ds.Family(param.familyID);				if (param.recalc) {			h = f.mainMapCoords.split(',');			ds.School.all().forEach(				function (e, i) {					var c, d, v, s;					if (e.mapCoords) {						d = L3.getDistanceFromLatLonInMiles(h, e.mapCoords.split(','));						if (d <= param.distance) {							s = ds.SchoolOption.find('family.ID === :1 AND school.ID === :2', f.ID, e.ID);							if (!s) {								s = ds.SchoolOption.createEntity();								s.family = f;								s.school = e;							}							s.distance = d;							s.save();						}					}				}			);		}				q = 'family.ID === ' + f.ID + ' AND distance <= ' + param.distance + ' AND school.name == "' + param.name + '" AND school.category == "' + (param.category === 'All' ? wildchar : param.category) + '"';		if (param.selected) {			q += ' AND selected === true';		}		s = ds.SchoolOption.query(q);	}		return ( { result: s, queryString: q } );}exports.generateReport = function generateReport(params) {	var f, o;	if (params.debug) {		debugger;	}		if (params.familyID) {		var url;				f = ds.Family(params.familyID);		o = ds.SchoolOption.query('family.ID === :1 AND selected === true', params.familyID).orderBy('distance');		L3.selectedLanguage = params.language ? params.language : 'en';				url = L3.generatePDFFileAndURL(f, o, 'savedReports');				return ( { success: true, url: url } );	}	else {		return ( { success: false, id: 'noAddressData', message: 'No address data.' } );	}}