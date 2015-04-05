define(function (require) {
    var activity = require("sugar-web/activity/activity");

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {
        // Initialize the activity.
        activity.setup();
		
		// Launch main screen
		app = new KAView.App({activity: activity});
        app.renderInto(document.getElementById("viewer"));
    });

});
