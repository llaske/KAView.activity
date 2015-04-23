// Video dialog
enyo.kind({
	name: "KAView.VideoDialog",
	kind: enyo.Popup,
	classes: "video-dialog",
	centered: false,
	modal: true,
	floating: true,
	published: {
		item: null
	},
	components: [
		{name: "header", classes: "video-header toolbar", components: [
			{name: "favoritebutton", kind: "Button", classes: "toolbutton video-favorite-button pull-left", title: "Favorite", ontap: "setFavorite"},
			{name: "title", classes: "video-title", content: ""},
			{name: "closebutton", kind: "Button", classes: "toolbutton video-close-button pull-right", title: "Close", ontap: "closeDialog"}
		]},
		{name: "video", classes: "video-item", kind: "enyo.Video", fitToWindow: false, autoplay: true, showControls: true},
	],

	// Constructor
	create: function() {
		this.inherited(arguments);
		this.$.title.setContent(this.item.title);
		this.$.video.setSrc(this.item.videoURL());
	},
	
	rendered: function() {
		this.$.favoritebutton.applyStyle("background-image", "url(images/"+(!this.item.isFavorite?"not":"")+"favorite.svg)");	
		// TODO: Use this.$.video.setCurrentTime(xx) to restart video at start view point
	},
	
	// Process events
	closeDialog: function() {
		this.$.video.pause();
		// TODO: Use this.$.video.getCurrentTime() to get current view point
		this.hide();
	},
	
	setFavorite: function() {
		this.item.isFavorite = !this.item.isFavorite;
		this.rendered();
	}
});	