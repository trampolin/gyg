// ContentItemItem ---------------------------------------------

function ContentItemItem(header,onClick,cssId) {
	this.header = header;
	this.onClick = onClick;
	this.cssClass = "contentitemitem";
	this.round = true;
	if (this.round) { this.cssClass+=" round"; };
	this.cssId = "";
	if (cssId != undefined && cssId != null)
	{
		this.cssId = cssId;
	}
}

ContentItemItem.prototype.getDomObject = function() {
	var newItem = document.createElement("div");
	$(newItem).attr({
			'class': this.cssClass,
			'id': this.cssId
	});
	$(newItem).text(this.header);
	var that = this;
	$(newItem).click(function() {that.onClick();} );
	return newItem;
};

// ContentSection  ---------------------------------------------

function ContentSection(header,items) {
	this.header = header;
	this.cssHeaderClass = "contentsectionheader";
	this.cssContentClass = "contentsection";
	
	this.items = [];
	if (items != undefined && items != null)
	{
		this.items = items;
	}
};

ContentSection.prototype.addItem = function(item) {
	this.items.push(item);
}

ContentSection.prototype.getDomObject = function() {
	var newSection = document.createElement("div");
	$(newSection).attr({
			'class': 'contentsectioncontainer'
	});
	var newSectionHeader = document.createElement("div");
	$(newSectionHeader).attr({
			'class': this.cssHeaderClass
	});
	$(newSectionHeader).text(this.header);
	
	$(newSection).append(newSectionHeader);
	
	var newSectionContent = document.createElement("div");
	$(newSectionContent).attr({
			'class': this.cssContentClass
	});
	for (var item in this.items) {
		$(newSectionContent).append(this.items[item].getDomObject());
	}
	$(newSection).append(newSectionContent);
	
	return newSection;
};

// ContentSidebar  ---------------------------------------------

function ContentSidebar(items,cssId) {
	this.items = [];
	this.cssClass = 'contentitemsidebar';
	if (items != undefined && items != null)
	{
		this.items = items;
	}
	this.cssId = "";
	if (cssId != undefined && cssId != null)
	{
		this.cssId = cssId;
	}
}

ContentSidebar.prototype.addItem = function(item) {
	this.items.push(item);
}

ContentSidebar.prototype.getDomObject = function() {
	var newSidebar = document.createElement("div");
	$(newSidebar).attr({
			'class': this.cssClass,
			'id': this.cssId
	});
	
	for (var item in this.items) {
		$(newSidebar).append(this.items[item].getDomObject());
	}
	
	return newSidebar;
}

ContentSidebar.prototype.afterAppend = function() {
	for (var item in this.items) {
		if (this.items[item].afterAppend != undefined)
		{
			this.items[item].afterAppend();
		}
	}
}

// ContentSidebarItem  ------------------------------------------
function ContentSidebarItem(data,cssClass,cssId) {
	this.data = data;
	this.cssClass = 'contentitemsidebaritem ';
	if (cssClass != undefined && cssClass != null)
	{
		this.cssClass += cssClass;
	}
	this.round = true;
	if (this.round) { this.cssClass+=" round"; };
	this.cssId = "";
	if (cssId != undefined && cssId != null)
	{
		this.cssId = cssId;
	}
}

ContentSidebarItem.prototype.getDomObject = function() {
	var newSidebarItem = document.createElement("div");
	$(newSidebarItem).attr({
			'class': this.cssClass,
			'id': this.cssId
	});
	return newSidebarItem;
}

// ContentSidebarMap
function ContentSidebarMap(lat,lng,name,cssId) {
	this.lat = lat;
	this.lng = lng;
	this.name = name;
	this.cssClass = 'contentitemsidebaritem venuemap';
	this.round = true;
	if (this.round) { this.cssClass+=" round"; };
	this.cssId = "";
	if (cssId != undefined && cssId != null)
	{
		this.cssId = cssId;
	}
}

ContentSidebarMap.prototype.getDomObject = function() {
	var newSidebarItem = document.createElement("div");
	$(newSidebarItem).attr({
			'class': this.cssClass,
			'id': this.cssId
	});
	return newSidebarItem;
}

ContentSidebarMap.prototype.afterAppend = function() {
	that = this;
	$('#'+that.cssId).gmap({'center': that.lat+','+that.lng, 'zoom': 10, 'disableDefaultUI':true, 'callback': function() {
		var self = this;
		self.addMarker({'position': this.get('map').getCenter() }).click(function() {
			self.openInfoWindow({ 'content': that.name }, this);
		});
	}});
}

// ContentItem  ---------------------------------------------

function ContentItem(header,sections,sidebar,cssId) {
	this.header = header;
	this.sections = [];
	if (sections != undefined && sections != null)
	{
		this.sections = sections;
	}
	this.sidebar = sidebar;
	this.cssClass = 'contentitem';
	this.round = true;
	if (this.round) { this.cssClass+=" round"; };
	this.cssId = "";
	if (cssId != undefined && cssId != null)
	{
		this.cssId = cssId;
	}
}

ContentItem.prototype.addSection = function(section) {
	this.sections.push(section);
}

ContentItem.prototype.getDomObject = function() {
	var newContentItem = document.createElement("div");
	$(newContentItem).attr({
			'class': this.cssClass,
			'id': this.cssId
	});
	var toAdd = newContentItem;
	
	if (this.sidebar != undefined && this.sidebar != null)
	{
		toAdd = document.createElement("div");
		$(toAdd).attr({
				'class': 'contentitemcontent'
		});
		$(newContentItem).append(toAdd);
		$(newContentItem).append(this.sidebar.getDomObject());
	}
	
	var newSectionHeader = document.createElement("div");
	$(newSectionHeader).attr({
			'class': 'contentitemheader bigfont round'
	});
	$(newSectionHeader).text(this.header);
	
	$(toAdd).append(newSectionHeader);
	
	for (var section in this.sections) {
		$(toAdd).append(this.sections[section].getDomObject());
	}
	return newContentItem;
}

ContentItem.prototype.afterAppend = function() {
	if (this.sidebar != undefined && this.sidebar != null)
	{
		if (this.sidebar.afterAppend != undefined)
		{
			this.sidebar.afterAppend();
		}
	}
}

// Test  ---------------------------------------------
/*
function CreateTestContent() {
	var c = new ContentItem("test",
		[
			new ContentSection
				("test section",
					[
						new ContentItemItem("Wabababa",null),
						new ContentItemItem("test2",null),
						new ContentItemItem("test3",null),
					]
				)
		],
		new ContentSidebar([]));
	$('#content').append(c.getDomObject());
	var c = new ContentItem("tes2t2");
	var cs = new ContentSection("testesc");
	cs.addItem(new ContentItemItem("bla",null));
	c.addSection(cs);
	$('#content').append(c.getDomObject());
}
*/