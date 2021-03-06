﻿var L3 = L3 || {};

include('Javascript/Family.js');
include('Javascript/Person.js');
include('Javascript/SchoolOption.js');
include('Javascript/SchoolApplication.js');

model = new DataStoreCatalog();

L3.Family = model.addClass('Family','Families');
L3.Family.addAttribute('ID', 					'storage',			'uuid', 		'key auto'		);
L3.Family.addAttribute('name', 					'storage',			'string', 		'btree'			);
L3.Family.addAttribute('userID', 				'storage',			'string', 		'btree'			);
L3.Family.addAttribute('mainStreet1', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('mainStreet2', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('mainCity', 				'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('mainState', 			'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('mainZipCode', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('primaryPhoneType', 		'storage',			'string', 		'btree'			);
L3.Family.addAttribute('primaryPhone', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('secondaryPhone', 		'storage',			'string', 		'btree'			);
L3.Family.addAttribute('secondaryPhoneType', 	'storage',			'string', 		'btree'			);
L3.Family.addAttribute('mainUSPSLine1', 		'storage',			'string', 		'btree'			);
L3.Family.addAttribute('mainUSPSLine2', 		'storage',			'string', 		'btree'			);
L3.Family.addAttribute('mainUSPSDeliveryPoint',	'storage',			'string',	 	'btree'			);
L3.Family.addAttribute('mainMapCoords', 		'storage',			'string', 		'btree'			);
L3.Family.addAttribute('fplStatus', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('searchDistance',		'storage',			'number'						);
L3.Family.addAttribute('applier',	 			'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('motherStatus', 			'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('fatherStatus', 			'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('motherRace', 			'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('fatherRace', 			'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('childCustody', 			'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('nativeLanguage',		'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('languageSpokenAtHome',	'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('guardianRelationship',	'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('numberOfChildren', 		'calculated',		'long'							);
	L3.Family.numberOfChildren.onGet = L3.familyNumberOfChildren;
L3.Family.addAttribute('father', 				'relatedEntity', 	'Person',	 	'Person'		);
L3.Family.addAttribute('mother', 				'relatedEntity', 	'Person', 		'Person'		);
L3.Family.addAttribute('guardian', 				'relatedEntity', 	'Person', 		'Person'		);
L3.Family.addAttribute('children', 				'relatedEntities',	'People',		'childOf',		{reversePath: true});
L3.Family.addAttribute('schoolOptions', 		'relatedEntities',	'SchoolOptions','family', 		{reversePath: true});
L3.Family.addMethod('conjureID',	 			'dataClass',		L3.familyConjureID, 		'public'	);
L3.Family.addMethod('getPhoneByType', 			'entity', 			L3.familyGetPhoneType,	 	'public'	);
L3.Family.addEventListener('onRestrictingQuery',
	function familyRestrictingQuery() {
		var session = currentSession();
		if (session.belongsTo('Staff')) {
			return ds.Family.all();
		}
		else {
			return ds.Family.query('userID === :1', session.user.ID);
		}
	}
);

L3.SMO = model.addClass('SMO','SMOs');
L3.SMO.addAttribute('ID', 						'storage',			'uuid', 		'key auto'		);
L3.SMO.addAttribute('name', 					'storage',			'string', 		'btree'			);
L3.SMO.addAttribute('category', 				'storage',			'string', 		'cluster'		);
L3.SMO.addAttribute('superintendent', 			'storage',			'string', 		'btree'			);
L3.SMO.addAttribute('streetAddress1', 			'storage',			'string', 		'btree'			);
L3.SMO.addAttribute('streetAddress2', 			'storage',			'string', 		'btree'			);
L3.SMO.addAttribute('city', 					'storage',			'string', 		'cluster'		);
L3.SMO.addAttribute('state', 					'storage',			'string', 		'cluster'		);
L3.SMO.addAttribute('zipCode', 					'storage',			'string', 		'btree'			);
L3.SMO.addAttribute('uspsDeliveryPoint', 		'storage',			'string', 		'btree'			);
L3.SMO.addAttribute('schools', 					'relatedEntities',	'Schools', 		'smo', 			{reversePath: true});

L3.School = model.addClass('School','Schools');
L3.School.addAttribute('ID', 					'storage',			'uuid', 		'key auto'		);
L3.School.addAttribute('name', 					'storage',			'string', 		'btree'			);
L3.School.addAttribute('category', 				'storage',			'string', 		'cluster'		);
L3.School.addAttribute('url',		 			'storage',			'string', 		'btree'			);
L3.School.addAttribute('schoolLeader', 			'storage',			'string', 		'btree'			);
L3.School.addAttribute('startingGrade', 		'storage',			'long', 		'cluster'		);
L3.School.addAttribute('endingGrade', 			'storage',			'long', 		'cluster'		);
L3.School.addAttribute('enrollment', 			'storage',			'long', 		'btree'			);
L3.School.addAttribute('rating', 				'storage',			'number', 		'btree'			);
L3.School.addAttribute('attendance', 			'storage',			'number',	 	'btree'			);
L3.School.addAttribute('graduationRate', 		'storage',			'number', 		'btree'			);
L3.School.addAttribute('rawAddress', 			'storage',			'string'						);
L3.School.addAttribute('streetAddress1', 		'storage',			'string', 		'btree'			);
L3.School.addAttribute('streetAddress2', 		'storage',			'string'						);
L3.School.addAttribute('city', 					'storage',			'string', 		'cluster'		);
L3.School.addAttribute('state', 				'storage',			'string', 		'cluster'		);
L3.School.addAttribute('zipCode', 				'storage',			'string', 		'btree'			);
L3.School.addAttribute('mainPhone', 			'storage',			'string',	 	'btree'			);
L3.School.addAttribute('email',		 			'storage',			'string',	 	'btree'			);
L3.School.addAttribute('uspsLine1',				'storage',			'string', 		'btree'			);
L3.School.addAttribute('uspsLine2',				'storage',			'string', 		'btree'			);
L3.School.addAttribute('uspsDeliveryPoint',		'storage',			'string', 		'btree'			);
L3.School.addAttribute('mapCoords', 			'storage',			'string', 		'btree'			);
L3.School.addAttribute('smo',					'relatedEntity', 	'SMO', 					'SMO'				);
L3.School.addAttribute('applicationForm',		'relatedEntity', 	'ApplicationForm', 		'ApplicationForm'	);
L3.School.addAttribute('enrolledStudents', 		'relatedEntities', 	'People', 				'enrolledAt', 	{reversePath: true});
L3.School.addAttribute('receivedApplications',	'relatedEntities', 	'SchoolApplications',	'submittedTo', 	{reversePath: true});
L3.School.addAttribute('considerationSet',		'relatedEntities', 	'SchoolOptions',		'school', 		{reversePath: true});

L3.SchoolOption = model.addClass('SchoolOption','SchoolOptions');
L3.SchoolOption.addAttribute('ID', 				'storage',			'uuid', 		'key auto'		);
L3.SchoolOption.addAttribute('distance',		'storage',			'number', 		'btree'			);
L3.SchoolOption.addAttribute('selected',		'storage',			'bool', 		'btree'			);
L3.SchoolOption.addAttribute('selectedIcon', 	'calculated',		'string'						);
	L3.SchoolOption.selectedIcon.onGet = L3.schoolOptionSelectedIcon;
L3.SchoolOption.addAttribute('userID', 			'alias',			'string', 		'family.userID'			);
L3.SchoolOption.addAttribute('schoolName', 		'alias', 			'string', 		'school.name'			);
L3.SchoolOption.addAttribute('schoolUSPSLine1',	'alias', 			'string', 		'school.uspsLine1'		);
L3.SchoolOption.addAttribute('schoolUSPSLine2',	'alias', 			'string', 		'school.uspsLine2'		);
L3.SchoolOption.addAttribute('schoolPhone',		'alias', 			'string', 		'school.mainPhone'		);
L3.SchoolOption.addAttribute('schoolEmail',		'alias', 			'string', 		'school.email'			);
L3.SchoolOption.addAttribute('schoolURL',		'alias', 			'string', 		'school.url'			);
L3.SchoolOption.addAttribute('schoolMapCoords',	'alias', 			'string', 		'school.mapCoords'		);
L3.SchoolOption.addAttribute('schoolStart',		'alias', 			'string', 		'school.startingGrade'	);
L3.SchoolOption.addAttribute('schoolEnd',		'alias', 			'string', 		'school.endingGrade'	);
L3.SchoolOption.addAttribute('schoolCategory',	'alias', 			'string', 		'school.category'		);
L3.SchoolOption.addAttribute('schoolEnroll',	'alias', 			'string', 		'school.enrollment'		);
L3.SchoolOption.addAttribute('schoolRating',	'alias', 			'string', 		'school.rating'			);
L3.SchoolOption.addAttribute('schoolAttend',	'alias', 			'string', 		'school.attendance'		);
L3.SchoolOption.addAttribute('schoolGraduate',	'alias', 			'string', 		'school.graduationRate'	);
L3.SchoolOption.addAttribute('family', 			'relatedEntity',	'Family', 		'Family'		);
L3.SchoolOption.addAttribute('school', 			'relatedEntity', 	'School', 		'School'		);
L3.SchoolOption.addEventListener('onRestrictingQuery',
	function schoolOptionRestrictingQuery() {
		var session = currentSession();
		if (session.belongsTo('Staff')) {
			return ds.SchoolOption.all();
		}
		else {
			return ds.SchoolOption.query('userID === :1', session.user.ID);
		}
	}
);

L3.Person = model.addClass('Person','People');
L3.Person.addAttribute('ID', 					'storage',			'uuid', 		'key auto'		);
L3.Person.addAttribute('firstName', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('middleName', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('lastName', 				'storage',			'string', 		'btree'			);
L3.Person.addAttribute('suffix', 				'storage',			'string'						);
L3.Person.addAttribute('nickname', 				'storage',			'string', 		'btree'			);
L3.Person.addAttribute('homeAddressSameAsMain',	'storage',			'bool', 		'cluster'		);
L3.Person.addAttribute('homeStreet1', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('homeStreet2', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('homeCity', 				'storage',			'string', 		'cluster'		);
L3.Person.addAttribute('homeState', 			'storage',			'string', 		'cluster'		);
L3.Person.addAttribute('homeZipCode', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('homeUSPSLine1',			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('homeUSPSLine2',			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('homeMapCoords',			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('homeUSPSDeliveryPoint',	'storage',			'string', 		'btree'			);
L3.Person.addAttribute('homeZipCode', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('workStreet1', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('workStreet2', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('workCity', 				'storage',			'string', 		'cluster'		);
L3.Person.addAttribute('workState', 			'storage',			'string', 		'cluster'		);
L3.Person.addAttribute('workZipCode', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('workUSPSLine1',			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('workUSPSLine2',			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('workMapCoords',			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('workUSPSDeliveryPoint',	'storage',			'string', 		'btree'			);
L3.Person.addAttribute('homePhone', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('workPhone', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('cellPhone', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('emailAddress', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('employer', 				'storage',			'string', 		'btree'			);
L3.Person.addAttribute('occupation', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('relationship',		 	'storage',			'string', 		'btree'			);
L3.Person.addAttribute('gender', 				'storage',			'string', 		'cluster'		);
L3.Person.addAttribute('race', 					'storage',			'string', 		'cluster'		);
L3.Person.addAttribute('birthdate', 			'storage',			'date', 		'btree'			);
L3.Person.addAttribute('isMultiple', 			'storage',			'bool'							);
L3.Person.addAttribute('livesWith', 			'storage',			'string', 		'cluster'		);
L3.Person.addAttribute('nextGradeLevel', 		'storage',			'long', 		'cluster'		);
L3.Person.addAttribute('isApplying', 			'storage',			'bool', 		'cluster'		);
L3.Person.addAttribute('salesforceID', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('needsPushToSalesforce', 'storage',			'bool', 		'cluster'		);
L3.Person.addAttribute('userID', 				'alias',			'string', 		'childOf.userID'		);
L3.Person.addAttribute('fullName', 				'calculated',		'string'						);
	L3.Person.fullName.onGet = L3.personGetFullName;
L3.Person.addAttribute('ageToday', 				'calculated',		'long'							);
	L3.Person.ageToday.onGet = L3.personGetAgeToday;
L3.Person.addAttribute('childOf', 				'relatedEntity', 	'Family', 		'Family'		);
L3.Person.addAttribute('enrolledAt',			'relatedEntity', 	'School', 		'School'		);
L3.Person.addAttribute('fatherFamilies',		'relatedEntities', 	'Families', 				'father', 		{reversePath: true});
L3.Person.addAttribute('motherFamilies',		'relatedEntities', 	'Families', 				'mother', 		{reversePath: true});
L3.Person.addAttribute('guardianFamilies',		'relatedEntities', 	'Families', 				'guardian', 	{reversePath: true});
L3.Person.addAttribute('submittedApplications',	'relatedEntities', 	'SchoolApplications', 		'applicant', 	{reversePath: true});
L3.Person.addEventListener('onRestrictingQuery',
	function personRestrictingQuery() {
		var session = currentSession();
		if (session.belongsTo('Staff')) {
			return ds.Person.all();
		}
		else {
			return ds.Person.query('userID === :1', session.user.ID);
		}
	}
);

L3.Child = model.addClass('Child','Children','public','Person');

L3.SchoolApplication = model.addClass('SchoolApplication','SchoolApplications');
L3.SchoolApplication.addAttribute('ID', 					'storage',			'uuid', 		'key auto'		);
L3.SchoolApplication.addAttribute('url',		 			'storage',			'string', 		'btree'			);
L3.SchoolApplication.addAttribute('preparedOn', 			'storage',			'date', 		'btree'			);
L3.SchoolApplication.addAttribute('submittedOn', 			'storage',			'date', 		'btree'			);
L3.SchoolApplication.addAttribute('forSchoolYear', 			'storage',			'long', 		'cluster'		);
L3.SchoolApplication.addAttribute('userID', 				'alias',			'string', 		'applicant.userID'		);
L3.SchoolApplication.addAttribute('applicantName', 			'alias', 			'string', 		'applicant.fullName'	);
L3.SchoolApplication.addAttribute('applicantNickname', 		'alias', 			'string', 		'applicant.nickname'	);
L3.SchoolApplication.addAttribute('schoolName', 			'alias', 			'string', 		'submittedTo.name'		);
L3.SchoolApplication.addAttribute('schoolCategory',			'alias', 			'string', 		'submittedTo.category'	);
L3.SchoolApplication.addAttribute('submittedTo',			'relatedEntity', 	'School', 		'School'		);
L3.SchoolApplication.addAttribute('applicant',				'relatedEntity', 	'Person', 		'Person'		);
L3.SchoolApplication.addMethod('applicationDoesNotExist',	'dataClass',		L3.applicationDoesNotExist,		 	'public'	);
L3.SchoolApplication.addEventListener('onRestrictingQuery',
	function schoolApplicationRestrictingQuery() {
		var session = currentSession();
		if (session.belongsTo('Staff')) {
			return ds.SchoolApplication.all();
		}
		else {
			return ds.SchoolApplication.query('userID === :1', session.user.ID);
		}
	}
);

L3.ApplicationForm = model.addClass('ApplicationForm','ApplicationForms');
L3.ApplicationForm.addAttribute('ID', 					'storage',			'uuid', 		'key auto'		);
L3.ApplicationForm.addAttribute('name',		 			'storage',			'string', 		'btree'			);
L3.ApplicationForm.addAttribute('forYear',		 		'storage',			'long', 		'btree'			);
L3.ApplicationForm.addAttribute('imageURL',		 		'storage',			'string', 		'btree'			);
L3.ApplicationForm.addAttribute('usedBy',		 		'relatedEntities',	'Schools', 		'applicationForm', 	{reversePath: true});
L3.ApplicationForm.addAttribute('elements',		 		'relatedEntities',	'FormElements', 'form', 			{reversePath: true});

L3.FormElement = model.addClass('FormElement','FormElements');
L3.FormElement.addAttribute('ID', 					'storage',			'uuid', 		'key auto'		);
L3.FormElement.addAttribute('name',		 			'storage',			'string', 		'btree'			);
L3.FormElement.addAttribute('reference',		 	'storage',			'string', 		'btree'			);
L3.FormElement.addAttribute('cssStyle',		 		'storage',			'string', 		'btree'			);
L3.FormElement.addAttribute('form',		 			'relatedEntity',	'ApplicationForm', 		'ApplicationForm'		);

L3.SubmittedForm = model.addClass('SubmittedForm','SubmittedForms');
L3.SubmittedForm.addAttribute('ID', 					'storage',			'uuid', 				'key auto'			);
L3.SubmittedForm.addAttribute('name',		 			'storage',			'string', 				'btree'				);
L3.SubmittedForm.addAttribute('imageURL',		 		'storage',			'string', 				'btree'				);
L3.SubmittedForm.addAttribute('schoolApplication',		'relatedEntity',	'SchoolApplication',	'SchoolApplication'	);
L3.SubmittedForm.addAttribute('submittedElements',		'relatedEntities',	'SubmittedElements',	'submittedForm', 	{reversePath: true});

L3.SubmittedElement = model.addClass('SubmittedElement','SubmittedElements');
L3.SubmittedElement.addAttribute('ID', 					'storage',			'uuid', 				'key auto'			);
L3.SubmittedElement.addAttribute('value',			 	'storage',			'string', 				'btree'				);
L3.SubmittedElement.addAttribute('cssStyle',		 	'storage',			'string', 				'btree'				);
L3.SubmittedElement.addAttribute('submittedForm',		'relatedEntity',	'SubmittedForm', 		'SubmittedForm'		);

