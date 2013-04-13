var L3 = L3 || {};

model = new DataStoreCatalog();

L3.fam = model.addClass('Family','Families');
L3.fam.addAttribute('ID', 'storage','uuid', 'key auto');
L3.fam.addAttribute('name', 'storage','string', 'btree');
L3.fam.addAttribute('homeStreet1', 'storage','string', 'btree');
L3.fam.addAttribute('homeStreet2', 'storage','string', 'btree');
L3.fam.addAttribute('homeCity', 'storage','string', 'cluster');
L3.fam.addAttribute('homeState', 'storage','string', 'cluster');
L3.fam.addAttribute('homeZipCode', 'storage','string', 'btree');
L3.fam.addAttribute('homePhone', 'storage','string', 'btree');
L3.fam.addAttribute('workPhone', 'storage','string', 'btree');
L3.fam.addAttribute('cellPhone', 'storage','string', 'btree');
L3.fam.addAttribute('uspsLine1', 'storage','string', 'btree');
L3.fam.addAttribute('uspsLine2', 'storage','string', 'btree');
L3.fam.addAttribute('uspsDeliveryPoint', 'storage','string', 'btree');
L3.fam.addAttribute('race', 'storage','string', 'cluster');
L3.fam.addAttribute('fplStatus', 'storage','string', 'btree');
L3.fam.addAttribute('mapCoords', 'storage','string', 'btree');
L3.fam.addAttribute('schoolChoices', 'relatedEntities', 'SchoolChoices', 'family', {reversePath: true});

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

L3.famChoice = model.addClass('SchoolChoice','SchoolChoices');
L3.famChoice.addAttribute('ID', 'storage','uuid', 'key auto');
L3.famChoice.addAttribute('family', 'relatedEntity', 'Family', 'Family');
L3.famChoice.addAttribute('school', 'relatedEntity', 'School', 'School');
L3.famChoice.addAttribute('distance', 'storage','number', 'btree');
L3.famChoice.addAttribute('schoolName', 'alias', 'string', 'school.name');
L3.famChoice.addAttribute('schoolMapCoords', 'alias', 'string', 'school.mapCoords');

// class methods

include('Javascript/Family.js');

L3.fam.addMethod('addressLookup', 'dataClass', L3.familyAddressLookup, 'public');
L3.fam.addMethod('getNearbySchools', 'dataClass', L3.familyGetNearbySchools, 'public');

