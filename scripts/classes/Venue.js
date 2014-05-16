function Venue(venue) {
	this.venue = venue;
	this.header = venue.name;
	this.sections = [];
	this.sidebar = null;
	this.cssId = "venue-"+venue.id;
	
	if (venue.latitude != "" && venue.longitude != "" && venue.latitude != null && venue.longitude != null)
	{
		this.sidebar = new ContentSidebar();
		this.sidebar.addItem(new ContentSidebarMap(venue.latitude,venue.longitude,venue.name,"venue-"+venue.id+"-map"));
	}
}
Venue.inheritsFrom(ContentItem);