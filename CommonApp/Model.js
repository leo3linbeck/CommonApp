var L3 = L3 || {};

include('Javascript/Family.js');
include('Javascript/Person.js');

model = new DataStoreCatalog();

L3.Family = model.addClass('Family','Families');
L3.Family.addAttribute('ID', 					'storage',			'uuid', 		'key auto'		);
L3.Family.addAttribute('name', 					'storage',			'string', 		'btree'			);
L3.Family.addAttribute('mainStreet1', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('mainStreet2', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('mainCity', 				'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('mainState', 			'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('mainZipCode', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('primaryPhone', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('secondaryPhone', 		'storage',			'string', 		'btree'			);
L3.Family.addAttribute('uspsLine1', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('uspsLine2', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('uspsDeliveryPoint',		'storage',			'string',	 	'btree'			);
L3.Family.addAttribute('fplStatus', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('mapCoords', 			'storage',			'string', 		'btree'			);
L3.Family.addAttribute('applier',	 			'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('motherStatus', 			'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('fatherStatus', 			'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('nativeLanguage',		'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('languageSpokenAtHome',	'storage',			'string', 		'cluster'		);
L3.Family.addAttribute('father', 				'relatedEntity', 	'Person',	 	'Person'		);
L3.Family.addAttribute('mother', 				'relatedEntity', 	'Person', 		'Person'		);
L3.Family.addAttribute('guardian', 				'relatedEntity', 	'Person', 		'Person'		);
L3.Family.addAttribute('children', 				'relatedEntities',	'Children',		'belongsTo',	{reversePath: true});
L3.Family.addAttribute('numberOfChildren', 		'calculated',		'long'							);
	L3.Family.numberOfChildren.onGet = L3.familyNumberOfChildren;
L3.Family.addAttribute('schoolOptions', 		'relatedEntities',	'SchoolOptions','family', 		{reversePath: true});

L3.SMO = model.addClass('SMO','SMOs');
L3.SMO.addAttribute('ID', 						'storage',			'uuid', 		'key auto'		);
L3.SMO.addAttribute('name', 					'storage',			'string', 		'btree'			);
L3.SMO.addAttribute('category', 				'storage',			'string', 		'cluster'		);
L3.SMO.addAttribute('schools', 					'relatedEntities',	'Schools', 		'smo', 			{reversePath: true});
L3.SMO.addAttribute('superintendent', 			'storage',			'string', 		'btree'			);
L3.SMO.addAttribute('streetAddress1', 			'storage',			'string', 		'btree'			);
L3.SMO.addAttribute('streetAddress2', 			'storage',			'string', 		'btree'			);
L3.SMO.addAttribute('city', 					'storage',			'string', 		'cluster'		);
L3.SMO.addAttribute('state', 					'storage',			'string', 		'cluster'		);
L3.SMO.addAttribute('zipCode', 					'storage',			'string', 		'btree'			);
L3.SMO.addAttribute('uspsDeliveryPoint', 		'storage',			'string', 		'btree'			);

L3.School = model.addClass('School','Schools');
L3.School.addAttribute('ID', 					'storage',			'uuid', 		'key auto'		);
L3.School.addAttribute('name', 					'storage',			'string', 		'btree'			);
L3.School.addAttribute('smo',					'relatedEntity', 	'SMO', 			'SMO'			);
L3.School.addAttribute('category', 				'storage',			'string', 		'cluster'		);
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
L3.School.addAttribute('uspsDeliveryPoint',		'storage',			'string', 		'btree'			);
L3.School.addAttribute('mapCoords', 			'storage',			'string', 		'btree'			);
L3.School.addAttribute('applicants', 			'relatedEntities', 	'People', 		'appliedTo', 	{reversePath: true});
L3.School.addAttribute('enrolledStudents', 		'relatedEntities', 	'People', 		'enrolledAt', 	{reversePath: true});

L3.SchoolOption = model.addClass('SchoolOption','SchoolOptions');
L3.SchoolOption.addAttribute('ID', 				'storage',			'uuid', 		'key auto'		);
L3.SchoolOption.addAttribute('family', 			'relatedEntity',	'Family', 		'Family'		);
L3.SchoolOption.addAttribute('school', 			'relatedEntity', 	'School', 		'School'		);
L3.SchoolOption.addAttribute('distance',		'storage',			'number', 		'btree'			);
L3.SchoolOption.addAttribute('selected',		'storage',			'bool', 		'btree'			);
L3.SchoolOption.addAttribute('schoolName', 		'alias', 			'string', 		'school.name'	);
L3.SchoolOption.addAttribute('schoolMapCoords',	'alias', 			'string', 		'school.mapCoords'		);
L3.SchoolOption.addAttribute('schoolStart',		'alias', 			'string', 		'school.startingGrade'	);
L3.SchoolOption.addAttribute('schoolEnd',		'alias', 			'string', 		'school.endingGrade'	);
L3.SchoolOption.addAttribute('schoolCategory',	'alias', 			'string', 		'school.category'		);
L3.SchoolOption.addAttribute('schoolEnroll',	'alias', 			'string', 		'school.enrollment'		);
L3.SchoolOption.addAttribute('schoolRating',	'alias', 			'string', 		'school.rating'			);
L3.SchoolOption.addAttribute('schoolAttend',	'alias', 			'string', 		'school.attendance'		);
L3.SchoolOption.addAttribute('schoolGraduate',	'alias', 			'string', 		'school.graduationRate'	);

L3.Person = model.addClass('Person','People');
L3.Person.addAttribute('ID', 					'storage',			'uuid', 		'key auto'		);
L3.Person.addAttribute('firstName', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('middleName', 			'storage',			'string', 		'btree'			);
L3.Person.addAttribute('lastName', 				'storage',			'string', 		'btree'			);
L3.Person.addAttribute('suffix', 				'storage',			'string', 		'btree'			);
L3.Person.addAttribute('name', 					'storage',			'string', 		'btree'			);
L3.Person.addAttribute('gender', 				'storage',			'string', 		'cluster'		);
L3.Person.addAttribute('birthdate', 			'storage',			'date', 		'btree'			);
L3.Person.addAttribute('isMultiple', 			'storage',			'bool'							);
L3.Person.addAttribute('livesWith', 			'storage',			'string', 		'cluster'		);
L3.Person.addAttribute('nextGradeLevel', 		'storage',			'number', 		'cluster'		);
L3.Person.addAttribute('fullName', 				'calculated',		'string'						);
	L3.Person.fullName.onGet = L3.personGetFullName;
L3.Person.addAttribute('enrolledAt',			'relatedEntity', 	'School', 		'School'		);
L3.Person.addAttribute('appliedTo', 			'relatedEntity', 	'School', 		'School'		);

L3.Child = model.addClass('Child','Children');
L3.Child.addAttribute('ID', 					'storage',			'uuid', 		'key auto'		);
L3.Child.addAttribute('belongsTo', 				'relatedEntity', 	'Family', 		'Family'		);
L3.Child.addAttribute('person', 				'relatedEntity', 	'Person', 		'Person'		);
L3.Child.addAttribute('firstName', 				'alias', 			'string', 		'person.firstName'	);
L3.Child.addAttribute('middleName',				'alias', 			'string', 		'person.middleName'	);
L3.Child.addAttribute('fullName', 				'alias', 			'string', 		'person.fullName'	);

//// class methods

L3.Family.addMethod('addressLookup', 			'dataClass', 		L3.familyAddressLookup, 	'public'	);
L3.Family.addMethod('getNearbySchools', 		'dataClass', 		L3.familyGetNearbySchools, 	'public'	);
