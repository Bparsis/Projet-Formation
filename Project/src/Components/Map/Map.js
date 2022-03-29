import React, { useRef, useEffect, useState, createContext } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import HandleClick from './Script/HandleClick'
import useFetch from "./../../Hook/useFetch";

import { ApiMapbox, ApiMapboxAcessToken, ApiMapboxStyle } from "./../Global/Data";

import Print from "./Print";
import Side from "./Side";
import ModalDetails from "./../Details/ModalDetails";

mapboxgl.accessToken = ApiMapboxAcessToken;

const MapContext = createContext();

const Map = () => {
	
	const {data, error, loading, refresh} = useFetch();
	
	const mapContainer = useRef(null);
	const map = useRef(null);
	
	// Definition des ccordonée et niveaux de zoom initial
	const [lng, setLng] = useState(3.3442);
	const [lat, setLat] = useState(49.3562);
	const [zoom, setZoom] = useState(12.00);
	
	const [coord, setCoord] = useState({});
	const [marker, setMarker] = useState({});
	const [steps, setSteps] = useState([]);
	

	useEffect(() => {
		if(data?.features){ 	// Traitement des donné apres une mise a jour des data de useFetch survenant au onClick
			let address = data?.features[0]?.place_name;
			HandleClick(map.current, coord, address);	// Creation d'un popup a l'emplacement du click
			let coords = coord.lat + ',' + coord.lng;
			// ↓ creation d'un bouton details dans la popup crée (seul et unique dans tout les cas) ↓
			let popupContent = document.querySelector('.mapboxgl-popup').querySelector('.mapboxgl-popup-content');
			// popupContent.querySelector('.mapboxgl-popup-button').innerHTML = '<a href="DetailsPage' + coords + '"><button class="btn btn-outline-warning w-100" >Detail</button></a>';
			// popupContent.querySelector('.mapboxgl-popup-button').innerHTML = '<script>function tmp(){console.log("tmp")}</script><button class="btn btn-outline-warning w-100" onclick="tmp()">Detail</button>';
			popupContent.querySelector('.mapboxgl-popup-button').innerHTML = '<button data-bs-toggle="modal" data-bs-target="#ModalDetails" class="btn btn-outline-success w-100">Details</button>';
		}
	},[data])
	
	useEffect(() => { 				// Creation de la carte
		map.current = new mapboxgl.Map({
			container: mapContainer.current,	// Definition du container
			style: ApiMapboxStyle, // Definition du style de la carte
			center: [lng, lat], 	// Definition des coordonée
			zoom: zoom				// Definition du zoom 
		});
		map.current.on('style.load', function() { 	//	Creation de la fonction on click aux chargement du style
			map.current.on('click', (e) => {
				setCoord({lat: e.lngLat.lat, lng: e.lngLat.lng, point: e.point})
				let Url = ApiMapbox+'geocoding/v5/mapbox.places/'+e.lngLat.lng+','+e.lngLat.lat+'.json?access_token='+mapboxgl.accessToken;
				refresh(Url);
			});
		});	
		map.current.addControl(		// Ajout des controle de la carte (zoom, dezoom, orientation)
			new mapboxgl.NavigationControl(),
		);
	},[]);
		
	useEffect(() => {				// redefini les state liée aux coordonée et zomm a chaque mouvement de la carte
		if (!map.current) return; 	// wait for map to initialize
		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
	});
	
	return (
		<>
			<ModalDetails />
			<div className="d-flex">
				<MapContext.Provider value={{lng, lat, zoom, map, mapboxgl, marker, setMarker, steps, setSteps}} >
					<Side />
					<Print ref={mapContainer} />
				</MapContext.Provider >
			</div>
		</>
	);
}
export {Map, MapContext};

// ! Creation de la carte