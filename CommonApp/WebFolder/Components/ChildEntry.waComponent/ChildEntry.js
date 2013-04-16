
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'StudentEntry';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var imageButtonPrevChild = {};	// @buttonImage
	var imageButtonNextChild = {};	// @buttonImage
	var textFieldStudentBirthdate = {};	// @textField
	var textFieldStudentLastName = {};	// @textField
	var textFieldStudentMiddleName = {};	// @textField
	var textFieldStudentFirstName = {};	// @textField
	// @endregion// @endlock

	function isSecondChild() {
		var c = getChildrenCount();
		return (c.pos === '1');
	}
	
	function isLastChild() {
		var c = getChildrenCount();
		return (c.pos === c.max);
	}
	
	function getChildrenCount() {
		var a = $$(getHtmlId('richTextChildrenCount')).getValue().split(' ');
		return ( { pos: a[0] - 1, max: a[2] } );
	}

	function setChildrenCount() {
		var p = sources.children.getPosition() + 1;
		var m = sources.children.length;
		$$(getHtmlId('richTextChildrenCount')).setValue(p + ' of ' + m);
	}

	// eventHandlers// @lock

	imageButtonPrevChild.click = function imageButtonPrevChild_click (event)// @startlock
	{// @endlock
		sources.children.save();
		sources.children.selectPrevious(
			{
				onSuccess: function(event) {
					if (isSecondChild()) {
						$$(getHtmlId('imageButtonPrevChild')).hide();
						setChildrenCount();
					}
				}
			}
		);
	};// @lock
	

	imageButtonNextChild.click = function imageButtonNextChild_click (event)// @startlock
	{// @endlock
		var v;
		sources.children.getCurrentElement().save(
			{
				onSuccess: function(aaa) {
					sources.children.serverRefresh(
						{
							onSuccess: function (bbb) {
								if (isLastChild()) {
									sources.children.addNewElement(
										{
											onSuccess: function(ccc) {
												v = sources.children.getCurrentElement();
												v.lastName = sources.family.name;
												v.belongsTo.set(sources.family);
												setChildrenCount();
											},
											onError: function(error) {
												alert(JSON.stringify(error));
											}
										}
									);
								}
								else {
									sources.children.selectNext();
								}
							},
							onError: function(error) {
								alert(JSON.stringify(error));
							}
						}
					);
					$$(getHtmlId('imageButtonPrevChild')).show();
				},
				onError: function(error) {
					alert(JSON.stringify(error));
				}
			}
		);

	};// @lock

	textFieldStudentBirthdate.change = function textFieldStudentBirthdate_change (event)// @startlock
	{// @endlock
		$$(getHtmlId('textFieldStudentAge')).setValue(L3.calcAgeOnSept1(this.getValue()));
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
