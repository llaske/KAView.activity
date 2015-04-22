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
			{name: "title", classes: "video-title pull-left", content: ""},
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
	},
	
	// Process events
	closeDialog: function() {
		this.$.video.pause();
		this.hide();
	}
});	