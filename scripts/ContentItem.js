
// ContentItemItem ---------------------------------------------

function ContentItemItem(header,onClick) {
	this.header = header;
	this.onClick = onClick;
	this.cssClass = "contentitemitem round";
}

ContentItemItem.prototype.getDomObject = function() {
	var newItem = document.createElement("div");
	$(newItem).attr({
			'class': this.cssClass
	});
	$(newItem).text(this.header);
	var that = this;
	$(newItem).click(function() {that.onClick();} );
	return newItem;
};

// ContentSection  ---------------------------------------------

function ContentSection(header,items) {
	this.header = header;
	this.items = items;
};

ContentSection.prototype.addItem = function(item) {
	this.items.push(item);
}

ContentSection.prototype.getDomObject = function() {
	var newSection = document.createElement("div");
	
	var newSectionHeader = document.createElement("div");
	$(newSectionHeader).attr({
			'class': 'contentsectionheader'
	});
	$(newSectionHeader).text(this.header);
	
	$(newSection).append(newSectionHeader);
	
	var newSectionContent = document.createElement("div");
	$(newSectionContent).attr({
			'class': 'contentsection'
	});
	for (var item in this.items) {
		$(newSectionContent).append(this.items[item].getDomObject());
	}
	$(newSection).append(newSectionContent);
	
	return newSection;
};

// ContentSideBar  ---------------------------------------------

function ContentSidebar(items) {
	this.items = items;
}

ContentSidebar.prototype.addItem = function(item) {
	this.items.push(item);
}

ContentSidebar.prototype.getDomObject = function() {
	var newSidebar = document.createElement("div");
	$(newSidebar).attr({
			'class': 'contentitemsidebar'
	});
	return newSidebar;
}

// ContentItem  ---------------------------------------------

function ContentItem(header,sections,sidebar) {
	this.header = header;
	this.sections = sections;
	this.sidebar = sidebar;
}

ContentSidebar.prototype.addSection = function(section) {
	this.items.push(section);
}

ContentItem.prototype.getDomObject = function() {
	var newContentItem = document.createElement("div");
	$(newContentItem).attr({
			'class': 'contentitem round'
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

// Test  ---------------------------------------------

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
}