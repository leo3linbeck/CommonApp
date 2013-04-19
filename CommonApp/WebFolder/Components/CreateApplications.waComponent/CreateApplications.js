
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'CreateApplications';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var dataGridChildList = {};	// @dataGrid
	var buttonCreateApplications = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	dataGridChildList.onRowClick = function dataGridChildList_onRowClick (event)// @startlock
	{// @endlock
		L3.loadSchoolOptions();
	};// @lock

	buttonCreateApplications.click = function buttonCreateApplications_click (event)// @startlock
	{// @endlock

	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dataGridChildList", "onRowClick", dataGridChildList.onRowClick, "WAF");
	WAF.addListener(this.id + "_buttonCreateApplications", "click", buttonCreateApplications.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
