
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

	$comp.sourcesVar.forSchoolYear = 2013;
	$comp.sources.forSchoolYear.sync();

	// eventHandlers// @lock

	dataGridChildList.onRowClick = function dataGridChildList_onRowClick (event)// @startlock
	{// @endlock
		L3.loadSchoolOptions();
	};// @lock

	buttonCreateApplications.click = function buttonCreateApplications_click (event)// @startlock
	{// @endlock
		var a = sources.schoolApplication;
		var c = $comp.sources.schoolChoice;
		var sel = $$(getHtmlId('dataGridSelectSchool')).getSelectedRows();
		sel.forEach(
			function(e) {
				c.select(e,
					{
						onSuccess: function(evt) {
							a.addNewElement();
							a.preparedOn = new Date();
							a.forSchoolYear = $comp.sourcesVar.forSchoolYear;
							a.applicant.set($comp.sources.applyingChildren);
							a.submittedTo.set(evt.dataSource);
							a.save({ onSuccess: function(e) { console.log('New application created', e) } });
						}
					}
				);
			}
		)

	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dataGridChildList", "onRowClick", dataGridChildList.onRowClick, "WAF");
	WAF.addListener(this.id + "_buttonCreateApplications", "click", buttonCreateApplications.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
