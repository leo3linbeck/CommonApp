
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'ReviewAndPrintForms';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var buttonPrintForms = {};	// @button
	var buttonSaveForms = {};	// @button
	var buttonReviewForm = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	buttonPrintForms.click = function buttonPrintForms_click (event)// @startlock
	{// @endlock
		alert('Not yet implemented. Coming soon!');
	};// @lock

	buttonSaveForms.click = function buttonSaveForms_click (event)// @startlock
	{// @endlock
		alert('Not yet implemented. Coming soon!');
	};// @lock

	buttonReviewForm.click = function buttonReviewForm_click (event)// @startlock
	{// @endlock
		sources.applicant.query('submittedApplications.ID === :1',
			{
				onSuccess: function(event) {
					var w = window.open('http://127.0.0.1:8081/forms.waPage/index.html?applicant=' + encodeURIComponent(event.dataSource.ID), 'appFormWindow')
					console.log('Loading student', event, w);
				},
				onError: function(error) {
					console.log('ERROR: Loading student', error);
				},
				params: [sources.schoolApplication.ID]
			}
		);

//		if (sources.schoolApplication.url) {
//			window.open('/forms.waPage/index.html')
//		}
//		else {
//			sources.schoolApplication.generateApplication(
//				{
//					onSuccess: function(event) {
//						console.log('reviewApplicationForm', event);
//							if (event.success) {
//								window.open('schoolApplications/' + event.result.url)
//							}
//					},
//					onError: function(error) {
//						console.log('ERROR: reviewApplicationForm', error);
//					}
//				}
//			);
//		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_buttonPrintForms", "click", buttonPrintForms.click, "WAF");
	WAF.addListener(this.id + "_buttonSaveForms", "click", buttonSaveForms.click, "WAF");
	WAF.addListener(this.id + "_buttonReviewForm", "click", buttonReviewForm.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
