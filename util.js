// Utility functions


// Namespace
Util = {};


// Activity context handling
var app;
Util.context = {
	language: "en",
	server: constant.khanServer,
	favorites: {},
	readtimes: {}
};
Util.saveContext = function() {
	var datastoreObject = app.activity.getDatastoreObject();	
	var jsonData = JSON.stringify(Util.context);
	datastoreObject.setDataAsText(jsonData);
console.log("SAVE CONTEXT <"+jsonData+">");
	datastoreObject.save(function() {});	
};
Util.loadContext = function(callback) {
	var datastoreObject = app.activity.getDatastoreObject();
	datastoreObject.loadAsText(function (error, metadata, data) {
console.log("LOAD CONTEXT <"+data+">");	
		var context = JSON.parse(data);
		if (context) {
			Util.context = context;
		}
		callback();
	});
};

// Context update
Util.setLanguage = function(lang) {
	Util.context.language = lang;
	app.localeChanged();
}
Util.getLanguage = function() {
	return Util.context.language;
}

Util.getCollection = function() {
	if (Util.context.language == "en")
		return database_en;
	else if (Util.context.language == "es")
		return database_es;
	else
		return database_fr;
}

Util.setFavorite = function(id, value) {
	if (value)
		Util.context.favorites[id] = value;
	else
		Util.context.favorites[id] = undefined;
}
Util.getFavorite = function(id) {
	return Util.context.favorites[id];
}

Util.setReadTime = function(id, time) {
	if (time)
		Util.context.readtimes[id] = time;
	else
		Util.context.readtimes[id] = undefined;
}
Util.getReadTime = function(id) {
	return Util.context.readtimes[id];
}

Util.setServer = function(server) {
	Util.context.server = server;
}
Util.getServer = function() {
	return Util.context.server;
}
Util.isKhanServer = function() {
	return Util.context.server == constant.khanServer;
}