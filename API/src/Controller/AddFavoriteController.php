<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Favori;
use App\Entity\User;
use App\Custom\Coords;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

header('Access-Control-Allow-Origin: *');

class AddFavoriteController extends AbstractController
{
	#[Route('/AddFavorite_Lat={lat}_Lng={lng}_Color={Color}_Titre={Titre}_Desc={Desc}_User={User}', name: 'app_Add_Fav', methods: ['GET'])]
    public function index($lat, $lng, $Color, $Titre, $Desc, $User, EntityManagerInterface $entityManager, ManagerRegistry $registry): Response
    {
		$coords = new Coords($lng, $lat);
		
		$UserRepo = $registry->getRepository(User::class);
		$user = $UserRepo->findOneBy(['UserName' => $User]);
		
		$favori = new Favori();
			
		$favori->setCoords($coords);
		$favori->setColor($Color);
		$favori->setTitre($Titre);
		$favori->setDescription($Desc);
		
		$favori->addUser($user);
		$user->addFavori($favori);
		
		$entityManager->persist($user);
		$entityManager->persist($favori);
		$entityManager->flush();
			
        return $this->json([
			'message' => 'enregistrement fait'
        ]);
    }
}
