<?php
	header('Content-Type: application/json');
	if(isset($_POST) && !empty($_POST)) {
		
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$to = 'laureboutmy@gmail.com';
		$subject = 'Hi there!';
		$content= '
		<html>
	    <head>
				<title>' . $subject . '</title>
	    </head>
	    <body>
	     	<strong>From: </strong>' . $name . ' <' . $email .'>
	      <br /><br /><strong>Message: </strong>' . $message . '
	    </body>
	  </html>';
		$mailheader = 'MIME-Version: 1.0' . "\r\n";
	  $mailheader .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	  $mailheader .= 'From:' . $email . "\r\n";

		mail($to, $subject, $content, $mailheader) or die('Error!');
		echo json_encode(true);	
	} else { echo json_encode(false); }
?>