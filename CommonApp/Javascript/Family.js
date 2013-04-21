﻿include('Javascript/addresses.js');L3.familyAddressLookup = function familyAddressLookup(param) {	var f, v;	if (param.debug) {		debugger;	}		f = this;		if (param.forceReload || !f.mainUSPSDeliveryPoint) {		param.oneLineAddress = false;		v = L3.addressesGetInfo(param);					if (v) {			f.mainUSPSDeliveryPoint = v.delivery_point_barcode;			f.mainStreet1 = L3.addressesStreet1String(v);			f.mainStreet2 = L3.addressesStreet2String(v);			f.mainCity = v.components.city_name;			f.mainState = v.components.state_abbreviation;			f.mainZipCode = v.components.zipcode + '-' + v.components.plus4_code;			f.mainUSPSLine1 = v.delivery_line_1;			f.mainUSPSLine2 = v.last_line;			f.mainMapCoords = v.metadata.latitude + ',' + v.metadata.longitude;			f.save();		}		else {			return ( { success: false } );		}	}		return ( { success: true, result: f } );}L3.familyGetNearbySchools = function familyGetNearbySchools(param) {	var a, f, h, q;	if (param.debug) {		debugger;	}			f = ds.Family(param.familyID);	if (param.recalc) {		h = f.mainMapCoords.split(',');		ds.School.all().forEach(			function (e, i) {				var c, d, v, s;				if (e.mainMapCoords) {					d = L3.getDistanceFromLatLonInMiles(h, e.mainMapCoords.split(','));					if (d <= f.searchDistance) {						s = ds.SchoolOption.find('family.ID === :1 AND school.ID === :2', f.ID, e.ID);						if (!s) {							s = ds.SchoolOption.createEntity();							s.family = f;							s.school = e;						}						s.distance = d;						s.save();					}				}			}		);	}		q = 'family.ID === :1 AND distance <= :2 AND school.name == :3 AND school.category == :4';	a = (param.category === 'All' ? wildchar : param.category);	if (param.selected) {		return ds.SchoolOption.query(q + ' AND selected === true', f.ID, f.searchDistance, param.name, a).orderBy('distance');	}	else {		return ds.SchoolOption.query(q, f.ID, f.searchDistance, param.name, a).orderBy('distance');	}}L3.familyNumberOfChildren = function familyNumberOfChildren() {	return this.children.length;}L3.familyGetPhoneType = function familyGetPhoneType(param) {	var a, attr, ref, v;		if (param.debug) {		debugger;	}			if (!param.phoneType) {		return null;	}		a = param.phoneType.split('_');	if (a.length !== 2) {		return null;	}		ref = a[0];	attr = a[1];		try {		v = ds.Person(this[ref].ID)[attr];	} catch(e) {		return null;	}		return v;}