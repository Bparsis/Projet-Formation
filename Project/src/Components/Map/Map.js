import React, { useRef, useEffect, useState, createContext } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import HandleClick from './Script/HandleClick'
import useFetch from "./../../Hook/useFetch";

import Print from "./Print";
import Side from "./Side";

mapboxgl.accessToken = 'pk.eyJ1IjoiYnBhcnNpcyIsImEiOiJja3ppOHdqenQwNWNxMm5wZjFmNWlha3NoIn0.TJ-XvIJUv54a7nnHsFy1CA';

const MapContext = createContext();

const Map = () => {
	
	const {data, error, loading, refresh} = useFetch();
	
	const mapContainer = useRef(null);
	const map = useRef(null);
	
	const [lng, setLng] = useState(3.3442);
	const [lat, setLat] = useState(49.3562);
	const [zoom, setZoom] = useState(12.00);
	
	// const [lng, setLng] = useState(-87);
	// const [lat, setLat] = useState(37);
	// const [zoom, setZoom] = useState(3);
	
	const [coord, setCoord] = useState({});
	const [marker, setMarker] = useState({});
	const [steps, setSteps] = useState([]);
	

	useEffect(() => {
		if(data?.features){
			let address = data?.features[0]?.place_name;
			console.log(data.features)
			HandleClick(map.current, coord, address);
			let coords = coord.lat + ',' + coord.lng;
			let popupContent = document.querySelector('.mapboxgl-popup').querySelector('.mapboxgl-popup-content');
			popupContent.querySelector('.mapboxgl-popup-button').innerHTML = '<a href="DetailsPage' + coords + '"><button class="btn btn-outline-warning w-100" >Detail</button></a>';
		}
	},[data])
	
	useEffect(() => {
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/bparsis/ckzirj4se000l14qwpms2wcfh/draft',
			center: [lng, lat],
			zoom: zoom
		});
		map.current.on('style.load', function() {
			map.current.on('click', (e) => {
				setCoord({lat: e.lngLat.lat, lng: e.lngLat.lng, point: e.point})
				let Url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+e.lngLat.lng+','+e.lngLat.lat+'.json?access_token='+mapboxgl.accessToken;
				refresh(Url);
			});
		});	
		map.current.addControl(
			new mapboxgl.NavigationControl(),
		);
	},[]);
		
	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
	});
	
	return (
		<div className="d-flex">
			<MapContext.Provider value={{lng, lat, zoom, map, mapboxgl, marker, setMarker, steps, setSteps}} >
				<Side />
				<Print ref={mapContainer} />
			</MapContext.Provider >
		</div>
	);
}
export {Map, MapContext};