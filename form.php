<?php
	header('Content-Type: application/json');
	if(isset($_POST) && !empty($_POST)) {
		
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$to = 'hello@julienperriere.com';
		$subject = 'Message from ' . $name . ' (' . $email . ')';
		$content= '
		<html>
	    <head>
				<title>' . $subject . '</title>
	    </head>
	    <body>
	     	' . $message . '
	    </body>
	  </html>';
		$mailheader = 'MIME-Version: 1.0' . "\r\n";
	  $mailheader .= 'Content-type: text/html; charset=utf-8' . "\r\n";
	  $mailheader .= 'From:' . $email . "\r\n";

		mail($to, $subject, $content, $mailheader) or die('Error!');
		echo json_encode(true);	
	} else { echo json_encode(false); }
?>