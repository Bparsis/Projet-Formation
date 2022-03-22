import {useContext, useEffect} from "react";

import {MapContext} from "./../Map";

import {ApiMapbox} from "./../../Global/Data"

import useFetch from "./../../../Hook/useFetch";

import ModalDist from "./../Modal/ModalDist";

const CalcDist = () => {
	
	const {data, error, loading, refresh} = useFetch()
	
	const {map, lng, lat, mapboxgl, marker} = useContext(MapContext)
	
	useEffect(() => {							// Gestion de l'affichage
		if (data?.features != undefined){		// Une fois la requete terminer
			// ↓ Supression des couche apres recalcul et apres affichage incrementant
			if (map.current.getSource('Time3') && map.current.getSource('Time2') && map.current.getSource('Time1') && map.current.getSource('Time0') ){
				for(let i = 1; i < 4; i++){
					map.current.removeLayer('TimeFill'+i)
					map.current.removeLayer('TimeLine'+i)
					map.current.removeSource('Time'+i)
				}
			}
			
			// ↓ Supression de la couche 0 si elle existe
			if (map.current.getSource('Time0')){
				map.current.removeLayer('TimeFill0')
				map.current.removeLayer('TimeLine0')
				map.current.removeSource('Time0')
			}
			
			data.features.map((feature, key) => {
				
				if (map.current.getSource('Time'+key)){
					map.current.getSource('Time'+key).setData(feature.geometry);	
				} else {
					map.current.addSource('Time'+key, {		// Creation de la souce correspondant a une distance
						'type': 'geojson',
						'data': feature.geometry
					});
					map.current.addLayer({					// Affichage d'un layer polygons correspondant a la source crée
						'id': 'TimeFill'+key,
						'type': 'fill',
						'source': 'Time'+key,
						'layout': {},
						'paint': {							// Definition des propriéte de l'affichage du layer
							'fill-color': feature.properties.fillColor,
							'fill-opacity': feature.properties.fillOpacity,
							'fill-outline-color': feature.properties.fillColor,
						}
					});
					map.current.addLayer({					// Affichage d'un layer Line correspondant a la source crée (bordure)
						'id': 'TimeLine'+key,
						'type': 'line',
						'source': 'Time'+key,
						'layout': {},
						'paint': {							//Deffinition des propriete de l'affichage
							'line-width': 5,
							'line-color': feature.properties.color,
						}
					});
				}
			})
		}
	},[data])
	
	const calcDist = (profile = "driving", time = "15") => {	// Fonction appelant l'API appeler par la modal
		
		let color = "";
		if(time.length<=2) color = "&contours_colors=00FF00"	// Definition d'une couleur pour l'affichage dans le cas sans incrementation
																// ↓ Definition d'une Url de base utilisée si l'utilisateur n'a pas de marker existant(Centre de la map afficher)
		let Url = ApiMapbox+"isochrone/v1/mapbox/"+profile+"/"+lng+"%2C"+lat+"?contours_minutes="+time+"&polygons=true"+color+"&denoise=1&generalize=0&access_token="+mapboxgl.accessToken;

		if(marker?.second)										// Definition de l'url sur le second marker (le plus recent)
		{
			let Lng = marker.second._lngLat.lng;
			let Lat = marker.second._lngLat.lat;
			Url = ApiMapbox+"isochrone/v1/mapbox/"+profile+"/"+Lng+"%2C"+Lat+"?contours_minutes="+time+"&polygons=true"+color+"&denoise=1&generalize=0&access_token="+mapboxgl.accessToken;
		} 
		else if (marker?.premier)								// Definition de l'url sur le marker (seul existant donc plus recent)
		{
			let Lng = marker.premier._lngLat.lng;
			let Lat = marker.premier._lngLat.lat;
			Url = ApiMapbox+"isochrone/v1/mapbox/"+profile+"/"+Lng+"%2C"+Lat+"?contours_minutes="+time+"&polygons=true"+color+"&denoise=1&generalize=0&access_token="+mapboxgl.accessToken;
		}
		
		refresh(Url);
	}
	
	return (
		<>
			<ModalDist calcDist={calcDist}/>
			<button data-bs-toggle="modal" data-bs-target="#ModalDist" className="btn btn-outline-success m-2 w-100">Calculer la distance</button>
		</>
	);
}
export default CalcDist;

// ! Gestion et affichage de la "distance atteignable a proximitée"