<?php
$name = $_POST["name"];
$from = $_POST["email"];
$subject = "wiadomość ze strony Forest Grouop";
$to = "adres@mail";
$message = $_POST ["msg"];

$txt = "Od: " . $name . "\r\n" . "e-mail: " . $from . "\r\n" . "Treść: " . $message;

$headers = "From: " . $from . "\r\n";
$headers .= "Reply to: " . $from . "\r\n";

$mail_status = mail($to, $subject, $txt, $headers);

if (mail_status) {
    header("Location: /index.html?mail_status=sent");
} else {
    header("Location: /index.html?mail_status=error");
}

