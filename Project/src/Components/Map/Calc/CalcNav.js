import {useContext, useEffect} from "react";

import {MapContext} from "./../Map";

import useFetch from "./../../../Hook/useFetch";

import ModalNavError from "./../Modal/ModalNavError";
import ModalNav from "./../Modal/ModalNav";

import { Modal } from "bootstrap";

import { ApiMapbox } from "./../../Global/Data";

const CalcNav = () => {
	
	const {data, error, loading, refresh} = useFetch()
	
	const {map, lng, lat, mapboxgl, marker, setSteps} = useContext(MapContext)
	
	useEffect(() => {
		if (data?.code == "Ok" && data?.routes){
			data.routes.map((route, key) => {		// Pour chaque route existante actuellements limiter a 1
				var Name= 'Nav'+key;
				if (map.current.getSource(Name)){	// Comme limiter a 1 seule route on redefini celle ci a chaque recalculs
					map.current.getSource(Name).setData(route.geometry);	
				} else {							// Si la route n'exite pas on la cré et l'affiche en meme temps
					map.current.addSource(Name, {	// Creation de la source
						'type': 'geojson',
						'data': route.geometry
					});
					
					map.current.addLayer({			// Creation du layer servant a afficher la route
						'id': Name,
						'type': 'line',
						'source': Name,
						'layout': {
							'line-join': 'round',
							'line-cap': 'round',
						},
						'paint': {					// Definition du style
							'line-width': 5,
							'line-color': '#00FF00',
							'line-opacity': 0.5,
						}
					});
					route.legs.map((leg) => {	// Affectation des etape au state correspondant
						setSteps(leg.steps);
					})
				}
			})
		} else { 					// Gestion des erreur
			if (!data?.message){
				return				// Si pas de retour on quitte la fonction 
			}
									// ↓ Affichage de l'erreur avec une modal ↓
			let modal = document.querySelector('#ModalNavError');
			modal.querySelector('.modal-body').innerHTML = "<h2>"+data?.message+"</h2>";
			
			var myModal = new Modal(modal);
			
			myModal.toggle();
		}
	},[data])
	
	const calcNav = (profile = "driving-traffic" ) => {		// Appel a l'API pour calcul du trajet
		let lng1 = marker.premier._lngLat.lng;
		let lat1 = marker.premier._lngLat.lat;
		let lng2 = marker.second._lngLat.lng;
		let lat2 = marker.second._lngLat.lat;
															// ↓ Definition de l'url ↓
		let Url = ApiMapbox+"directions/v5/mapbox/"+profile+"/"+lng1+","+lat1+";"+lng2+","+lat2+"?geometries=geojson&overview=full&steps=true&access_token="+mapboxgl.accessToken
			
		refresh(Url);
	}
	
	const redirectModal = () => {	// Selection de la modal a afficher si erreur
		if(marker?.premier && marker?.second)
		{							// Affichage de la modal normal pour selectionner les parametre
			let modal = document.querySelector('#ModalNav');
			
			var myModal = new Modal(modal);
			
			myModal.toggle();
		}
		else 
		{							// Affichage de la modal d'erreur avec phrase indicative
			let txt = ""
			marker?.premier ? txt = "Veuillez selectionner l'arrivée" : txt = "Veuiller selectionner le depart et l'arrivée";
			let modal = document.querySelector('#ModalNavError');
			modal.querySelector('.modal-body').innerHTML = "<h2>"+txt+"</h2>";
			
			var myModal = new Modal(modal);
			
			myModal.toggle();
		}
	}
	
	return (
		<>
			<ModalNav calcNav={calcNav} />
			<ModalNavError />
			<button onClick={redirectModal} className="btn btn-outline-success m-2 w-100">Calculer le trajet</button>
		</>
	);
}
export default CalcNav;

// ! Calucl et affichage d'un trajet avec definition des etape correspondante
// ? limiter a 1 en meme temps