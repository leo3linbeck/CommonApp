﻿include('Javascript/addresses.js');L3.NEW_FAMILY_TEXT = 'SELECT TO ADD NEW FAMILY';L3.familyAddressLookup = function familyAddressLookup(param) {	var c, n = false, v, families;	if (param.debug) {		debugger;	}		v = L3.addressesGetInfo(param);			if (v) {		families = ds.Family.query('uspsDeliveryPoint = :1', v.delivery_point_barcode).orderBy('name');				c = families.find('name == :1',L3.NEW_FAMILY_TEXT);		if (c === null) {			c = ds.Family.createEntity();			c.name = L3.NEW_FAMILY_TEXT;			c.uspsDeliveryPoint = v.delivery_point_barcode;			n = true;		}		c.homeStreet1 = param.street1;		c.homeStreet2 = param.street2;		c.homeCity = param.city;		c.homeState = v.components.state_abbreviation;		c.homeZipCode = v.components.zipcode + '-' + v.components.plus4_code;		c.uspsLine1 = v.delivery_line_1;		c.uspsLine2 = v.last_line;		c.mapCoords = v.metadata.latitude + ',' + v.metadata.longitude;		c.save();				if (n) {			families.add(c, true);		}				return families;	}	else {		return null;	}}L3.familyGetNearbySchools = function familyGetNearbySchools(param) {	var a, f, h;	if (param.debug) {		debugger;	}			f = ds.Family(param.familyID);	h = f.mapCoords.split(',');	ds.School.all().forEach(		function (e, i) {			var c, d, v, s;//			if (e.mapCoords === '') {//				v = L3.addressesGetInfo(param);//				e.mapCoords = v.metadata.latitude + ',' + v.metadata.longitude;//				e.save();//			}			if (e.mapCoords) {				d = L3.getDistanceFromLatLonInMiles(h, e.mapCoords.split(','));				s = ds.SchoolChoice.find('family.ID == :1 AND school.ID == :2', f.ID, e.ID);				if (!s) {					s = ds.SchoolChoice.createEntity();					s.family = f;					s.school = e;				}				s.distance = d;				s.save();			}		}	);		return ds.SchoolChoice.query('family.ID == :1 AND distance <= :2', f.ID, param.distance).orderBy('distance');}