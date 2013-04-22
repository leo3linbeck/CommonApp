
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var uri = URI(window.location.toString());
		var query = URI.parseQuery(uri.query());
		
		sources.applicant.query('ID === :1',
			{
				onSuccess: function(evnt) {
					console.log('Loading applicant', evnt);
					var next = evnt.dataSource.nextGradeLevel;
					
					if (next === -2 || next === 13 || next === 999) {
						applicantCurrentGradeLevel = '';
						applicantNextGradeLevel = '';
					}
					else {
						applicantCurrentGradeLevel = L3.gradeMap[evnt.dataSource.nextGradeLevel - 1];
						applicantNextGradeLevel = L3.gradeMap[evnt.dataSource.nextGradeLevel];
					}
					sources.applicantCurrentGradeLevel.sync();
					sources.applicantNextGradeLevel.sync();
					
					sources.family.query('children.ID === :1',
						{
							onSuccess: function(evt) {
								console.log('Loading family', evt);
								sources.parent1.query('motherFamilies.ID === :1',
									{
										onSuccess: function(e) {
											console.log('Loading parent1', e);
										},
										onError: function(r) {
											console.log('ERROR: Loading parent1', r);
										},
										params: [ evt.dataSource.ID ]
									}
								);

								sources.parent2.query('fatherFamilies.ID === :1',
									{
										onSuccess: function(e) {
											console.log('Loading parent2', e);
										},
										onError: function(r) {
											console.log('ERROR: Loading parent2', r);
										},
										params: [ evt.dataSource.ID ]
									}
								);
							},
							onError: function(err) {
								console.log('ERROR: Loading family', err);
							},
							params: [ evnt.dataSource.ID ]
						}
					);
				},
				onError: function(error) {
					console.log('ERROR: Loading student', error);
				},
				params: [ query.applicant ]
			}
		);


	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
