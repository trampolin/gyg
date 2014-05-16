<?php

require_once(ROOT_DIR."/classes/entities/venue.php");

class VenueInterface extends BasicInterface {
	
	public function __construct($db = null) {
		parent::__construct($db);
	}
	
	public function getVenue($venueid){
		$content = array();
		$q = "SELECT * FROM venues WHERE venue_id =".$venueid;
		$result = $this->db->query($q);
		if ($this->db->get_last_num_rows() > 0)
		{
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
			{
				$content[] = Venue::createFromRow($row);
			}
		}
				
		return new DataResponse(ResultTypes::resultOK,"",$content);
	}
	
	public function getVenues()
	{
		$content = array();
		$q = "SELECT * FROM venues ORDER BY venue_name ASC";
		$result = $this->db->query($q);
		if ($this->db->get_last_num_rows() > 0)
		{
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
			{
				$content[] = Venue::createFromRow($row);
			}
		}
				
		return new DataResponse(ResultTypes::resultOK,"",$content);
	}
	
}

VenueInterface::registerInterface();

?>