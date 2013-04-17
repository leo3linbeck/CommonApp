
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

	imageButtonNewChild.mouseover = function imageButtonNewChild_mouseover (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

	imageButtonNewChild.mouseout = function imageButtonNewChild_mouseout (event)// @startlock
	{// @endlock
		// Add your code here
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

	imageButtonNextChild.mouseout = function imageButtonNextChild_mouseout (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

	imageButtonNextChild.mouseover = function imageButtonNextChild_mouseover (event)// @startlock
	{// @endlock
		// Add your code here
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

	imageButtonPrevChild.mouseout = function imageButtonPrevChild_mouseout (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

	imageButtonPrevChild.mouseover = function imageButtonPrevChild_mouseover (event)// @startlock
	{// @endlock
		// Add your code here
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
	WAF.addListener(this.id + "_imageButtonNewChild", "mouseover", imageButtonNewChild.mouseover, "WAF");
	WAF.addListener(this.id + "_imageButtonNewChild", "mouseout", imageButtonNewChild.mouseout, "WAF");
	WAF.addListener(this.id + "_imageButtonNewChild", "click", imageButtonNewChild.click, "WAF");
	WAF.addListener(this.id + "_imageButtonNextChild", "mouseout", imageButtonNextChild.mouseout, "WAF");
	WAF.addListener(this.id + "_imageButtonPrevChild", "mouseout", imageButtonPrevChild.mouseout, "WAF");
	WAF.addListener(this.id + "_imageButtonPrevChild", "mouseover", imageButtonPrevChild.mouseover, "WAF");
	WAF.addListener(this.id + "_imageButtonNextChild", "mouseover", imageButtonNextChild.mouseover, "WAF");
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
