<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Favori;
use App\Entity\User;

header('Access-Control-Allow-Origin: *');

class GetFavoriController extends AbstractController
{
    #[Route('/GetFavori_user={User}', name: 'app_get_favori')]
    public function index($User, ManagerRegistry $registry): Response
    {
		$UserRepo = $registry->getRepository(User::class);
		$user = $UserRepo->findOneBy(['UserName' => $User]);
		
		$favoris = $user->getFavori();
		var_dump($user->getId());
		var_dump($favoris->getOwner()->getId());
		var_dump(gettype($favoris));
		var_dump($favoris->isEmpty());
		// var_dump($favoris->getValues());
		
        return $this->json([
			'tmp' => $user->getId(),
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/GetFavoriController.php',
        ]);
    }
}
