var L3 = L3 || {};

model = new DataStoreCatalog();

include('Javascript/addresses.js');

L3.NEW_FAMILY_TEXT = 'SELECT TO ADD NEW FAMILY';

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
fam.addMethod('addressLookup', 'dataClass',
	function addressLookup(param) {
		var xhr, getString, v, c, families;

		if (param.debug) {
			debugger;
		}
		
		v = L3.getAddressInfo(param);
			
		if (v) {
			families = ds.Family.query('uspsDeliveryPoint = :1', v.delivery_point_barcode);
			
			c = families.find('name == :1',L3. NEW_FAMILY_TEXT);
			if (c === null) {
				c = ds.Family.createEntity();
				c.name = L3.NEW_FAMILY_TEXT;
				c.uspsDeliveryPoint = v.delivery_point_barcode;
				families.add(c);
			}
			c.homeStreet1 = param.street1;
			c.homeStreet2 = param.street2;
			c.homeCity = param.city;
			c.homeState = v.components.state_abbreviation;
			c.homeZipCode = v.components.zipcode + '-' + v.components.plus4_code;
			c.uspsLine1 = v.delivery_line_1;
			c.uspsLine2 = v.last_line;
			c.mapCoords = v.metadata.latitude + ',' + v.metadata.longitude;
			c.save();
			
			return families;
		}
		else {
			return null;
		}
	},
'public');
fam.addMethod('getNearbySchools', 'dataClass',
	function getNearbySchools(param) {
		var a, f;

		if (param.debug) {
			debugger;
		}
			
		f = ds.Family(param.familyID);
		a = ds.School.all().forEach(
			function (e, i) {
				
			}
		);
		if (c === null) {
			c = ds.Family.createEntity();
			c.name = NEW_FAMILY_TEXT;
			c.uspsDeliveryPoint = v.delivery_point_barcode;
			families.add(c);
		}
		c.homeStreet1 = param.street1;
		c.homeStreet2 = param.street2;
		c.homeCity = param.city;
		c.homeState = v.components.state_abbreviation;
		c.homeZipCode = v.components.zipcode + '-' + v.components.plus4_code;
		c.uspsLine1 = v.delivery_line_1;
		c.uspsLine2 = v.last_line;
		c.mapCoords = v.metadata.latitude + ',' + v.metadata.longitude;
		c.save();
		
		return families;
	},
'public');

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
sch.addAttribute('startingGrade', 'storage','long', 'btree');
sch.addAttribute('endingGrade', 'storage','long', 'btree');
sch.addAttribute('streetAddress1', 'storage','string', 'btree');
sch.addAttribute('streetAddress2', 'storage','string', 'btree');
sch.addAttribute('city', 'storage','string', 'cluster');
sch.addAttribute('state', 'storage','string', 'cluster');
sch.addAttribute('zipCode', 'storage','string', 'btree');
sch.addAttribute('uspsDeliveryPoint', 'storage','string', 'btree');
sch.addAttribute('smo', 'relatedEntity','SMO', 'SMO');

var famSch = model.addClass('FamilySchool','FamilySchools');
famSch.addAttribute('ID', 'storage','uuid', 'key auto');
famSch.addAttribute('family', 'relatedEntity','Family', 'Family');
famSch.addAttribute('school', 'relatedEntity','School', 'School');
famSch.addAttribute('distance', 'storage','number', 'btree');

