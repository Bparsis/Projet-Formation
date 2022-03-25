<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\User;
use App\Custom\Coords;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

header('Access-Control-Allow-Origin: *');

class SignUpController extends AbstractController
{

	#[Route('/SignUp_userName={userName}_password={password}_mail={mail}_phone={phone}_transport={transport}_address={address}', name: 'app_sign_up', methods: ['GET'], requirements: ['mail' => '.*', 'phone' => '.*'])]
    public function SignUp($userName="a", $password="a", $mail="a", $phone="a", $transport="a", $address="a", EntityManagerInterface $entityManager, ManagerRegistry $registry): Response
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
		
		$UserRepo = $registry->getRepository(User::class);
		$Users = $UserRepo->findBy(['UserName' => $userName]);
		
		if($Users != []){
			$error = true;
			$codeError = "Name already existing";
			$value = $userName;
		}
		
        if(!$error){
			
			$password = password_hash($password, PASSWORD_DEFAULT);
			
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
				'UserName' => $userName,
				'Transport' => $transport,
				'Address' => $address,
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