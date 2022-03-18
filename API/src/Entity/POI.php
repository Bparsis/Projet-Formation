<?php

namespace App\Entity;

use App\Repository\POIRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: POIRepository::class)]
class POI
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'object')]
    private $Coords;

    #[ORM\Column(type: 'string', length: 255)]
    private $Titre;

    #[ORM\Column(type: 'string', length: 255)]
    private $Categry;

    #[ORM\Column(type: 'string', length: 255)]
    private $Description;

    #[ORM\Column(type: 'float', nullable: true)]
    private $Note;

    #[ORM\Column(type: 'string', length: 255)]
    private $Image;

    #[ORM\OneToOne(targetEntity: Commentaire::class, cascade: ['persist', 'remove'])]
    private $Commentaire;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'POI')]
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCoords()
    {
        return $this->Coords;
    }

    public function setCoords($Coords): self
    {
        $this->Coords = $Coords;

        return $this;
    }

    public function getTitre(): ?string
    {
        return $this->Titre;
    }

    public function setTitre(string $Titre): self
    {
        $this->Titre = $Titre;

        return $this;
    }

    public function getCategry(): ?string
    {
        return $this->Categry;
    }

    public function setCategry(string $Categry): self
    {
        $this->Categry = $Categry;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->Description;
    }

    public function setDescription(string $Description): self
    {
        $this->Description = $Description;

        return $this;
    }

    public function getNote(): ?float
    {
        return $this->Note;
    }

    public function setNote(?float $Note): self
    {
        $this->Note = $Note;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->Image;
    }

    public function setImage(string $Image): self
    {
        $this->Image = $Image;

        return $this;
    }

    public function getCommentaire(): ?Commentaire
    {
        return $this->Commentaire;
    }

    public function setCommentaire(?Commentaire $Commentaire): self
    {
        $this->Commentaire = $Commentaire;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
