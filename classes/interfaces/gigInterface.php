<?php

require_once(ROOT_DIR."/classes/entities/gig.php");

class GigInterface extends BasicInterface {
	
	public function __construct($db = null) {
		parent::__construct($db);
	}
	
	public function getGigs($params)
	{
		$content = array();
		$join = " ";
		if ($params->getVenues) 
		{
			$join = " JOIN venues v ON venueid=v.id ";
		}
		if ($params->getBands)
		{
			$bi = new BandInterface();
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
				$gig->getin = $row['getin'];
				$gig->doors = $row['doors'];
				$gig->begin = $row['begin'];
				$gig->venueid = $row['venueid'];
				$gig->slots = $row['slots'];
				if ($params->getVenues) 
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
				$gig->bands = array();
				
				if ($params->getBands)
				{
					$bands = $bi->getBandsFromGig($gig->id);
					foreach ($bands->data as $band)
					{
						$gig->bands[] = $band;
					}
				}
				
				$content[] = $gig;				
			}
		}
		return new DataResponse(ResultTypes::resultOK,"",$content);
	}
}

GigInterface::registerInterface();

?>