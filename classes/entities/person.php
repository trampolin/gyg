<?php

class Person {
	public $id;
	public $firstname;
	public $lastname;
	public $email;
	public $tel;
	
	public static function createFromRow($row) {
		$result = new Person();
		$result->id = $row['person_id'];
		$result->firstname = $row['person_firstname'];
		$result->lastname = $row['person_lastname'];
		$result->email = $row['person_email'];
		$result->tel = $row['person_tel'];
		return $result;
	}
}

?>