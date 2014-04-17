<?php

define("ROOT_DIR", "../..");

$allowedCalls = array();

function handleRequest() {
	$_WHERE = $_GET;
	
	$data = isset($_WHERE['data']) ? $_WHERE['data'] : "test";
	
	//$postdata = file_get_contents("php://input");
	
	//echo $data;
	echo json_decode($postdata);
	
	/*if ($data != null) {
		try {
			/*foreach($data as $key => $val) {
				echo $key." ".$val."\n";
			}*/
			//$obj = json_decode($data);
		/*}
		catch (Exception $e) {
			return "Fehler beim dekodieren von ".$data; 
		}
	}*/
	
	
	//return json_encode($data);
}

echo handleRequest();

?>