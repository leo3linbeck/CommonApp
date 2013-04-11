
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'SchoolMap';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	if (L3.currentAddress) {
		$$(getHtmlId('googleMapsBuildSchoolList')).setCenter(L3.currentAddress.metadata.latitude + ',' + L3.currentAddress.metadata.latitude);
		$$(getHtmlId('googleMapsBuildSchoolList')).setMarker(null, L3.currentAddress.metadata.latitude + ',' + L3.currentAddress.metadata.latitude, {title: 'Your Home'});
		$$(getHtmlId('googleMapsBuildSchoolList')).setZoom(15);
	}

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
