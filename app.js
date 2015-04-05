
// Main app class
enyo.kind({
	name: "KAView.App",
	kind: "FittableRows",
	published: {activity: null},
	components: [
		{name: "content", kind: "Scroller", fit: true, classes: "main-content", onresize: "resize", 
		components: [
		]},
		{name: "footer", classes: "viewer-footer toolbar", fit: false, components: [
			{name: "previousbutton", kind: "Button", classes: "toolbutton previous-button pull-left", title:"Previous", ontap: "showPrevious"},
			{name: "nextbutton", kind: "Button", classes: "toolbutton next-button pull-right", title:"Next", ontap: "showNext"}
		]}
	],
	
	// Constructor
	create: function() {
		this.inherited(arguments);
		this.computeSize();
		this.draw();		
	},
	
	computeSize: function() {
		var toolbar = document.getElementById("main-toolbar");
		var canvas = document.getElementById("body");
		var canvas_height = canvas.offsetHeight;
		this.$.content.applyStyle("height", (canvas_height-toolbar.offsetHeight)+"px");
	},
	
	resize: function() {
		this.computeSize();
		this.draw();
	},
	
	// Draw screen
	draw: function() {
	}
});
