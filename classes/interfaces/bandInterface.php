<?php

require_once(ROOT_DIR."/classes/entities/band.php");

class BandInterface extends BasicInterface {
	
	public function __construct($db = null) {
		parent::__construct($db);
	}
	
	public function getBands()
	{
		$content = array();
		$q = "SELECT * FROM bands ORDER BY name ASC";
		$result = $this->db->query($q);
		if ($this->db->get_last_num_rows() > 0) 
		{
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
			{
				$band = new Band();		
				$band->id = $row['id'];
				$band->name = $row['name'];
				$band->description = $row['description'];
				$content[] = $band;
			}
		}
				
		return new DataResponse(ResultTypes::resultOK,"",$content);
	}
	
}

BandInterface::registerInterface();

?>