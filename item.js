// Entry component with image and sound
enyo.kind({
	name: "KAView.Item",
	kind: enyo.Control,
	published: {
		code: "",
		title: "",
		isLocal: false,
		isFavorite: false
	},
	events: {
		onVideoPlayed: ""
	},
	classes: "item",
	components: [
		{ name: "spinner", kind: "Image", src: "images/spinner-dark.gif", classes: "spinner" },
		{ name: "background", classes: "itemImage", kind: "Image", src: "images/notloaded.png" },
		{ name: "itemImage", classes: "itemImage", kind: "Image", showing: false, onload: "imageLoaded", onerror: "defaultImage" },
		{ name: "itemPlay", classes: "itemPlay", kind: "Image", showing: false, src: "images/play.svg", ontap: "showVideo" },
		{ name: "itemFavorite", classes: "itemFavorite", kind: "Image", src: "images/favorite.svg", showing: false },
		{ name: "itemRemote", classes: "itemRemote", kind: "Image", src: "images/remote.svg", showing: false },
		{ name: "itemOverlay", classes: "itemOverlay" },
		{ name: "itemTitle", classes: "itemTitle", content: "" }
	],
	
	// Constructor
	create: function() {
		this.inherited(arguments);
		this.nameChanged();
		this.titleChanged();
		this.isLocalChanged();
		this.isFavoriteChanged();
	},
	
	// Item setup
	nameChanged: function() {
		if (this.isLocal)
			this.$.itemImage.setAttribute("src", "images/database/"+this.code+".png");
		else
			this.$.itemImage.setAttribute("src", constant.khanServer+this.code+".mp4/"+this.code+".png");
	},
	
	titleChanged: function() {
		this.$.itemTitle.setContent(this.title);
	},
	
	isLocalChanged: function() {
		this.$.itemRemote.setShowing(!this.isLocal);	
	},
	
	isFavoriteChanged: function() {
		this.$.itemFavorite.setShowing(this.isFavorite);
	},
	
	imageLoaded: function() {
		this.$.itemImage.setShowing(true);
		this.$.itemPlay.setShowing(true);
		this.$.spinner.setShowing(false);
		this.$.background.setShowing(false);
	},
	
	defaultImage: function() {
		this.$.itemImage.setAttribute("src", "images/notloaded.png");
		this.$.itemImage.setShowing(true);
		this.$.itemPlay.setShowing(true);
		this.$.spinner.setShowing(false);
		this.$.background.setShowing(false);
	},
	
	videoURL: function() {
		if (this.isLocal)
			return "videos/database/"+this.code+".mp4";
		else
			return constant.khanServer+this.code+".mp4/"+this.code+".mp4";
	
	},
	
	// Handle event
	showVideo: function() {
		this.doVideoPlayed();
	}
});