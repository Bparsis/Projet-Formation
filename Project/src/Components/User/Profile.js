import React, { useRef, useEffect, useState, useContext, createContext } from 'react';
import { useNavigate } from "react-router-dom";

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import HandleClick from './../Map/Script/HandleClick'
import useFetch from "./../../Hook/useFetch";

import { ApiMapbox, ApiMapboxAcessToken, ApiMapboxStyle, ApiPerso } from "./../Global/Data";

import { AppContext } from "./../../App";

import ModalFavorite from "./ModalFavorite";


const ProfileContext = createContext();

const Profile = () => {
	
	const {user, logged} = useContext(AppContext)
	
	const {data, error, loading, refresh} = useFetch();
	
	const mapContainer = useRef(null);
	const map = useRef(null);
	
	const navigate = useNavigate();
	
	if(!logged){
		navigate("/");
	}
	
	// Definition des ccordonée et niveaux de zoom initial
	const [lng, setLng] = useState(user?.Address?.Lng);
	const [lat, setLat] = useState(user?.Address?.Lat);
	const [zoom, setZoom] = useState(12.00);
	
	const [coord, setCoord] = useState({});
	const [marker, setMarker] = useState({});
	const [Flag, setFlag] = useState("");

	useEffect(() => {
		if(data?.features && Flag == "Click"){ 	// Traitement des donné apres une mise a jour des data de useFetch survenant au onClick
			let address = data?.features[0]?.place_name;
			HandleClick(map.current, coord, address);	// Creation d'un popup a l'emplacement du click
			let coords = coord.lat + ',' + coord.lng;
			// ↓ creation d'un bouton details dans la popup crée (seul et unique dans tout les cas) ↓
			let popupContent = document.querySelector('.mapboxgl-popup').querySelector('.mapboxgl-popup-content');
			popupContent.querySelector('.mapboxgl-popup-button').innerHTML = 
			'<button data-bs-toggle="modal" data-bs-target="#ModalFavorite" class="btn btn-outline-success w-100">Ajouter au favoris </button>';
		}
		else if (data?.features && Flag == "Dist"){
			let GeoJson = data.features[0];
			map.current.addSource('Time', {		// Creation de la souce correspondant a une distance
				'type': 'geojson',
				'data': GeoJson.geometry
			});
			map.current.addLayer({					// Affichage d'un layer polygons correspondant a la source crée
				'id': 'TimeFill',
				'type': 'fill',
				'source': 'Time',
				'layout': {},
				'paint': {							// Definition des propriéte de l'affichage du layer
					'fill-color': GeoJson.properties.fillColor,
					'fill-opacity': GeoJson.properties.fillOpacity,
					'fill-outline-color': GeoJson.properties.fillColor,
				}
			});
			map.current.addLayer({					// Affichage d'un layer Line correspondant a la source crée (bordure)
				'id': 'TimeLine',
				'type': 'line',
				'source': 'Time',
				'layout': {},
				'paint': {							//Deffinition des propriete de l'affichage
					'line-width': 3,
					'line-color': GeoJson.properties.color,
				}
			});
		}
		else if(data?.features && Flag == "Fav"){
			setFlag("Dist");
			let Url = ApiMapbox+"isochrone/v1/mapbox/"+user.Transport+"/"+lng+"%2C"+lat+"?contours_minutes=20&contours_colors=660099&polygons=true&denoise=1&generalize=0&access_token="+mapboxgl.accessToken;
			refresh(Url);
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
				setFlag("Click");
			});
		});	
		map.current.addControl(		// Ajout des controle de la carte (zoom, dezoom, orientation)
			new mapboxgl.NavigationControl(),
		);
		setFlag("Fav");
		let Url = ApiPerso+"/GetFavori_user="+user.UserName;
		refresh(Url);
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
			<ProfileContext.Provider value={{coord}}>
				<ModalFavorite />
				<div ref={mapContainer} className="border border-5 border-success m-5 rounded-3" style={{minHeight: "700px", height: "700px"}} />
			</ProfileContext.Provider>
		</>
	);
}

export default Profile;

export {ProfileContext};