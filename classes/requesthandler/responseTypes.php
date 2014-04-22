<?php
	
abstract class ResultTypes
{
    const resultOK = "ok";
    const resultNotOK = "nok";
}
	
class BasicResponse {
	public $result;
	public $message;
	
	public function toJson()
	{
		return json_encode($this);
	}
	
	public function __construct($result,$message) {
		$this->result = $result;
		$this->message = $message;
	}
}

class DataResponse extends BasicResponse {
	public $data;
	
	public function __construct($result,$message,$data) {
		parent::__construct($result,$message);
		$this->data = $data;
	}
}

class ErrorResponse extends BasicResponse {
	public function __construct($message) {
		parent::__construct(ResultTypes::resultNotOK,$message);
	}
}

class ErrorDataResponse extends ErrorResponse {
	public $data;
	
	public function __construct($message,$data) {
		parent::__construct($message);
		$this->data = $data;
	}
}

?>
