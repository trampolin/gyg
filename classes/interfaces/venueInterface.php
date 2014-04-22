<?php

require_once(ROOT_DIR."/classes/entities/venue.php");

class VenueInterface extends BasicInterface {
	
	public function __construct($db = null) {
		parent::__construct($db);
	}
	
	public function getVenues()
	{
		$content = array();
		$q = "SELECT * FROM venues ORDER BY name ASC";
		$result = $this->db->query($q);
		if ($this->db->get_last_num_rows() > 0) 
		{
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
			{
				$venue = new Venue();		
				$venue->id = $row['id'];
				$venue->name = $row['name'];
				$venue->street = $row['street'];
				$venue->number = $row['number'];
				$venue->zip = $row['zip'];
				$venue->city = $row['city'];
				$content[] = $venue;				
			}
		}
				
		return new DataResponse(ResultTypes::resultOK,"",$content);
	}
	
}

VenueInterface::registerInterface();

?>