<?php

require_once(__DIR__.'/config.php');

class Connection {

	static public function Connect () {		
		$link = new PDO(CONNECT, DB_USER, DB_PASS,
			array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
		);
		return $link;
	}

}
