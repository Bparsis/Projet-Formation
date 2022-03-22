const AddMarker = (x, y, map, mapboxgl, marker, setMarker) => {
	
	if (marker?.premier == undefined)		// si le premier marker existe pas
	{
		let marker1 = new mapboxgl			// Creation du marker avec le style et les coordonnées correspondante
			.Marker({
				color: "#00FF00",
			})
			.setLngLat([x,y])
			.addTo(map.current);			// Ajout du marker a la map
		
		let NewMarker = {"premier": marker1};
		
		setMarker({...marker, ...NewMarker})
	}
	else if(marker?.second == undefined)	// si le second marker existe pas
	{
		let marker2 = new mapboxgl			// Creation du marker avec le style et les coordonnées correspondante
			.Marker({
				color: "#00FF00",
			})
			.setLngLat([x,y])
			.addTo(map.current);			// Ajout du marker a la map
			
		let NewMarker = {"second": marker2};
		
		setMarker({...marker, ...NewMarker})
	}
	else 									// si les deux marker existe
	{										// Le second marker est toujours le plus recent si multiple marker
		marker.premier.remove();			// Suppression du premier marker
		let marker1 = marker.second;		// "Deplacement" du second marker vers le premier
		let marker2 = new mapboxgl			// Recreation du second marker avec le style et les coordonnées correspondante
			.Marker({
				color: "#00FF00",
			})
			.setLngLat([x,y])
			.addTo(map.current);			// Ajout du marker a la map
			
		let NewMarker = {"premier": marker1, "second": marker2};
		
		setMarker({...marker, ...NewMarker})
	}

	map.current.flyTo({						// Deplacement de la map sur le marker
		center: [x,y],
		essential: true,
	});
}

export default AddMarker

// ! Permet l'ajout de marker sur la carte (par recherche)
// ? Second marker toujour le plus recent si multiple marker