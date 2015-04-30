define(function (require) {
    var activity = require("sugar-web/activity/activity");
	var settingspalette = require("settingspalette");

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {
        // Initialize the activity.
        activity.setup();

		// Create settings palette
        var settingsButton = document.getElementById("settings-button");
		settingspalette = new settingspalette.SettingsPalette(settingsButton, undefined);
		settingspalette.addEventListener('language', function() {
			Util.setLanguage(settingspalette.getLanguage());
			Util.saveContext();
			settingspalette.popDown();
		});
		
		// Launch main screen
		app = new KAView.App({activity: activity});
		app.renderInto(document.getElementById("viewer"));
		
		// Load context
		Util.loadContext(function() {
			settingspalette.setLanguage(Util.getLanguage());
			app.draw();
		});
    });

});
