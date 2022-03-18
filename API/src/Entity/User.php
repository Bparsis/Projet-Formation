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
    private $userName;

    #[ORM\Column(type: 'string', length: 255)]
    private $passWord;

    #[ORM\Column(type: 'object')]
    private $address;

    #[ORM\Column(type: 'string', length: 255)]
    private $phoneNumber;

    #[ORM\Column(type: 'string', length: 255)]
    private $mail;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: POI::class)]
    private $POI;

    #[ORM\Column(type: 'string', length: 255)]
    private $Transport;

    public function __construct()
    {
        $this->POI = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserName(): ?string
    {
        return $this->userName;
    }

    public function setUserName(string $userName): self
    {
        $this->userName = $userName;

        return $this;
    }

    public function getPassWord(): ?string
    {
        return $this->passWord;
    }

    public function setPassWord(string $passWord): self
    {
        $this->passWord = $passWord;

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
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(string $mail): self
    {
        $this->mail = $mail;

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

    public function getTransport(): ?string
    {
        return $this->Transport;
    }

    public function setTransport(string $Transport): self
    {
        $this->Transport = $Transport;

        return $this;
    }
}
