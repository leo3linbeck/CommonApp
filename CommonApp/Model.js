var L3 = L3 || {};

model = new DataStoreCatalog();

include('Javascript/addresses.js');

L3.NEW_FAMILY_TEXT = 'SELECT TO ADD NEW FAMILY';

include('Javascript/Family.js');
var fam = model.addClass('Family','Families');
fam.addAttribute('ID', 'storage','uuid', 'key auto');
fam.addAttribute('name', 'storage','string', 'btree');
fam.addAttribute('homeStreet1', 'storage','string', 'btree');
fam.addAttribute('homeStreet2', 'storage','string', 'btree');
fam.addAttribute('homeCity', 'storage','string', 'cluster');
fam.addAttribute('homeState', 'storage','string', 'cluster');
fam.addAttribute('homeZipCode', 'storage','string', 'btree');
fam.addAttribute('homePhone', 'storage','string', 'btree');
fam.addAttribute('workPhone', 'storage','string', 'btree');
fam.addAttribute('cellPhone', 'storage','string', 'btree');
fam.addAttribute('uspsLine1', 'storage','string', 'btree');
fam.addAttribute('uspsLine2', 'storage','string', 'btree');
fam.addAttribute('uspsDeliveryPoint', 'storage','string', 'btree');
fam.addAttribute('race', 'storage','string', 'cluster');
fam.addAttribute('fplStatus', 'storage','string', 'btree');
fam.addAttribute('mapCoords', 'storage','string', 'btree');
fam.addAttribute('nearbySchools', 'relatedEntities','FamilySchools', 'family', {reversePath: true});
fam.addMethod('addressLookup', 'dataClass', L3.familyAddressLookup, 'public');
fam.addMethod('getNearbySchools', 'dataClass', L3.familyGetNearbySchools, 'public');

var smo = model.addClass('SMO','SMOs');
smo.addAttribute('ID', 'storage','uuid', 'key auto');
smo.addAttribute('name', 'storage','string', 'btree');
smo.addAttribute('category', 'storage','string', 'cluster');
smo.addAttribute('superintendent', 'storage','string', 'btree');
smo.addAttribute('streetAddress1', 'storage','string', 'btree');
smo.addAttribute('streetAddress2', 'storage','string', 'btree');
smo.addAttribute('city', 'storage','string', 'cluster');
smo.addAttribute('state', 'storage','string', 'cluster');
smo.addAttribute('zipCode', 'storage','string', 'btree');
smo.addAttribute('uspsDeliveryPoint', 'storage','string', 'btree');
smo.addAttribute('schools', 'relatedEntities','Schools', 'smo', {reversePath: true});

var sch = model.addClass('School','Schools');
sch.addAttribute('ID', 'storage','uuid', 'key auto');
sch.addAttribute('name', 'storage','string', 'btree');
sch.addAttribute('category', 'storage','string', 'cluster');
sch.addAttribute('schoolLeader', 'storage','string', 'btree');
sch.addAttribute('startingGrade', 'storage','long', 'cluster');
sch.addAttribute('endingGrade', 'storage','long', 'cluster');
sch.addAttribute('enrollment', 'storage','long', 'btree');
sch.addAttribute('rating', 'storage','number', 'btree');
sch.addAttribute('attendance', 'storage','number', 'btree');
sch.addAttribute('graduationRate', 'storage','number', 'btree');
sch.addAttribute('rawAddress', 'storage','string');
sch.addAttribute('streetAddress1', 'storage','string', 'btree');
sch.addAttribute('streetAddress2', 'storage','string', 'btree');
sch.addAttribute('city', 'storage','string', 'cluster');
sch.addAttribute('state', 'storage','string', 'cluster');
sch.addAttribute('zipCode', 'storage','string', 'btree');
sch.addAttribute('mainPhone', 'storage','string', 'btree');
sch.addAttribute('uspsDeliveryPoint', 'storage','string', 'btree');
sch.addAttribute('mapCoords', 'storage','string', 'btree');
sch.addAttribute('smo', 'relatedEntity','SMO', 'SMO');

var famSch = model.addClass('FamilySchool','FamilySchools');
famSch.addAttribute('ID', 'storage','uuid', 'key auto');
famSch.addAttribute('family', 'relatedEntity','Family', 'Family');
famSch.addAttribute('school', 'relatedEntity','School', 'School');
famSch.addAttribute('schoolName', 'alias', 'School', 'school.name');
famSch.addAttribute('distance', 'storage','number', 'btree');

