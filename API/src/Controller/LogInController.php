<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;

header('Access-Control-Allow-Origin: *');

class LogInController extends AbstractController
{

	#[Route('/LogIn_UserId={UserId}_Password={Password}', name: 'app_login', methods: ['GET'])]
    public function LogIn($UserId, $Password, ManagerRegistry $registry): Response
    {
		
		$UserId = str_replace("{dot}", ".", $UserId);
		$Password = str_replace("{dot}", ".", $Password);
		
		$UserId = str_replace("{and}", "&", $UserId);
		$Password = str_replace("{and}", "&", $Password);
		
		$UserId = str_replace("{question}", "?", $UserId);
		$Password = str_replace("{question}", "?", $Password);
		
		$valid = false;
		$UserRepo = $registry->getRepository(User::class);
		$User = $UserRepo->findOneBy(['UserName' => $UserId]);
		
		if($User == null){
			$User = $UserRepo->findOneBy(['Mail' => $UserId]);
		}
		
		if($User == null){
			$User = $UserRepo->findOneBy(['PhoneNumber' => $UserId]);
		}
		
		if($User != null){			
			$UserPassword = $User->getPassword();	
			$valid = password_verify($Password, $UserPassword);
		}
		
		if ($valid){
			return $this->json([
				'validity' => $valid,
				'UserName' => $User->getUserName(),
				'Transport' => $User->getTransport(),
				'Address' => $User->getAddress(),
				'message' => 'Welcome to our website!',
			]);			
		} else {
			return $this->json([
				'validity' => $valid,
				'message' => 'Wrong Password or Id!',
			]);	
		}
    }
}