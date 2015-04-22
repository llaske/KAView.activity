
// Main app class
enyo.kind({
	name: "KAView.App",
	kind: "FittableRows",
	published: {activity: null},
	components: [
		{name: "content", kind: "Scroller", fit: true, classes: "main-content", onresize: "resize", 
		components: [
			{name: "items", classes: "items", components: [
			]}
		]},
		{name: "footer", classes: "viewer-footer toolbar", fit: false, components: [
			{name: "previousbutton", kind: "Button", classes: "toolbutton previous-button pull-left", title:"Previous", ontap: "showPrevious", showing: false},
			{name: "pagecount", content: "99/99", classes: "page-count"},
			{name: "nextbutton", kind: "Button", classes: "toolbutton next-button pull-right", title:"Next", ontap: "showNext", showing: false}
		]}
	],
	
	// Constructor
	create: function() {
		this.inherited(arguments);
		this.collection = database_es;
		this.index = 0;
		this.computeSize();
		this.draw();
	},
	
	computeSize: function() {
		var toolbar = document.getElementById("main-toolbar");
		var canvas = document.getElementById("body");
		var canvas_height = canvas.offsetHeight;
		this.$.content.applyStyle("height", (canvas_height-(toolbar.offsetHeight*2))+"px");
	},
	
	resize: function() {
		this.computeSize();
		this.draw();
	},
	
	// Draw screen
	draw: function() {
		// Remove items
		var items = [];
		enyo.forEach(this.$.items.getControls(), function(item) { items.push(item); });
		for (var i = 0 ; i < items.length ; i++) { items[i].destroy();	}
		
		// Display items
		var collection = this.collection;
		var len = collection.length;
		for(var i = 0 ; i < constant.pageCount && this.index+i < len ; i++ ) {
			this.$.items.createComponent(
				{
					kind: "KAView.Item",
					code: collection[this.index+i].id,
					title: collection[this.index+i].title,
					isLocal: collection[this.index+i].local,
					isFavorite: false,
					onVideoPlayed: "showVideo"
				},
				{ owner: this }
			).render();
		}
		
		// Display button
		this.$.previousbutton.setShowing(this.index-constant.pageCount >= 0);
		this.$.pagecount.setContent(1+Math.ceil(this.index/constant.pageCount)+"/"+Math.ceil(len/constant.pageCount));
		this.$.nextbutton.setShowing(this.index+constant.pageCount <= len);
	},
	
	// Page event
	showPrevious: function() {
		this.index -= constant.pageCount;
		this.draw();
	},
	
	showNext: function() {
		this.index += constant.pageCount;
		this.draw();	
	},
	
	showVideo: function(item) {
		this.videoDialog = this.createComponent({kind: "KAView.VideoDialog", item: item}, {owner:this});
		this.videoDialog.show();		
	}
});
