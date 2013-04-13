var L3 = L3 || {};

model = new DataStoreCatalog();

L3.fam = model.addClass('Family','Families');
L3.fam.addAttribute('ID', 'storage','uuid', 'key auto');
L3.fam.addAttribute('name', 'storage','string', 'btree');
L3.fam.addAttribute('mainStreet1', 'storage','string', 'btree');
L3.fam.addAttribute('mainStreet2', 'storage','string', 'btree');
L3.fam.addAttribute('mainCity', 'storage','string', 'cluster');
L3.fam.addAttribute('mainState', 'storage','string', 'cluster');
L3.fam.addAttribute('mainZipCode', 'storage','string', 'btree');
L3.fam.addAttribute('primaryPhone', 'storage','string', 'btree');
L3.fam.addAttribute('secondaryPhone', 'storage','string', 'btree');
L3.fam.addAttribute('uspsLine1', 'storage','string', 'btree');
L3.fam.addAttribute('uspsLine2', 'storage','string', 'btree');
L3.fam.addAttribute('uspsDeliveryPoint', 'storage','string', 'btree');
L3.fam.addAttribute('fplStatus', 'storage','string', 'btree');
L3.fam.addAttribute('mapCoords', 'storage','string', 'btree');
L3.fam.addAttribute('schoolChoices', 'relatedEntities', 'SchoolChoices', 'family', {reversePath: true});
L3.fam.addAttribute('members', 'relatedEntities', 'FamilyMembers', 'belongsTo', {reversePath: true});

L3.smo = model.addClass('SMO','SMOs');
L3.smo.addAttribute('ID', 'storage','uuid', 'key auto');
L3.smo.addAttribute('name', 'storage','string', 'btree');
L3.smo.addAttribute('category', 'storage','string', 'cluster');
L3.smo.addAttribute('schools', 'relatedEntities','Schools', 'smo', {reversePath: true});
L3.smo.addAttribute('superintendent', 'storage','string', 'btree');
L3.smo.addAttribute('streetAddress1', 'storage','string', 'btree');
L3.smo.addAttribute('streetAddress2', 'storage','string', 'btree');
L3.smo.addAttribute('city', 'storage','string', 'cluster');
L3.smo.addAttribute('state', 'storage','string', 'cluster');
L3.smo.addAttribute('zipCode', 'storage','string', 'btree');
L3.smo.addAttribute('uspsDeliveryPoint', 'storage','string', 'btree');

L3.sch = model.addClass('School','Schools');
L3.sch.addAttribute('ID', 'storage','uuid', 'key auto');
L3.sch.addAttribute('name', 'storage','string', 'btree');
L3.sch.addAttribute('smo','relatedEntity', 'SMO', 'SMO');
L3.sch.addAttribute('category', 'storage','string', 'cluster');
L3.sch.addAttribute('schoolLeader', 'storage','string', 'btree');
L3.sch.addAttribute('startingGrade', 'storage','long', 'cluster');
L3.sch.addAttribute('endingGrade', 'storage','long', 'cluster');
L3.sch.addAttribute('enrollment', 'storage','long', 'btree');
L3.sch.addAttribute('rating', 'storage','number', 'btree');
L3.sch.addAttribute('attendance', 'storage','number', 'btree');
L3.sch.addAttribute('graduationRate', 'storage','number', 'btree');
L3.sch.addAttribute('rawAddress', 'storage','string');
L3.sch.addAttribute('streetAddress1', 'storage','string', 'btree');
L3.sch.addAttribute('streetAddress2', 'storage','string', 'btree');
L3.sch.addAttribute('city', 'storage','string', 'cluster');
L3.sch.addAttribute('state', 'storage','string', 'cluster');
L3.sch.addAttribute('zipCode', 'storage','string', 'btree');
L3.sch.addAttribute('mainPhone', 'storage','string', 'btree');
L3.sch.addAttribute('uspsDeliveryPoint', 'storage','string', 'btree');
L3.sch.addAttribute('mapCoords', 'storage','string', 'btree');
L3.sch.addAttribute('enrolledStudents', 'relatedEntities', 'Students', 'enrolledAt', {reversePath: true});

L3.famChoice = model.addClass('SchoolChoice','SchoolChoices');
L3.famChoice.addAttribute('ID', 'storage','uuid', 'key auto');
L3.famChoice.addAttribute('family', 'relatedEntity', 'Family', 'Family');
L3.famChoice.addAttribute('school', 'relatedEntity', 'School', 'School');
L3.famChoice.addAttribute('distance', 'storage','number', 'btree');
L3.famChoice.addAttribute('schoolName', 'alias', 'string', 'school.name');
L3.famChoice.addAttribute('schoolMapCoords', 'alias', 'string', 'school.mapCoords');

L3.per = model.addClass('Person','People');
L3.per.addAttribute('ID', 'storage','uuid', 'key auto');
L3.per.addAttribute('firstName', 'storage','string', 'btree');
L3.per.addAttribute('middleName', 'storage','string', 'btree');
L3.per.addAttribute('lastName', 'storage','string', 'btree');
L3.per.addAttribute('suffix', 'storage','string', 'btree');
L3.per.addAttribute('name', 'storage','string', 'btree');
L3.per.addAttribute('gender', 'storage','string', 'cluster');
L3.per.addAttribute('birthdate', 'storage','date', 'btree');
L3.per.addAttribute('isMultiple', 'storage','boolean');
L3.per.addAttribute('livesWith', 'storage','string', 'cluster');
L3.per.addAttribute('nextGradeLevel', 'storage','number', 'cluster');

L3.famMem = model.addClass('FamilyMember','FamilyMembers', 'public', 'Person');
L3.famMem.addAttribute('belongsTo', 'relatedEntity', 'Family', 'Family');

L3.stu = model.addClass('Student','Students', 'public', 'FamilyMember');
L3.stu.addAttribute('enrolledAt', 'relatedEntity', 'School', 'School');

// class methods

include('Javascript/Family.js');

L3.fam.addMethod('addressLookup', 'dataClass', L3.familyAddressLookup, 'public');
L3.fam.addMethod('getNearbySchools', 'dataClass', L3.familyGetNearbySchools, 'public');

