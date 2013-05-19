﻿include('Javascript/addresses.js');L3.familyUpdateAddress = function familyUpdateAddress(f, v) {	if (f) {		if (v) {			f.mainUSPSDeliveryPoint = v.delivery_point_barcode;			f.mainStreet1 = L3.addressesStreet1String(v);			f.mainStreet2 = L3.addressesStreet2String(v);			f.mainCity = v.components.city_name;			f.mainState = v.components.state_abbreviation;			f.mainZipCode = v.components.zipcode + '-' + v.components.plus4_code;			f.mainUSPSLine1 = v.delivery_line_1;			f.mainUSPSLine2 = v.last_line;			f.mainMapCoords = v.metadata.latitude + ',' + v.metadata.longitude;		}		else {			f.mainUSPSDeliveryPoint = null;			f.mainUSPSLine1 = null;			f.mainUSPSLine2 = null;			f.mainMapCoords = null;		}		f.save();	}}L3.familyAddressLookup = function familyAddressLookup(a) {	var f = null, param = a[0], v;	if (param.debug) {		debugger;	}		param.oneLineAddress = false;	v = L3.addressesGetInfo(param);	if (param.currentFamilyID) {		f = ds.Family(param.currentFamilyID);	}	else {		if (v) {			f = ds.Family.find('mainUSPSDeliveryPoint === :1', v.delivery_point_barcode);			if (f === null) {				f = ds.Family.createEntity();				f.userID = '';			}		}	}		L3.familyUpdateAddress(f, v);			return ( { success: (v != null), result: f } );}L3.familyGetNearbySchools = function familyGetNearbySchools(param) {	var a, f, h, m = null, q, s = null;	if (param.debug) {		debugger;	}		if (param.familyID) {		f = ds.Family(param.familyID);				f.searchDistance = param.distance;		f.save();				if (param.recalc) {			h = f.mainMapCoords.split(',');			ds.School.all().forEach(				function (e, i) {					var c, d, v, s;					if (e.mapCoords) {						d = L3.getDistanceFromLatLonInMiles(h, e.mapCoords.split(','));						if (d <= f.searchDistance) {							s = ds.SchoolOption.find('family.ID === :1 AND school.ID === :2', f.ID, e.ID);							if (!s) {								s = ds.SchoolOption.createEntity();								s.family = f;								s.school = e;							}							s.distance = d;							s.save();						}					}				}			);		}				q = 'family.ID === :1 AND distance <= :2 AND school.name == :3 AND school.category == :4';		a = (param.category === 'All' ? wildchar : param.category);		if (param.selected) {			s = ds.SchoolOption.query(q + ' AND selected === true', f.ID, f.searchDistance, param.name, a).orderBy('distance');		}		else {			s = ds.SchoolOption.query(q, f.ID, f.searchDistance, param.name, a).orderBy('distance');		}			}		return s;}L3.familyNumberOfChildren = function familyNumberOfChildren() {	return this.children.length;}L3.familyGetPhoneType = function familyGetPhoneType(param) {	var a, attr, ref, v;		if (param.debug) {		debugger;	}			if (!param.phoneType) {		return null;	}		a = param.phoneType.split('_');	if (a.length !== 2) {		return null;	}		ref = a[0];	attr = a[1];		try {		v = ds.Person(this[ref].ID)[attr];	} catch(e) {		return null;	}		return v;}