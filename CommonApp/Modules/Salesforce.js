﻿var SForce = SForce || {};SForce.headersObj = {};SForce.resultObj = {};SForce.resultTxt = '';SForce.map = {	"Contact": {		"_ClassName": 			"Person",		"BirthDate": 			"birthdate",		"Email": 				"emailAddress",		"FirstName": 			"firstName",		"HomePhone": 			"homePhone",		"LastName": 			"lastName",		"MailingStreet": 		"homeUSPSLine1",		"MailingCity": 			"homeCity",		"MailingState": 		"homeState",		"MailingPostalCode": 	"homeZipCode",		"MobilePhone": 			"cellPhone",		"OtherStreet": 			"workUSPSLine1",		"OtherCity": 			"workCity",		"OtherState": 			"workState",		"OtherPostalCode": 		"workZipCode"	}}SForce.onreadystatechange = function() { // event handler	var state = this.readyState;	if (state !== 4) { // while the status event is not Done we continue		return;	}	var result = this.responseText;  //get the contents of the response	var headers = this.getAllResponseHeaders(); //get the headers of the response	var headersArray = headers.split('\n'); // split and format the headers string in an array	SForce.headersObj = {};	SForce.resultObj = {};	SForce.resultTxt = '';	headersArray.forEach(function(header, index) {		var name, indexSeparator, value;		if (header.indexOf('HTTP/1.1') === 0) { // this is not a header but a status		  			return; // filter it		}  		indexSeparator = header.indexOf(':'); 		name = header.substr(0,indexSeparator);		if (name === "") {			return;		}		value = header.substr(indexSeparator + 1).trim(); // clean up the header attribute		SForce.headersObj[name] = value; // fills an object with the headers	});	if (SForce.headersObj['Content-Type'] && SForce.headersObj['Content-Type'].indexOf('json') !== -1) {  			 // JSON response, parse it as objects		SForce.resultObj = JSON.parse(result);	}	else { // not JSON, return text		SForce.resultTxt = result;	}}; function getSalesforceAccessToken() {	var r = 'fail';	var xhr, headersObj = {}, resultTxt, resultObj;		var xhr = new XMLHttpRequest();	var api_key = require(getFolder('path') + 'APIKeys/Salesforce.js')		var postURI = 'https://login.salesforce.com/services/oauth2/token';	var postString = 'grant_type=password';	postString += '&client_id=' + encodeURIComponent(api_key.consumer_key());	postString += '&client_secret=' + encodeURIComponent(api_key.consumer_secret());	postString += '&username=' + encodeURIComponent('leo3@familiesempowered.org');	postString += '&password=' + encodeURIComponent(api_key.password());	xhr.onreadystatechange = SForce.onreadystatechange;	xhr.open('POST', postURI, false); // to connect to a Web site synchronously	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');//		xhr.setRequestHeader('Content-Length', postString.length);		xhr.send(postString); // send the request	if (xhr.status === 200) {		var obj = JSON.parse(xhr.response);		storage.salesforce_id = obj.id;		storage.salesforce_issued_at = obj.issued_at;		storage.salesforce_instance_url = obj.instance_url;		storage.salesforce_signature = obj.signature;		storage.salesforce_access_token = obj.access_token;		r = 'success';	}		return r;}function loadSalesforceVersion() {	var r = 'fail';		var getString = storage.salesforce_instance_url + '/services/data/';	var xhr = new XMLHttpRequest();	xhr.onreadystatechange = SForce.onreadystatechange;	xhr.open('GET', getString, false); // to connect to a Web site synchronously	xhr.setRequestHeader('Content-Type', 'application/json');		xhr.setRequestHeader('Accept', 'json');	xhr.send(); // send the request	if (xhr.status === 200) {		var a = JSON.parse(xhr.response);		var obj = a[a.length - 1];		storage.salesforce_version = obj.version;		storage.salesforce_url = obj.url;		r = 'success';	}		return r;}function loadSalesforceResources() {	var r = 'fail';		var getString = storage.salesforce_instance_url + storage.salesforce_url;	var xhr = new XMLHttpRequest();	xhr.onreadystatechange = SForce.onreadystatechange;	xhr.open('GET', getString, false); // to connect to a Web site synchronously	xhr.setRequestHeader('Authorization', 'Bearer ' + storage.salesforce_access_token);		xhr.setRequestHeader('Content-Type', 'application/json');		xhr.send(); // send the request	if (xhr.status === 200) {		var obj = JSON.parse(xhr.response);		Object.keys(obj).forEach(function(k) {			storage['salesforce_' + k] = obj[k];		});		r = 'success';	}		return r;}function loadSalesforceObjects() {	var r = 'fail';	var getString = storage.salesforce_instance_url + storage.salesforce_sobjects;	var xhr = new XMLHttpRequest();	xhr.onreadystatechange = SForce.onreadystatechange;	xhr.open('GET', getString, false); // to connect to a Web site synchronously	xhr.setRequestHeader('Authorization', 'Bearer ' + storage.salesforce_access_token);		xhr.setRequestHeader('Content-Type', 'application/json');		xhr.send(); // send the request	if (xhr.status === 200) {		var obj = JSON.parse(xhr.response);		Object.keys(obj.sobjects).forEach(function(k) {			storage['salesforce_sobject_' + obj.sobjects[k].name] = obj.sobjects[k];		});		r = 'success';	}		return r;}function getRecordJSON(table, c) {	var map = SForce.map[table];	var a = {};		Object.keys(map).forEach(function(k) {		if (k !== '_ClassName') {			a[k] = c[map[k]];		}	});		return a;}function pushEntityCollection(f, ec) {	var st = SForce.map[f]._ClassName;	var wc = ec.getDataClass().getName();		if (st !== wc) {		return ( { success: false, salesforceTable: st, wakandaClass: wc } );	}	var sobj = 'salesforce_sobject_' + f;	var postURI = storage.salesforce_instance_url + storage.getItem(sobj).urls.sobject;		var count = 0;	ec.forEach(function(e) {	//		var e = ec.first();		var postJSON = JSON.stringify(getRecordJSON(f, e));		var xhr = new XMLHttpRequest();		xhr.onreadystatechange = SForce.onreadystatechange;		xhr.open('POST', postURI, false); // to connect to a Web site synchronously		xhr.setRequestHeader('Authorization', 'Bearer ' + storage.salesforce_access_token);			xhr.setRequestHeader('Content-Type', 'application/json');			xhr.send(postJSON); // send the request		if (xhr.status === 201) {			var obj = JSON.parse(xhr.response);			e.salesforceID = obj.id;			e.save()			count += 1;		}	});		return ( { success: true, salesforceTable: f, wakandaClass: wc, entitiesPushed: count } );}function pushDataToSalesforce() {	var r = [];		var f = 'Contact';	var ec = ds[SForce.map[f]._ClassName].query('salesforceID is null OR salesforceID is ""');	r.push(pushEntityCollection(f, ec));	return r;}function loadSalesforceMetaData() {	if (getSalesforceAccessToken() === 'fail') {		return ( {succeed: false, reason: 'no token'} );	}		if (!loadSalesforceVersion()) {		return ( {succeed: false, reason: 'no version'} );	}		if (!loadSalesforceResources()) {		return ( {succeed: false, reason: 'no resources'} );	}	if (!loadSalesforceObjects()) {		return ( {succeed: false, reason: 'no objects'} );	}		return SForce;}function doSalesforceQueryByName(firstName, lastName) {	}exports.pushData = function pushData () {	var results = null;		if (storage.salesforce_access_token === undefined) {		results = loadSalesforceMetaData();	}		if (!results) {		results = pushDataToSalesforce();	}	return (results);};exports.pullData = function pullData () {	var results = null;	if (storage.salesforce_access_token === undefined) {		results = loadSalesforceMetaData();	}		if (!results) {			}	return (results);};