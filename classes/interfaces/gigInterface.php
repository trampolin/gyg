<?php

require_once(ROOT_DIR."/classes/entities/gig.php");

class GigInterface extends BasicInterface {
	
	public function __construct($db = null) {
		parent::__construct($db);
	}
	
	public function getGigs($getVenues)
	{
		$content = array();
		
		if ($getVenues) 
		{
			$join = " JOIN venues v ON venueid=v.id ";
		}
		else
		{
			$join = " ";
		}
		
		$q = "SELECT * FROM gigs".$join."ORDER BY gigdate ASC";
		$result = $this->db->query($q);
		if ($this->db->get_last_num_rows() > 0) 
		{
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
			{
				$gig = new Gig();		
				$gig->id = $row['id'];
				$gig->gigdate = $row['gigdate'];
				$gig->venueid = $row['venueid'];
				if ($getVenues) 
				{
					$gig->venue = new Venue();
					$gig->venue->id = $row['id'];
					$gig->venue->name = $row['name'];
					$gig->venue->street = $row['street'];
					$gig->venue->number = $row['number'];
					$gig->venue->zip = $row['zip'];
					$gig->venue->city = $row['city'];
				}
				else
				{
					$gig->venue = null;
				}
				$content[] = $gig;				
			}
		}
		return new DataResponse(ResultTypes::resultOK,"",$content);
	}
}

GigInterface::registerInterface();

?>