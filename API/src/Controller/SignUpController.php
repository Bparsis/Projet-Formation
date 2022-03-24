<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\User;
use App\Custom\Coords;
use Doctrine\ORM\EntityManagerInterface;

header('Access-Control-Allow-Origin: *');

class SignUpController extends AbstractController
{

	// #[Route('/SignUp/userName={userName}/password={password}/mail={mail}/phone={phone}/transport={transport}/address={address}', name: 'app_sign_up', methods: ['GET'], requirements: ['mail' => '.*', 'phone' => '.*'])]
	#[Route('/SignUp', name: 'app_sign_up', methods: ['GET'])]
    public function SignUp($userName="a", $password="a", $mail="a", $phone="a", $transport="a", $address="a", EntityManagerInterface $entityManager): Response
    {
		
		$mail = str_replace("{dot}", ".", $mail);
		$phone = str_replace("{dot}", ".", $phone);
		$address = str_replace("{dot}", ".", $address);
		$userName = str_replace("{dot}", ".", $userName);
		$password = str_replace("{dot}", ".", $password);
		$transport = str_replace("{dot}", ".", $transport);
		
		$mail = str_replace("{and}", "&", $mail);
		$phone = str_replace("{and}", "&", $phone);
		$address = str_replace("{and}", "&", $address);
		$userName = str_replace("{and}", "&", $userName);
		$password = str_replace("{and}", "&", $password);
		$transport = str_replace("{and}", "&", $transport);
		
		$mail = str_replace("{question}", "?", $mail);
		$phone = str_replace("{question}", "?", $phone);
		$address = str_replace("{question}", "?", $address);
		$userName = str_replace("{question}", "?", $userName);
		$password = str_replace("{question}", "?", $password);
		$transport = str_replace("{question}", "?", $transport);
		
		$address = explode(",", $address);
		
		$error = false;
		$codeError = "";
		
		
		
		if($mail && !filter_var($mail, FILTER_VALIDATE_EMAIL)){
			$error = true;
			$codeError = "mail invalid";
			$value = $mail;
		}
		
		$coords = new Coords($address[0], $address[1]);
		
        if(!$error){
			
			$password = password_hash($password);
			
			// $user = new User();
			
			// $user->setUserName($userName);
			// $user->setPassword($password);
			// $user->setTransport($transport);
			// $user->setAddress($address);
			
			// if ($phone != ""){				
				// $user->setPhoneNumber($phone);
			// }
			// if ($mail != ""){				
				// $user->setMail($mail);
			// }
			
			// $entityManager->persist($user);
			// $entityManager->flush();
			
			return $this->json([
				'error' => $error,
				'tmp' => $password,
				'message' => 'enregistrement fait',
			]);
		}else{
			return $this->json([
				'error' => $error,
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
