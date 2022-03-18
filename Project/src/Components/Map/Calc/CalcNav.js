import {useContext, useEffect} from "react";

import {MapContext} from "./../Map";

import useFetch from "./../../../Hook/useFetch";

import ModalNavError from "./../Modal/ModalNavError";
import ModalNav from "./../Modal/ModalNav";

import { Modal } from "bootstrap";

const CalcNav = () => {
	
	const {data, error, loading, refresh} = useFetch()
	
	const {map, lng, lat, mapboxgl, marker, setSteps} = useContext(MapContext)
	
	useEffect(() => {
		if (data?.code == "Ok" && data?.routes){
			data.routes.map((route, key) => {
				var Name= 'Nav'+key;
				if (map.current.getSource(Name)){
					map.current.getSource(Name).setData(route.geometry);	
				} else {
					map.current.addSource(Name, {
						'type': 'geojson',
						'data': route.geometry
					});
					
					map.current.addLayer({
						'id': Name,
						'type': 'line',
						'source': Name,
						'layout': {
							'line-join': 'round',
							'line-cap': 'round',
						},
						'paint': {
							'line-width': 5,
							'line-color': '#00FF00',
							'line-opacity': 0.5,
						}
					});
					route.legs.map((leg) => {
						setSteps(leg.steps);
					})
				}
			})
		} else {
			if (!data?.message){
				return
			}
			
			let modal = document.querySelector('#ModalNavError');
			modal.querySelector('.modal-body').innerHTML = "<h2>"+data?.message+"</h2>";
			
			var myModal = new Modal(modal);
			
			myModal.toggle();
		}
	},[data])
	
	const calcNav = (profile = "driving-traffic" ) => {
		let lng1 = marker.premier._lngLat.lng;
		let lat1 = marker.premier._lngLat.lat;
		let lng2 = marker.second._lngLat.lng;
		let lat2 = marker.second._lngLat.lat;
			
		let Url = "https://api.mapbox.com/directions/v5/mapbox/"+profile+"/"+lng1+","+lat1+";"+lng2+","+lat2+"?geometries=geojson&overview=full&steps=true&access_token="+mapboxgl.accessToken
			
		refresh(Url);
	}
	
	const redirectModal = () => {
		if(marker?.premier && marker?.second)
		{
			let modal = document.querySelector('#ModalNav');
			
			var myModal = new Modal(modal);
			
			myModal.toggle();
		}
		else 
		{
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