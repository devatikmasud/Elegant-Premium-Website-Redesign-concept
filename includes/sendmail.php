<?php
/*
 * Contact form handler
 * Developed & Customized by Md Atik Masud
 * Set $to to the address that should receive messages.
 */
header('Content-Type: application/json; charset=utf-8');
$to = 'info@nexora.com';
$name    = trim(strip_tags($_POST['form_name'] ?? ''));
$email   = filter_var(trim($_POST['form_email'] ?? ''), FILTER_VALIDATE_EMAIL);
$message = trim(strip_tags($_POST['form_message'] ?? ''));
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !$name || !$email || !$message) {
  echo json_encode(['status' => 'false', 'message' => 'Please fill in all required fields with valid details.']); exit;
}
$subject = 'New message from Nexora website';
$body = "Name: $name\nEmail: $email\n\n$message";
$headers = "From: Nexora <$to>\r\nReply-To: $email\r\nContent-Type: text/plain; charset=utf-8";
$ok = @mail($to, $subject, $body, $headers);
echo json_encode($ok
  ? ['status' => 'true',  'message' => 'Thank you! Your message has been sent.']
  : ['status' => 'false', 'message' => 'Sorry, the message could not be sent. Please try again later.']);
