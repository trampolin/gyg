function Venue(venue) {
	this.venue = venue;
	this.header = venue.name;
	this.sections = [];
	//this.sidebar = null;
	this.cssId = "venue-"+venue.id;
	this.sidebar = new ContentSidebar();

	this.sidebar.addItem(new ContentSidebarButton(this.cssId+'-button-details',null,"Details"));
	this.sidebar.addItem(new ContentSidebarButton(this.cssId+'-button-delete',null,"Delete"));
	
	if (venue.latitude != "" && venue.longitude != "" && venue.latitude != null && venue.longitude != null)
	{
		this.sidebar.addItem(new ContentSidebarMap(venue.latitude,venue.longitude,venue.name,"venue-"+venue.id+"-map"));
	}
	
	var infoSection = new ContentSection("Adresse");
	
	infoSection.addItem(new ContentItemLine(venue.street+' '+venue.number));
	infoSection.addItem(new ContentItemLine(venue.zip+' '+venue.city));
	
	this.sections.push(infoSection);
}
Venue.inheritsFrom(ContentItem);