
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'StudentEntry';
	// @endregion// @endlock

	this.setChildrenCount = function setChildrenCount(d) {
		console.log('setChildrenCount()');
		var p = d.getPosition() + 1;
		if (p > 0) {
			var m = d.length;
			$$(getHtmlId('richTextChildrenCount')).setValue(p + ' of ' + m);
			if (p === 1) {
				$$(getHtmlId('imageButtonPrevChild')).hide();
			}
			else {
				$$(getHtmlId('imageButtonPrevChild')).show();
			}
			if (p === m) {
				$$(getHtmlId('imageButtonNextChild')).hide();
				$$(getHtmlId('imageButtonNewChild')).show();
			}
			else {
				$$(getHtmlId('imageButtonNextChild')).show();
				$$(getHtmlId('imageButtonNewChild')).hide();
			}
		}
	}

	this.setChildAge = function setChildAge(v) {
		$$(getHtmlId('textFieldStudentAge')).setValue(L3.calcAgeOnSept1(v));
	}

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var imageButtonRemoveChild = {};	// @buttonImage
	var imageButtonNewChild = {};	// @buttonImage
	var imageButtonNextChild = {};	// @buttonImage
	var childrenEvent = {};	// @dataSource
	var imageButtonPrevChild = {};	// @buttonImage
	var textFieldStudentBirthdate = {};	// @textField
	var textFieldStudentLastName = {};	// @textField
	var textFieldStudentMiddleName = {};	// @textField
	var textFieldStudentFirstName = {};	// @textField
	// @endregion// @endlock


	// eventHandlers// @lock

	imageButtonRemoveChild.click = function imageButtonRemoveChild_click (event)// @startlock
	{// @endlock
		var v;
		
		console.log('imageButtonRemoveChild.click');
		v = sources.children.getCurrentElement();
		sources.children.removeCurrentReference(
			{
				onSuccess: function (event) {
					v.remove();
				},
				onError: function(error) {
					console.log(error);
				}
			}
		);

	};// @lock

	imageButtonNewChild.click = function imageButtonNewChild_click (event)// @startlock
	{// @endlock
		console.log('imageButtonNextChild.click');
		sources.children.save(
			{
				onSuccess: function (event) {
					if (event.dataSource.getPosition() === event.dataSource.length-1) {
						sources.children.addNewElement();
					}
					else {
						sources.children.selectNext();
					}
				}
			}
		);

	};// @lock

	imageButtonNextChild.click = function imageButtonNextChild_click (event)// @startlock
	{// @endlock
		console.log('imageButtonNextChild.click');
		sources.children.save(
			{
				onSuccess: function (event) {
					if (event.dataSource.getPosition() === event.dataSource.length-1) {
						sources.children.addNewElement();
					}
					else {
						sources.children.selectNext();
					}
				}
			}
		);

	};// @lock

	childrenEvent.onCollectionChange = function childrenEvent_onCollectionChange (event)// @startlock
	{// @endlock
		console.log('childrenEvent.onCollectionChange');
		if (!event.dataSource.lastName) {
			event.element.getAttribute('lastName').setValue(sources.family.name);
		}
		setChildrenCount(event.dataSource);
		$comp.setChildAge(event.dataSource.birthdate);
	};// @lock

	imageButtonPrevChild.click = function imageButtonPrevChild_click (event)// @startlock
	{// @endlock
		console.log('imageButtonPrevChild.click');
		sources.children.save({onSuccess: function(event) {}});
		sources.children.selectPrevious();
	};// @lock
	

	textFieldStudentBirthdate.change = function textFieldStudentBirthdate_change (event)// @startlock
	{// @endlock
		$comp.setChildAge(new Date(this.getValue()));
	};// @lock

	textFieldStudentLastName.change = function textFieldStudentLastName_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldStudentMiddleName.change = function textFieldStudentMiddleName_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldStudentFirstName.change = function textFieldStudentFirstName_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_imageButtonRemoveChild", "click", imageButtonRemoveChild.click, "WAF");
	WAF.addListener(this.id + "_imageButtonNewChild", "click", imageButtonNewChild.click, "WAF");
	WAF.addListener(this.id + "_imageButtonNextChild", "click", imageButtonNextChild.click, "WAF");
	WAF.addListener(this.id + "_children", "onCollectionChange", childrenEvent.onCollectionChange, "WAF");
	WAF.addListener(this.id + "_imageButtonPrevChild", "click", imageButtonPrevChild.click, "WAF");
	WAF.addListener(this.id + "_textFieldStudentBirthdate", "change", textFieldStudentBirthdate.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentLastName", "change", textFieldStudentLastName.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentMiddleName", "change", textFieldStudentMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentFirstName", "change", textFieldStudentFirstName.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
