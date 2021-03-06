﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'SelectFamily';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonPullDataFromSalesforce = {};	// @button
	var buttonPushDataToSalesforce = {};	// @button
	var buttonDialogClose = {};	// @button
	var iconCloud = {};	// @icon
	var iconTrashCan = {};	// @icon
	var iconClearLine = {};	// @icon
	var buttonCreateFamily = {};	// @button
	var textFieldFamilyName = {};	// @textField
	// @endregion// @endlock
	
	function searchFamilyName() {
		var name = $$(getHtmlId('textFieldFamilyName')).getValue();
		if (name) {
			sources.family.query('name == :1',
				{
					onSuccess: function(event) {
						console.log('searchFamilyName query', event);
					},
					onError: function(error) {
						console.log('ERROR: searchFamilyName query', error);
					},
					orderBy: 'name',
					params: [ name + WAF.wildchar ]
				}
			);
		}
		else {
			sources.family.all(
				{
					onSuccess: function(event) {
						console.log('searchFamilyName all', event);
					},
					onError: function(error) {
						console.log('ERROR: searchFamilyName all', error);
					},
					orderBy: 'name'
				}
			);
		}
	}
	
	// eventHandlers// @lock

	buttonPullDataFromSalesforce.click = function buttonPullDataFromSalesforce_click (event)// @startlock
	{// @endlock
		Salesforce.pullDataAsync(
			{
				onSuccess: function(event) {
					console.log('Salesforce.pullDataAsync', event);
					$$(getHtmlId('dialogSalesforce')).closeDialog();
				},
				onError: function(error) {
					console.log('ERROR: Salesforce.pullDataAsync', error);					
					$$(getHtmlId('dialogSalesforce')).closeDialog();
				}
			}
		);
	};// @lock

	buttonPushDataToSalesforce.click = function buttonPushDataToSalesforce_click (event)// @startlock
	{// @endlock
		alert('Not yet implemented.');
//		Salesforce.pushDataAsync(
//			{
//				onSuccess: function(event) {
//					console.log('Salesforce.pushDataAsync', event);
//					$$(getHtmlId('dialogSalesforce')).closeDialog();
//				},
//				onError: function(error) {
//					console.log('ERROR: Salesforce.pushDataAsync', error);					
//					$$(getHtmlId('dialogSalesforce')).closeDialog();
//				}
//			}
//		);
	};// @lock

	buttonDialogClose.click = function buttonDialogClose_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('dialogSalesforce')).closeDialog();
	};// @lock

	iconCloud.click = function iconCloud_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('dialogSalesforce')).displayDialog();
	};// @lock

	iconTrashCan.click = function iconTrashCan_click (event)// @startlock
	{// @endlock
		if (confirm('Are you sure you want to delete the ' + sources.family.name + ' family? This operation cannot be undone.')) {
			sources.family.removeCurrent();
			sources.family.all();
			$$(getHtmlId('textFieldFamilyName')).setValue('');
		}
	};// @lock

	iconClearLine.click = function iconClearLine_click (event)// @startlock
	{// @endlock
		$$(getHtmlId('textFieldFamilyName')).setValue('');
		searchFamilyName();
		$$(getHtmlId('textFieldFamilyName')).focus();
	};// @lock

	buttonCreateFamily.click = function buttonCreateFamily_click (event)// @startlock
	{// @endlock
		sources.family.addNewElement();
		sources.family.getAttribute('name').setValue( L3.toTitleCase( $$(getHtmlId('textFieldFamilyName')).getValue() ) );
		sources.family.save(
			{ 
				onSuccess: function(event) {
					console.log('family.save', event);
				},
				onError: function(error) {
					console.log('ERROR: family.save', error);
				}
			}
		);
	};// @lock

	textFieldFamilyName.keyup = function textFieldFamilyName_keyup (event)// @startlock
	{// @endlock
		searchFamilyName();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonPullDataFromSalesforce", "click", buttonPullDataFromSalesforce.click, "WAF");
	WAF.addListener(this.id + "_buttonPushDataToSalesforce", "click", buttonPushDataToSalesforce.click, "WAF");
	WAF.addListener(this.id + "_buttonDialogClose", "click", buttonDialogClose.click, "WAF");
	WAF.addListener(this.id + "_iconCloud", "click", iconCloud.click, "WAF");
	WAF.addListener(this.id + "_iconTrashCan", "click", iconTrashCan.click, "WAF");
	WAF.addListener(this.id + "_iconClearLine", "click", iconClearLine.click, "WAF");
	WAF.addListener(this.id + "_buttonCreateFamily", "click", buttonCreateFamily.click, "WAF");
	WAF.addListener(this.id + "_textFieldFamilyName", "keyup", textFieldFamilyName.keyup, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
