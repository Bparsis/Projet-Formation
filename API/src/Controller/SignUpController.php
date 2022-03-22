<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

header('Access-Control-Allow-Origin: *');

class SignUpController extends AbstractController
{

	#[Route('/SignUp/userName={userName}/password={password}/mail={mail}/phone={phone}/transport={transport}', name: 'app_sign_up', methods: ['GET'], requirements: ['mail' => '.*', 'phone' => '.*'])]
    public function SignUp($userName, $password, $mail, $phone, $transport): Response
    {
		
		$userName = str_replace("{dot}", ".", $userName);
		$password = str_replace("{dot}", ".", $password);
		$mail = str_replace("{dot}", ".", $mail);
		$phone = str_replace("{dot}", ".", $phone);
		$transport = str_replace("{dot}", ".", $transport);
		
		$error = false;
		$codeError = "";
		
		// $regexPhoneNumber = "/^(0|\+33)?(?(1)[\d]{9}|\0)$/";	// ! A debug 
		$regexUserName = "/^[\w \"'-]{1,50}$/u";
		$regexPassword = "/^[\w@\"'-]{9,50}$/";
		
		if(!preg_match($regexUserName, $userName)){
			$error = true;
			$codeError = "userName invalid";
			$value = $userName;
		}
		
		if(!preg_match($regexPassword, $password)){
			$error = true;
			$codeError = "password invalid";
			$value = $password;
		}
		
		if($mail && !filter_var($mail, FILTER_VALIDATE_EMAIL)){
			$error = true;
			$mail = "mail invalid";
			$value = $mail;
		}

        if(!$error){
			return $this->json([
				'error' => $error,
				'message' => 'enregistrement fait',
			]);
		}else{
			return $this->json([
				'eror' => $error,
				'value' => $value,
				'Code Error' => $codeError,
				'message' => 'enregistrement na pas abouti',
			]);
		}
    }
}
	// #[Route('/SignUp?{tmp}', name: 'app_sign_up', methods: {'GET'})]
	// #[Route('/SignUp?tmp={tmp}&test={test}', name: 'app_sign_up'), requirements: ['tmp' => '\w+', 'test' => '\w+']]
	// #[Route('/SignUp/{tmp}/{test}', name: 'app_sign_up')]
	// #[ParamConverter('tmp', options: ['mapping' => ['tmp' => 'tmp']])]
	// #[ParamConverter('test', options: ['mapping' => ['test' => 'test']])]
