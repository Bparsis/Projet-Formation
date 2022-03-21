<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

	header('Access-Control-Allow-Origin: *');

class SignUpController extends AbstractController
{

	#[Route('/SignUp&{tmp}&{test}', name: 'app_sign_up', methods: ['GET'])]
    public function SignUp(string $tmp="notmp", string $test="notest"): Response
    {
        return $this->json([
			'tmp' => $tmp,
			'test' => $test,
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/SignUpController.php',
        ]);
    }
}
	// #[Route('/SignUp?{tmp}', name: 'app_sign_up', methods: {'GET'})]
	// #[Route('/SignUp?tmp={tmp}&test={test}', name: 'app_sign_up'), requirements: ['tmp' => '\w+', 'test' => '\w+']]
	// #[Route('/SignUp/{tmp}/{test}', name: 'app_sign_up')]
	// #[ParamConverter('tmp', options: ['mapping' => ['tmp' => 'tmp']])]
	// #[ParamConverter('test', options: ['mapping' => ['test' => 'test']])]
