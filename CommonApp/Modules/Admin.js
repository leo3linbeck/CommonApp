﻿exports.createNewUser = function createNewUser (fullname, username, password) {		var newUser = directory.addUser(username, password, fullname);	newUser.putInto('Applicants');	directory.save();		return newUser;};