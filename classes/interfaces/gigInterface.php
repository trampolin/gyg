<?php

require_once(ROOT_DIR."/classes/entities/gig.php");

class GigInterface extends BasicInterface {
	
	public function __construct($db = null) {
		parent::__construct($db);
	}
	
	public function getGigs() {
		$content = array();
		$q = "SELECT * FROM gigs ORDER BY gig_date ASC";
		$result = $this->db->query($q);
		if ($this->db->get_last_num_rows() > 0) 
		{
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
			{
				$gig = Gig::createFromRow($row);
				$vi = new VenueInterface();
				$venue = $vi->getVenue($gig->venueid);
				$gig->venue = $venue->data[0];
				$bi = new BandInterface();
				$bands = $bi->getBandsFromGig($gig->id);
				$gig->bands = $bands->data;
				$content[] = $gig;				
			}
		}
		return new DataResponse(ResultTypes::resultOK,"",$content);
	}
	
	public function getGig($gigid) {
		return new ErrorResponse("Not implemented");
	}
}

GigInterface::registerInterface();

?>