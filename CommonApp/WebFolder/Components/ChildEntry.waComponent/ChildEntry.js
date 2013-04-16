
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
		}
	}

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var childrenEvent = {};	// @dataSource
	var imageButtonPrevChild = {};	// @buttonImage
	var imageButtonNextChild = {};	// @buttonImage
	var textFieldStudentBirthdate = {};	// @textField
	var textFieldStudentLastName = {};	// @textField
	var textFieldStudentMiddleName = {};	// @textField
	var textFieldStudentFirstName = {};	// @textField
	// @endregion// @endlock

	function setChildAge(str) {
		$$(getHtmlId('textFieldStudentAge')).setValue(L3.calcAgeOnSept1(str));
	}

	// eventHandlers// @lock

	childrenEvent.onCollectionChange = function childrenEvent_onCollectionChange (event)// @startlock
	{// @endlock
		console.log('childrenEvent.onCollectionChange');
		setChildrenCount(event.dataSource);
		setChildAge(event.dataSource.birthdate.toString());
	};// @lock

	childrenEvent.onCurrentElementChange = function childrenEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		console.log('childrenEvent.onCurrentElementChange');
		if (!event.dataSource.lastName) {
			event.element.getAttribute('lastName').setValue(sources.family.name);
		}
		setChildrenCount(event.dataSource);
		setChildAge(event.dataSource.birthdate.toString());
	};// @lock

	imageButtonPrevChild.click = function imageButtonPrevChild_click (event)// @startlock
	{// @endlock
		console.log('imageButtonPrevChild.click');
		sources.children.save({onSuccess: function(event) {}});
		sources.children.selectPrevious({onSuccess: function(event) {}});
	};// @lock
	

	imageButtonNextChild.click = function imageButtonNextChild_click (event)// @startlock
	{// @endlock
		console.log('imageButtonNextChild.click');
		sources.children.save(
			{
				onSuccess: function (event) {
					if (event.dataSource.getPosition() === event.dataSource.length-1) {
						sources.children.addNewElement({onSuccess: function(event) {}});
					}
					else {
						sources.children.selectNext({onSuccess: function(event) {}});
					}
				}
			}
		);

	};// @lock

	textFieldStudentBirthdate.change = function textFieldStudentBirthdate_change (event)// @startlock
	{// @endlock
		setChildAge(this.getValue());
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
	WAF.addListener(this.id + "_children", "onCollectionChange", childrenEvent.onCollectionChange, "WAF");
	WAF.addListener(this.id + "_children", "onCurrentElementChange", childrenEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_imageButtonPrevChild", "click", imageButtonPrevChild.click, "WAF");
	WAF.addListener(this.id + "_imageButtonNextChild", "click", imageButtonNextChild.click, "WAF");
	WAF.addListener(this.id + "_textFieldStudentBirthdate", "change", textFieldStudentBirthdate.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentLastName", "change", textFieldStudentLastName.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentMiddleName", "change", textFieldStudentMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldStudentFirstName", "change", textFieldStudentFirstName.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
