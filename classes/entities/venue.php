<?php

class Venue {
	public $id;
	public $name;
	public $street;
	public $number;
	public $zip;
	public $city;
	public $latitude;
	public $longitude;
	
	public static function createFromRow($row) {
		$venue = new Venue();		
		$venue->id = $row['venue_id'];
		$venue->name = $row['venue_name'];
		$venue->street = $row['venue_street'];
		$venue->number = $row['venue_number'];
		$venue->zip = $row['venue_zip'];
		$venue->city = $row['venue_city'];
		$venue->latitude = $row['venue_latitude'];
		$venue->longitude = $row['venue_longitude'];
		return $venue;
	}
}

?>