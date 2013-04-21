
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		sources.applicant.loadFormInfo(
			{
				studentID: L3.currentStudentID,
				role: 'applicant',
				debug: false
			},
			{
				onSuccess: function(event) {
					console.log('Loading student', event);
					applicantAge = event.result.age;
					sources.applicantAge.sync();
					applicantCurrentGradeLevel = event.result.currentGradeLevel;
					sources.applicantCurrentGradeLevel.sync();
					applicantNextGradeLevel = event.result.nextGradeLevel;
					sources.applicantNextGradeLevel.sync();
				},
				onError: function(error) {
					console.log('ERROR: Loading student', error);
				}
			}
		);

		sources.parent1.loadFormInfo(
			{
				studentID: L3.currentStudentID,
				role: 'parent1',
				debug: false
			},
			{
				onSuccess: function(event) {
					console.log('Loading student', event);
				},
				onError: function(error) {
					console.log('ERROR: Loading student', error);
				}
			}
		);

		sources.parent2.loadFormInfo(
			{
				studentID: L3.currentStudentID,
				role: 'parent2',
				debug: false
			},
			{
				onSuccess: function(event) {
					console.log('Loading student', event);
				},
				onError: function(error) {
					console.log('ERROR: Loading student', error);
				}
			}
		);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
