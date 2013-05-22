
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'ChildEntry';
	// @endregion// @endlock

	this.setChildrenCount = function setChildrenCount(ds) {
		console.log('setChildrenCount', ds);
		var p = ds.getPosition() + 1;
		if (p > 0) {
			var m = ds.length;
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
		$$(getHtmlId('textFieldAge')).setValue(L3.calcAgeOnSept1(v));
	}
	
	this.addNewChild = function addNewChild(current, next) {
		console.log('Enter addNewChild', current, next);
		sources.children.addNewElement();
		sources.children.serverRefresh(
			{
				onSuccess: function(event) {
					console.log('children.serverRefresh', event);
					event.dataSource.getAttribute('lastName').setValue(sources.family.name);
					sources.family.save({ onSuccess: function(event) {console.log('Save children',event);} });
					$$(next).setChildrenCount(event.dataSource);
					$$(next).setChildAge(event.dataSource.birthdate);
					L3.transitionPages(current, next);
					contactListID = null;
				},
				onError: function(error) {
					console.log('ERROR: children.serverRefresh', error);
				}
			}
		);
	}

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var textFieldNickname = {};	// @textField
	var imageButtonRemoveChild = {};	// @buttonImage
	var imageButtonNewChild = {};	// @buttonImage
	var imageButtonNextChild = {};	// @buttonImage
	var imageButtonPrevChild = {};	// @buttonImage
	var textFieldBirthdate = {};	// @textField
	var textFieldLastName = {};	// @textField
	var textFieldMiddleName = {};	// @textField
	var textFieldFirstName = {};	// @textField
	// @endregion// @endlock

	sources.school.all(
		{
			onSuccess: function(event) {
				console.log('Loading all schools', event);
			},
			onError: function(error) {
				console.log('ERROR: Loading all schools', error);
			}
		}
	);

	// eventHandlers// @lock

	textFieldNickname.change = function textFieldNickname_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	imageButtonRemoveChild.click = function imageButtonRemoveChild_click (event)// @startlock
	{// @endlock
		var v;
		
		console.log('imageButtonRemoveChild.click');
		v = sources.children.getCurrentElement();
		sources.children.removeCurrentReference(
			{
				onSuccess: function (event) {
					console.log('children.removeCurrentReference', event);
					v.remove(			
						{
							onSuccess: function (evt) {
								console.log('Child removed', evt);
							},
							onError: function(err) {
								console.log('ERROR: Child removed', err);
							}
						}
					);
					$comp.setChildrenCount(event.dataSource);
					$comp.setChildAge(event.dataSource.birthdate);
					getHtmlObj('textFieldFirstName').select();
				},
				onError: function(error) {
					console.log('ERROR: children.removeCurrentReference', error);
				}
			}
		);
	};// @lock

	imageButtonNewChild.click = function imageButtonNewChild_click (event)// @startlock
	{// @endlock
		console.log('imageButtonNewChild.click');
		sources.children.save({ onSuccess: function(event) {} });
		sources.children.addNewElement();
		sources.children.getAttribute('lastName').setValue(sources.family.name);
		sources.children.save(
			{
				onSuccess: function(event) {
					$comp.setChildrenCount(event.dataSource);
					$comp.setChildAge(event.dataSource.birthdate);
					getHtmlObj('textFieldFirstName').select();
				} 
			}
		);
		contactListID = null;
	};// @lock

	imageButtonNextChild.click = function imageButtonNextChild_click (event)// @startlock
	{// @endlock
		console.log('imageButtonNextChild.click');
		sources.children.save({ onSuccess: function(event) {} });
		sources.children.selectNext(
			{
				onSuccess: function(event) {
					$comp.setChildrenCount(event.dataSource);
					$comp.setChildAge(event.dataSource.birthdate);
					getHtmlObj('textFieldFirstName').select();
				} 
			}
		);
	};// @lock

	imageButtonPrevChild.click = function imageButtonPrevChild_click (event)// @startlock
	{// @endlock
		console.log('imageButtonPrevChild.click');
		sources.children.save({ onSuccess: function(event) {} });
		sources.children.selectPrevious(
			{
				onSuccess: function(event) {
					$comp.setChildrenCount(event.dataSource);
					$comp.setChildAge(event.dataSource.birthdate);
					getHtmlObj('textFieldFirstName').select();
				} 
			}
		);

	};// @lock

	textFieldBirthdate.change = function textFieldBirthdate_change (event)// @startlock
	{// @endlock
		$comp.setChildAge(new Date(this.getValue()));
	};// @lock

	textFieldLastName.change = function textFieldLastName_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldMiddleName.change = function textFieldMiddleName_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
	};// @lock

	textFieldFirstName.change = function textFieldFirstName_change (event)// @startlock
	{// @endlock
		L3.convertAttributeToTitleCase(this);
		if (!$$(getHtmlId('textFieldNickname')).getValue()) {
			$$(getHtmlId('textFieldNickname')).setValue($$(getHtmlId('textFieldFirstName')).getValue());
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_textFieldNickname", "change", textFieldNickname.change, "WAF");
	WAF.addListener(this.id + "_imageButtonRemoveChild", "click", imageButtonRemoveChild.click, "WAF");
	WAF.addListener(this.id + "_imageButtonNewChild", "click", imageButtonNewChild.click, "WAF");
	WAF.addListener(this.id + "_imageButtonNextChild", "click", imageButtonNextChild.click, "WAF");
	WAF.addListener(this.id + "_imageButtonPrevChild", "click", imageButtonPrevChild.click, "WAF");
	WAF.addListener(this.id + "_textFieldBirthdate", "change", textFieldBirthdate.change, "WAF");
	WAF.addListener(this.id + "_textFieldLastName", "change", textFieldLastName.change, "WAF");
	WAF.addListener(this.id + "_textFieldMiddleName", "change", textFieldMiddleName.change, "WAF");
	WAF.addListener(this.id + "_textFieldFirstName", "change", textFieldFirstName.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
