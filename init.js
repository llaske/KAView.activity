// On Sugar, don't need a toolbar, will be handle by Python side
if (Util.onSugar()) {
	// Remove toolbar
	var toolbar = document.getElementById("main-toolbar");
	document.getElementById("body").removeChild(toolbar);
	
	// Handle palette event from Python
	var sugar = new Sugar();
	sugar.connect('language_clicked', function(language) {
		Util.setLanguage(language);
		Util.saveContext();
	});
	sugar.connect('settings_clicked', function(isFavorite) {
		app.remotePopUp();
	});
	sugar.connect('favorite_clicked', function(isFavorite) {
		app.favoriteChanged(isFavorite);
	});
	
	// Handle context event from Python
	sugar.connect('load-context', function(context) {
console.log("#JS LOAD CONTEXT "+JSON.stringify(context));
		Util.loadContext(null, context);
		app.localeChanged();
	});
	sugar.connect('save-context', function() {
console.log("#JS SAVE CONTEXT "+JSON.stringify(Util.context));
		sugar.sendMessage("save-context", Util.context);
	});
	
	// Launch main screen
	app = new KAView.App({activity: null});
	constant.videoType = "ogv";
	app.renderInto(document.getElementById("viewer"));
	sugar.sendMessage("ready");
} else {
	// Show toolbar
	document.getElementById("main-toolbar").style.visibility = "visible";
}