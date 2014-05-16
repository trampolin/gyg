function Gig(gig) {
	this.gig = gig;
	this.header = gig.gigdate;
	this.sidebar = null;
	this.cssId = "gig-"+gig.id;
	this.sections = [];
	if (gig.venue != null)
	{
		this.header +=" "+gig.venue.name;
		
		if (gig.venue.latitude != "" && gig.venue.longitude != "" && gig.venue.latitude != null && gig.venue.longitude != null)
		{
			this.sidebar = new ContentSidebar();
			this.sidebar.addItem(new ContentSidebarMap(gig.venue.latitude,gig.venue.longitude,gig.venue.name,"gig-"+gig.id+"-map"));
		}
	}
	
	var slots = gig.slots;
	if (gig.bands.length > 0)
	{
		var bandSection = new ContentSection("Bands: "+gig.bands.length+" / "+gig.slots);

		for (var band in gig.bands)
		{
			bandSection.addItem
			(
				new ContentItemItem
				(
					gig.bands[band].name,
					function() 
					{ 
						requestBand("content","contentitem round",gig.bands[band].id); 
					},
					"gig-"+gig.id+"-band-"+gig.bands[band].id
				)
			);
			slots--;
		}
		this.sections.push(bandSection);
	}
	if (slots > 0 ) 
	{
		var tbaSection = new ContentSection("Freie Slots: "+slots);
		for (var i = 0; i < slots; i++)
		{
			tbaSection.addItem(new ContentItemItem("TBA"));
		}
		this.sections.push(tbaSection);
	}
}
Gig.inheritsFrom(ContentItem);