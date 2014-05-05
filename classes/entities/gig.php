<?php

class Gig {
	public $id;
	public $gigdate;
	public $getin;
	public $doors;
	public $begin;
	public $venueid;
	public $slots;
	public $venue;
	public $bands;
	
	public static function createFromRow($row) {
		$gig = new Gig();	
		$gig->id = $row['gig_id'];
		$gig->gigdate = $row['gig_date'];
		$gig->getin = $row['gig_getin'];
		$gig->doors = $row['gig_doors'];
		$gig->begin = $row['gig_begin'];
		$gig->venueid = $row['gig_venueid'];
		$gig->slots = $row['gig_slots'];
		return $gig;
	}
}

?>