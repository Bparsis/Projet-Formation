<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $UserName;

    #[ORM\Column(type: 'string', length: 255)]
    private $Password;

    #[ORM\Column(type: 'object')]
    private $address;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $PhoneNumber;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $Mail;

    #[ORM\Column(type: 'string', length: 255)]
    private $Transport;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: POI::class, orphanRemoval: true)]
    private $POI;

    #[ORM\ManyToMany(targetEntity: Favori::class, inversedBy: 'users')]
    private $Favori;

    #[ORM\ManyToMany(targetEntity: FilMessage::class, inversedBy: 'users')]
    private $FilMessage;

    #[ORM\ManyToMany(targetEntity: self::class, inversedBy: 'users')]
    private $Amis;

    #[ORM\ManyToMany(targetEntity: self::class, mappedBy: 'Amis')]
    private $users;

    public function __construct()
    {
        $this->POI = new ArrayCollection();
        $this->Favori = new ArrayCollection();
        $this->FilMessage = new ArrayCollection();
        $this->Amis = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserName(): ?string
    {
        return $this->UserName;
    }

    public function setUserName(string $UserName): self
    {
        $this->UserName = $UserName;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->Password;
    }

    public function setPassword(string $Password): self
    {
        $this->Password = $Password;

        return $this;
    }

    public function getAddress()
    {
        return $this->address;
    }

    public function setAddress($address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->PhoneNumber;
    }

    public function setPhoneNumber(?string $PhoneNumber): self
    {
        $this->PhoneNumber = $PhoneNumber;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->Mail;
    }

    public function setMail(?string $Mail): self
    {
        $this->Mail = $Mail;

        return $this;
    }

    public function getTransport(): ?string
    {
        return $this->Transport;
    }

    public function setTransport(string $Transport): self
    {
        $this->Transport = $Transport;

        return $this;
    }

    /**
     * @return Collection<int, POI>
     */
    public function getPOI(): Collection
    {
        return $this->POI;
    }

    public function addPOI(POI $pOI): self
    {
        if (!$this->POI->contains($pOI)) {
            $this->POI[] = $pOI;
            $pOI->setUser($this);
        }

        return $this;
    }

    public function removePOI(POI $pOI): self
    {
        if ($this->POI->removeElement($pOI)) {
            // set the owning side to null (unless already changed)
            if ($pOI->getUser() === $this) {
                $pOI->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Favori>
     */
    public function getFavori(): Collection
    {
        return $this->Favori;
    }

    public function addFavori(Favori $favori): self
    {
        if (!$this->Favori->contains($favori)) {
            $this->Favori[] = $favori;
        }

        return $this;
    }

    public function removeFavori(Favori $favori): self
    {
        $this->Favori->removeElement($favori);

        return $this;
    }

    /**
     * @return Collection<int, FilMessage>
     */
    public function getFilMessage(): Collection
    {
        return $this->FilMessage;
    }

    public function addFilMessage(FilMessage $filMessage): self
    {
        if (!$this->FilMessage->contains($filMessage)) {
            $this->FilMessage[] = $filMessage;
        }

        return $this;
    }

    public function removeFilMessage(FilMessage $filMessage): self
    {
        $this->FilMessage->removeElement($filMessage);

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getAmis(): Collection
    {
        return $this->Amis;
    }

    public function addAmi(self $ami): self
    {
        if (!$this->Amis->contains($ami)) {
            $this->Amis[] = $ami;
        }

        return $this;
    }

    public function removeAmi(self $ami): self
    {
        $this->Amis->removeElement($ami);

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(self $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addAmi($this);
        }

        return $this;
    }

    public function removeUser(self $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeAmi($this);
        }

        return $this;
    }
}
