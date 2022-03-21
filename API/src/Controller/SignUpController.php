<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

header('Access-Control-Allow-Origin: *');

class SignUpController extends AbstractController
{

	#[Route('/SignUp/userName={userName}/password={password}/mail={mail}/phone={phone}/transport={transport}', name: 'app_sign_up', methods: ['GET'])]
    public function SignUp($userName, $password, $mail, $phone, $transport): Response
    {
		$error = false;
		
        if(!$error){
			return $this->json([
				'code' => 'ok',
				'message' => 'enregistrement fait',
			]);
		}else{
			return $this->json([
				'userName' => $userName,
				'password' => $password,
				'mail' => $mail,
				'phone' => $phone,
				'transport' => $transport,
				'code' => 'error',
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
