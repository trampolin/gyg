<?php

class Band {
	public $id;
	public $name;
	public $description;
	
	public static function createFromRow($row) {
		$result = new Band();
		$result->id = $row['band_id'];
		$result->name = $row['band_name'];
		$result->description = $row['band_description'];
		return $result;
	}
	
}

?>