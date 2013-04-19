
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'StudentEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var childrenEvent = {};	// @dataSource
	var textFieldNickname = {};	// @textField
	var imageButtonRemoveChild = {};	// @buttonImage
	var imageButtonNewChild = {};	// @buttonImage
	var imageButtonNextChild = {};	// @buttonImage
	var imageButtonPrevChild = {};	// @buttonImage
	var textFieldStudentBirthdate = {};	// @textField
	var textFieldStudentLastName = {};	// @textField
	var textFieldStudentMiddleName = {};	// @textField
	var textFieldStudentFirstName = {};	// @textField
	// @endregion// @endlock

	function setChildrenCount(d) {
		console.log('setChildrenCount()', d);
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

	function setChildAge(v) {
		$$(getHtmlId('textFieldStudentAge')).setValue(L3.calcAgeOnSept1(v));
	}

	// eventHandlers// @lock

	childrenEvent.onCurrentElementChange = function childrenEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		console.log('childrenEvent.onCurrentElementChange', event);
		if (!event.dataSource.lastName) {
			event.dataSource.getAttribute('lastName').setValue(sources.family.name);
		}
		setChildrenCount(event.dataSource);
		setChildAge(event.dataSource.birthdate);
	};// @lock

	textFieldNickname.change = function textFieldNickname_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	imageButtonRemoveChild.click = function imageButtonRemoveChild_click (event)// @startlock
	{// @endlock
		var v;
		
		console.log('imageButtonRemoveChild.click');
		v = $comp.sources.children.getCurrentElement();
		$comp.sources.children.removeCurrentReference(
			{
				onSuccess: function (event) {
					v.remove(			
						{
							onSuccess: function (evt) {
								console.log('child removed', evt);
							},
							onError: function(error) {
								console.log(error);
							}
						}
					);
				},
				onError: function(error) {
					console.log(error);
				}
			}
		);

	};// @lock

	imageButtonNewChild.click = function imageButtonNewChild_click (event)// @startlock
	{// @endlock
		console.log('imageButtonNewChild.click');
		$comp.sources.children.save({onSuccess: function(event) {}});
		$comp.sources.children.addNewElement({ onSuccess: function(event) {} });
	};// @lock

	imageButtonNextChild.click = function imageButtonNextChild_click (event)// @startlock
	{// @endlock
		console.log('imageButtonNextChild.click');
		$comp.sources.children.save({onSuccess: function(event) {}});
		$comp.sources.children.selectNext({ onSuccess: function(event) {} });
	};// @lock

	imageButtonPrevChild.click = function imageButtonPrevChild_click (event)// @startlock
	{// @endlock
		console.log('imageButtonPrevChild.click');
		$comp.sources.children.save({onSuccess: function(event) {}});
		$comp.sources.children.selectPrevious({ onSuccess: function(event) {} });
	};// @lock
	

	textFieldStudentBirthdate.change = function textFieldStudentBirthdate_change (event)// @startlock
	{// @endlock
		setChildAge(new Date(this.getValue()));
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
		if (!$$(getHtmlId('textFieldNickname')).getValue()) {
			$$(getHtmlId('textFieldNickname')).setValue($$(getHtmlId('textFieldStudentFirstName')).getValue());
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_children", "onCurrentElementChange", childrenEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_textFieldNickname", "change", textFieldNickname.change, "WAF");
	WAF.addListener(this.id + "_imageButtonRemoveChild", "click", imageButtonRemoveChild.click, "WAF");
	WAF.addListener(this.id + "_imageButtonNewChild", "click", imageButtonNewChild.click, "WAF");
	WAF.addListener(this.id + "_imageButtonNextChild", "click", imageButtonNextChild.click, "WAF");
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
