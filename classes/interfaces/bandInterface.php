<?php

require_once(ROOT_DIR."/classes/entities/band.php");

class GetBandsParams {
	public $gigid;
}

class BandInterface extends BasicInterface {
	
	public function __construct($db = null) {
		parent::__construct($db);
	}

	public function getBandsFromGig($gig)
	{
		$content = array();
		$q = "SELECT * FROM bands JOIN bandgigs ON band_id = bandid WHERE gigid = ".$gig." ORDER BY band_name ASC";
		$result = $this->db->query($q);
		if ($this->db->get_last_num_rows() > 0) 
		{
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
			{
				$content[] = Band::createFromRow($row);
			}
		}	
		return new DataResponse(ResultTypes::resultOK,"",$content);
	}
	
	public function getBands()
	{
		$content = array();
		$q = "SELECT * FROM bands ORDER BY band_name ASC";
		$result = $this->db->query($q);
		if ($this->db->get_last_num_rows() > 0) 
		{
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
			{
				$content[] = Band::createFromRow($row);
			}
		}
		return new DataResponse(ResultTypes::resultOK,"",$content);
	}
	
	public function getBand($id)
	{
		$content = array();
		$q = "SELECT * FROM bands WHERE band_id=".$id;
		$result = $this->db->query($q);
		if ($this->db->get_last_num_rows() > 0) 
		{
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
			{
				$content[] = Band::createFromRow($row);
			}
		}	
		return new DataResponse(ResultTypes::resultOK,"",$content);
	}
	
}

BandInterface::registerInterface();

?>