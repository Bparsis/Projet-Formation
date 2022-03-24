<?php

namespace App\Custom;

class Coords
{

    private $Lng;

    private $Lat;

	public function __construct ($Lng, $Lat)
	{
		$this->Lat = $Lat;
		$this->Lng = $Lng;
	}

    public function getLng(): ?int
    {
        return $this->Lng;
    }

    public function setLng(int $Lng): self
    {
        $this->Lng = $Lng;

        return $this;
    }

    public function getLat(): ?int
    {
        return $this->Lat;
    }

    public function setLat(int $Lat): self
    {
        $this->Lat = $Lat;

        return $this;
    }
}
