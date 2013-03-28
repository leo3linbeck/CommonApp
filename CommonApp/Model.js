model = {};

model.Child = {};
model.Child.age = (function() {
	"use strict"; // for jsLint
	//	private static variables declared here
	var that = this;

	return {
		onGet: function() {
			var n = new Date();
			var b = this.dateOfBirth;
			var a = 0;
			
			if (n.month < b.month || (n.month === b.month && n.day <= b.day) ) {
				a = 1;
			}

			return (n.year - b.year - a);
		}
	};
}());
