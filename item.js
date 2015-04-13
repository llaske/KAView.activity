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
	classes: "item",
	components: [
		{ name: "itemImage", classes: "itemImage", kind: "Image", src: "images/notloaded.png", onerror: "defaultImage" },
		{ name: "itemPlay", classes: "itemPlay", kind: "Image", src: "images/play.svg" },
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
			this.$.itemImage.setAttribute("src", "images/database/fr/"+this.code+".png");
		else
			this.$.itemImage.setAttribute("src", "http://s3.amazonaws.com/KA-youtube-converted/"+this.code+".mp4/"+this.code+".png");
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
	
	defaultImage: function() {
		this.$.itemImage.setAttribute("src", "images/notloaded.png");	
	}
});