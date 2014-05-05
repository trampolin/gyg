<?php

require_once(ROOT_DIR."/classes/entities/person.php");

class PersonInterface extends BasicInterface {
	
	public function __construct($db = null) {
		parent::__construct($db);
	}
	
	public function getPersons()
	{
		$content = array();
		$q = "SELECT * FROM persons";
		$result = $this->db->query($q);
		if ($this->db->get_last_num_rows() > 0)
		{
			while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) 
			{
				$contact = new Contact();		
				$contact->id = $row['id'];
				$content[] = $contact;				
			}
		}
				
		return new DataResponse(ResultTypes::resultOK,"",$content);
	}
	
}

VenueInterface::registerInterface();

?>