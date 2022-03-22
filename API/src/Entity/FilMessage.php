<?php

namespace App\Entity;

use App\Repository\FilMessageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FilMessageRepository::class)]
class FilMessage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'datetime')]
    private $Date;

    #[ORM\OneToMany(mappedBy: 'filMessage', targetEntity: Message::class, orphanRemoval: true)]
    private $Message;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'FilMessage')]
    private $users;

    public function __construct()
    {
        $this->Message = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->Date;
    }

    public function setDate(\DateTimeInterface $Date): self
    {
        $this->Date = $Date;

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessage(): Collection
    {
        return $this->Message;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->Message->contains($message)) {
            $this->Message[] = $message;
            $message->setFilMessage($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->Message->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getFilMessage() === $this) {
                $message->setFilMessage(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addFilMessage($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeFilMessage($this);
        }

        return $this;
    }
}
