﻿include('Javascript/addresses.js');L3.personGetFullName = function personGetFullName() {	return this.firstName + (this.middleName ? ' ' + this.middleName : '') + (this.lastName ? ' ' + this.lastName : '') + (this.suffix ? ' ' + this.suffix : '')}L3.personGetAgeToday = function personGetAgeToday() {	var bday = this.birthdate;	if (bday) {		var today = new Date;		var age =  today.getFullYear() - bday.getFullYear();		if (today.getMonth() < bday.getMonth()) {			age -= 1;		}		else {			if (today.getMonth() === bday.getMonth() && today.getDay() < bday.getDay()) {				age -= 1;			}		}		return age;	}	else {		return null;	}}