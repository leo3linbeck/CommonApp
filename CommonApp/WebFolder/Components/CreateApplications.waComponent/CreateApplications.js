
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'CreateApplications';
	// @endregion// @endlock

	this.selectApplyingChildren = function selectApplyingChildren(current, next) {
		console.log('Enter selectApplyingChildren', current, next);
		$comp.sources.applyingChildren.query('childOf.ID === :1 AND isApplying === true',
			{
				onSuccess: function(event) {
					console.log('load applyingChildren', event);
					L3.loadSchoolOptions();
					sources.schoolApplication.query('applicant.childOf.ID === :1',
						{
							onSuccess: function(evt) {
								console.log('load schoolApplication', evt);
								L3.transitionPages(current, next);
							},
							onError: function(err) {
								console.log('ERROR: load applyingChildren', err);
							},
							params: [sources.family.ID]
						}
					);
				},
				onError: function(error) {
					console.log('ERROR: load applyingChildren', error);
				},
				orderBy: 'birthdate',
				params: [sources.family.ID]
			}
		);
	}
	
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

		$$(getHtmlId('dataGridSelectSchool')).getSelectedRows().forEach(
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
