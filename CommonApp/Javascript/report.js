﻿include('Javascript/jspdf.js');include('Javascript/jspdf.plugin.addimage.js');L3 = L3 || {};L3.SERVER_URL = require(getFolder('path') + 'Javascript/server.url').get_server_url();L3.gradeMap = {	'-2': 'EE', '-1': 'PK', '0': 'K',	'1': '1st', '2': '2nd', '3': '3rd', '4': '4th', '5': '5th',	'6': '6th', '7': '7th', '8': '8th',	'9': '9th', '10': '10th', '11': '11th', '12': '12th',	'13': 'Post Grad',	'999': 'Not Sure'}L3.pdfLabels = {	es : {		title: 'Families Empowered Buscar por Escuela',		subtitle: 'Para la direccion:',		name: 'Escuela:',		address: 'Direccion:',		phone: 'Telefono:',		email: 'Email:',		website: 'Sitio:',		grades: 'Grado:',		through: ' hasta ',		enroll: 'Cuenta:',		students: ' estudiantes',		rating: 'Calidad:',		outOf: ' de 100',		attend: 'Attendance Razon:',		graduate: 'Graduacion Razon:',		directions: 'Instrucciones',		noDirections: 'Hay instrucciones disponibles',		totalTravel: 'TOTAL:',		notes: 'Notas Visita'	},	en : {		title: 'Families Empowered School Search',		subtitle: 'For the address:',		name: 'School:',		address: 'Address:',		phone: 'Phone:',		email: 'Email:',		website: 'Website:',		grades: 'Grades:',		through: ' through ',		enroll: 'Enrollment:',		students: ' students',		rating: 'Rating:',		outOf: ' out of 100',		attend: 'Attendance Rate:',		graduate: 'Graduation Rate:',		directions: 'Directions',		noDirections: 'No directions available',		totalTravel: 'TOTAL:',		notes: 'Visit Notes'	}}L3.getLabel = function getLabel(k) {	var lang = L3.selectedLanguage || 'en';		return (L3.pdfLabels[lang][k]);}L3.initializePDFParams = function initializePDFParams(currentPerson) {	var p = {		orient: 'portrait',		unit: 'in',		format: 'letter',		margin: {			top: 0.5,			left: 0.5,			bottom: 0.5,			right: 0.5		}	};		p.header = {		xStart: 0,		yStart: 0,		title: {			fontStyle: 'bold',			fontSize: 18		},		indent: 1.8,		fontStyle: 'normal',		fontSize: 14,		lineHeight: 0.25,		breakLine: {			x1: 0.5,			x2: 8.0,			y: 1.5,			yGap: 0.03,			thickness: 1/500		}	};		p.school = {		xStart: 0,		yStart: 1.4,		fontStyle: 'normal',		fontSize: 12,		lineHeight: 0.25,		nameIndent: 0.8,		infoIndent: 4.8,		infoTitleIndent: 1.5,		vertLine: {			x: 5.0,			y1: 1.6,			y2: 3.9,			thickness: 1/500		},		breakLine: {			x1: 0.5,			x2: 8.0,			y: 4.0,			yGap: 0.03,			thickness: 1/500		}	};		p.directions = {		title: {			x: 3.8,			y: 4.35,			fontStyle: 'italic',			fontSize: 14,			line: {				x1: 0.5,				x2: 8.0,				y: 4.45,				thickness: 1/500			}		},		total: {			x: 5.5,			xDuration: 6.7,			xDistance: 7.5,			y: 4.61,			fontStyle: 'bold',			fontSize: 10,			line: {				x1: 5.5,				x2: 8.0,				y: 4.67,				thickness: 1/500			}		},		notes: {			x: 3.8,			y: 5.0,			fontStyle: 'italic',			fontSize: 14,			line: {				x1: 0.5,				x2: 8.0,				y: 5.1,				thickness: 1/500			}		},		xStart: 0,		yStart: 4.1,		fontStyle: 'normal',		fontSize: 10,		lineHeight: 0.2,		xCol2: 0.3,		xCol3: 6.2,		xCol4: 7.0,		googleMap: {			x: 0.5,			y: 5.0,			w: 3.0,			h: 3.0		},		elementLine: {			x1: 0.5,			x2: 8.0,			y: 0.06,			thickness: 1/500		},		breakLine: {			x1: 0.5,			x2: 8.0,			y: 10.0,			yGap: 0.03,			thickness: 1/500		}	};		p.footer = {		xStart: 0.0,		yStart: 10.0,		xDateTime: 3.1,		xGoogle: 5.55,		fontStyle: 'normal',		fontSize: 12	};		p.box = {		x: 10,		y: 58,		h: 220,		w: 190,		thickness: 2	};			return p;}	L3.addHeaderToPage = function addHeaderToPDF(doc, params, family) {	var h = params.header;	var x = h.xStart + params.margin.left;	var y = h.yStart + params.margin.top;		doc.setFontStyle(h.title.fontStyle)		.setFontSize(parseInt(h.title.fontSize))		.text(L3.getLabel('title'), x, y)		.setFontStyle(h.fontStyle)		.setFontSize(h.fontSize)		.text(L3.getLabel('subtitle'), x, y += 2 * h.lineHeight)		.text(family.mainUSPSLine1, x += h.indent, y)		.text(family.mainUSPSLine2, x, y += h.lineHeight)		.setLineWidth(h.breakLine.thickness)		.line(h.breakLine.x1, h.breakLine.y, h.breakLine.x2, h.breakLine.y)		.line(h.breakLine.x1, h.breakLine.y + h.breakLine.yGap, h.breakLine.x2, h.breakLine.y + h.breakLine.yGap);}L3.addSchoolToPage = function addSchoolToPage(doc, params, option) {	var s = params.school;	var x = s.xStart + params.margin.left;	var y = s.yStart + params.margin.top;		doc.setFontStyle(s.fontStyle)		.setFontSize(s.fontSize)		.text(L3.getLabel('name'), x, y)		.setFontStyle('bold')		.text(option.schoolName ? option.schoolName : '', x + s.nameIndent, y)		.setFontStyle(s.fontStyle)		.text(L3.getLabel('address'), x, y += 1.5 * s.lineHeight)		.text(option.schoolUSPSLine1 ? option.schoolUSPSLine1 : '', x + s.nameIndent, y)		.text(option.schoolUSPSLine2 ? option.schoolUSPSLine2 : '', x + s.nameIndent, y += s.lineHeight)		.text(L3.getLabel('phone'), x, y += 1.5 * s.lineHeight)		.text(option.schoolPhone ? option.schoolPhone : '', x + s.nameIndent, y)		.text(L3.getLabel('email'), x, y += 1.5 * s.lineHeight)		.text(option.schoolEmail ? option.schoolEmail : '', x + s.nameIndent, y)		.text(L3.getLabel('website'), x, y += 1.5 * s.lineHeight)		.text(option.schoolURL ? option.schoolURL : '', x + s.nameIndent, y);			x = s.xStart + + s.infoIndent + params.margin.left;	y = s.yStart + params.margin.top;	doc.text(L3.getLabel('grades'), x, y)		.text(L3.gradeMap[option.schoolStart] + L3.getLabel('through') + L3.gradeMap[option.schoolEnd], x + s.infoTitleIndent, y)		.text(L3.getLabel('enroll'), x, y += 1.5 * s.lineHeight)		.text(option.schoolEnroll ? option.schoolEnroll.toString() + L3.getLabel('students') : '', x + s.infoTitleIndent, y)		.text(L3.getLabel('rating'), x, y += 1.5 * s.lineHeight)		.text(option.schoolRating ? option.schoolRating.toString() + L3.getLabel('outOf') : '', x + s.infoTitleIndent, y)		.text(L3.getLabel('attend'), x, y += 1.5 * s.lineHeight)		.text(option.schoolAttend ? option.schoolAttend.toString() + '%' : '', x + s.infoTitleIndent, y)		.text(L3.getLabel('graduate'), x, y += 1.5 * s.lineHeight)		.text(option.schoolGraduate ? option.schoolGraduate.toString() + '%' : '', x + s.infoTitleIndent, y);	doc.setLineWidth(s.vertLine.thickness)		.line(s.vertLine.x, s.vertLine.y1, s.vertLine.x, s.vertLine.y2)		.setLineWidth(s.breakLine.thickness)		.line(s.breakLine.x1, s.breakLine.y, s.breakLine.x2, s.breakLine.y)		.line(s.breakLine.x1, s.breakLine.y + s.breakLine.yGap, s.breakLine.x2, s.breakLine.y + s.breakLine.yGap);}L3.getDirections = function getDirections(fromLoc, toLoc) {	var xhr, getString, result;		try {		xhr = new XMLHttpRequest();				getString = 'https://maps.googleapis.com/maps/api/directions/json?';		getString += 'origin=' + encodeURIComponent(fromLoc);		getString += '&destination=' + encodeURIComponent(toLoc);		getString += '&sensor=false';		xhr.open('GET', getString, false); // to connect to a Web site synchronously		xhr.send(); // send the request	} catch (e) {		return null;	}	if (xhr.status === 200) {		result = JSON.parse(xhr.responseText);		if (result.status === 'OK') {			return result.routes[0];		}		else {			return null;		}	}	else {		return null;	}}L3.getGoogleMap = function getGoogleMap(fromAddr, toAddr, dir) {	var xhr, getString, imgBuffer, imgBase64, imgBinary, api_key = require(getFolder('path') + 'APIKeys/Google.js');	try {		xhr = new XMLHttpRequest();		xhr.responseType = 'blob';		getString = 'https://maps.googleapis.com/maps/api/staticmap?';		getString += 'key=' + api_key.api_key();		getString += '&format=jpg&maptype=roadmap&size=240x240&zoom=1&sensor=false';		getString += '&markers=' + encodeURIComponent('color:red|label:Home|' + fromAddr);		getString += '&markers=' + encodeURIComponent('color:green|label:School|' + toAddr);		xhr.open('GET', getString, false); // to connect to a Web site synchronously		xhr.send(); // send the request	} catch (e) {		return null;	}	if (xhr.status === 200) {		imgBuffer = xhr.response.toBuffer();		imgBase64 = imgBuffer.toString('base64').replace(/[\n\r]/g, '');		imgBinary = atob(imgBase64);		return imgBinary	}	else {		return null;	}}L3.convertToText = function convertToText(h) {	var l, re, t = [];		t = h.split('<b>');	t.forEach(		function(e, i, x) {			var a = e.split('</b>');			if (a.length > 1) {				a[0] = a[0].toUpperCase();			}			x[i] = a;		}	);	l = t[t.length-1];	re = />(.+)</.exec(l[l.length-1]);	if (re) {		l[l.length-1] = re[1];	}	else {		l.length -= 1;	}	return t.join('');}L3.addStepToPage = function addStepToPage(doc, params, step, index) {	var d = params.directions;	var x = d.xStart + params.margin.left;	var y = d.yStart + index * d.lineHeight + params.margin.top;		doc.setFontStyle(d.fontStyle)		.setFontSize(d.fontSize)		.text((index + 1).toString() + '.', x, y)		.text(L3.convertToText(step.html_instructions), x + d.xCol2, y)		.text(step.duration.text, x + d.xCol3, y)		.text(step.distance.text, x + d.xCol4, y)		.setLineWidth(d.elementLine.thickness)		.line(d.elementLine.x1, y + d.elementLine.y, d.elementLine.x2, y+ d.elementLine.y);}L3.addDirectionsToPage = function addDirectionsToPage(doc, params, dir, gMap) {	var d = params.directions, leg, steps, yOffset;		if (dir) {		doc.setFontStyle(d.title.fontStyle)			.setFontSize(d.title.fontSize)			.text(L3.getLabel('directions'), d.title.x, d.title.y)			.line(d.title.line.x1, d.title.line.y, d.title.line.x2, d.title.line.y);					leg = dir.legs[0];		leg.steps.forEach(			function(s, i) {				L3.addStepToPage(doc, params, s, i);			}		);				yOffset = leg.steps.length * d.lineHeight;		doc.setFontStyle(d.total.fontStyle)			.setFontSize(d.total.fontSize)			.text(L3.getLabel('totalTravel'), d.total.x, d.total.y + yOffset)			.text(leg.duration.text, d.total.xDuration, d.total.y + yOffset)			.text(leg.distance.text, d.total.xDistance, d.total.y + yOffset)			.line(d.total.line.x1, d.total.line.y + yOffset, d.total.line.x2, d.total.line.y + yOffset);	}	else {		doc.setFontStyle(d.title.fontStyle)			.setFontSize(d.title.fontSize)			.text(L3.getLabel('noDirections'), d.title.x - 1.0, d.title.y)			.line(d.title.line.x1, d.title.line.y, d.title.line.x2, d.title.line.y);	}		yOffset = leg.steps.length * d.lineHeight;	doc.setFontStyle(d.notes.fontStyle)		.setFontSize(d.notes.fontSize)		.text(L3.getLabel('notes'), d.notes.x, d.notes.y + yOffset)		.line(d.notes.line.x1, d.notes.line.y + yOffset, d.notes.line.x2, d.notes.line.y+ yOffset);				doc.setLineWidth(d.breakLine.thickness)		.line(d.breakLine.x1, d.breakLine.y, d.breakLine.x2, d.breakLine.y)		.line(d.breakLine.x1, d.breakLine.y + d.breakLine.yGap, d.breakLine.x2, d.breakLine.y + d.breakLine.yGap);}L3.addFooterToPage = function addDirectionsToPage(doc, params, dir) {	var f = params.footer;	var x = f.xStart + params.margin.left;	var y = f.yStart + params.margin.top;		doc.setFontStyle(f.fontStyle)		.setFontSize(f.fontSize)		.text('(c) 2013 Families Empowered', x, y)		.text((new Date).toDateString(), x + f.xDateTime, y)		.text(dir.copyrights.replace('©', '(c) '), x + f.xGoogle, y)}L3.generatePage = function generatePage(doc, params, family, option) {	var dir, gMap;	var fromAddr = family.mainUSPSLine1 + ',' + family.mainUSPSLine2;	var toAddr = option.schoolUSPSLine1 + ',' + option.schoolUSPSLine2;		L3.addHeaderToPage(doc, params, family, option);	L3.addSchoolToPage(doc, params, option);	dir = L3.getDirections(fromAddr, toAddr);//	gMap = L3.getGoogleMap(fromAddr, toAddr, dir);	L3.addDirectionsToPage(doc, params, dir, gMap);	L3.addFooterToPage(doc, params, dir);	doc.rect(params.box.x, params.box.y, params.box.w, params.box.h);}		L3.generatePDF = function convertBallotToPDF(family, options) {	var params = L3.initializePDFParams();	var doc = new jsPDF(params.orient, params.unit, params.format);	//	L3.generatePage(doc, params, family, options.first());	options.forEach(		function(o, i) {			L3.generatePage(doc, params, family, o);			if (i < (options.length - 1)) {				doc.addPage();			}		}	);		return doc.output();}L3.generatePDFFileAndURL = function generatePDFFileAndURL(family, options, folderName) {		var pdfText = L3.generatePDF(family, options);		var fldr = getFolder('path') + 'WebFolder/' + folderName + '/';	var hash = generateUUID();	var urlName = fldr + hash + '.pdf';		var f = File(urlName);	var ts = TextStream(f, 'write');	ts.write(pdfText);	ts.close();		return (L3.SERVER_URL + folderName + '/' + hash + '.pdf');}