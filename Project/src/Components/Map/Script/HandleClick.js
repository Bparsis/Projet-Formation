import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {ReverseGeocoding} from './GeoCoding'	
const HandleClick = (map, coord, address) => {

	var features = map.queryRenderedFeatures(coord.point, {  // Definition+(recuperation des infos) des layer "cliquable"
		layers: ['poi-label', 'transit-label', 'natural-point-label', 'data-driven-lines',  'building-number-label', 'water', 'land',  'landuse']
	});
	let lat = coord.lat.toFixed(4);	// limitation des coordonée affiché a 4 chiffre apres la virgules
	let lng = coord.lng.toFixed(4);	// limitation des coordonée affiché a 4 chiffre apres la virgules
	let lnglat = {lng: coord.lng, lat: coord.lat}
	if (!features[0])	// si on ne possede pas des information
	{
		new mapboxgl.Popup()	// affichage d'une Popup sans info
			.setLngLat(lnglat)
			.setHTML('<h1>Nothing here</h1><h2>'+address+'</h2><div class="mapboxgl-popup-button"></div>')
			.addTo(map);
	}else{
		switch (features[0].layer.id){	// Crée les Popup avec les infos que l'on possede
			case 'poi-label':
				new mapboxgl.Popup()
					.setLngLat(lnglat)
					.setHTML('<h1>' + features[0].properties.name+'</h1><h2>'+address+'</h2><div class="mapboxgl-popup-button"></div>')
					.addTo(map);
			break;
			case 'transit-label':
				new mapboxgl.Popup()
					.setLngLat(lnglat)
					.setHTML('<h1>' + features[0].properties.name+'</h1><h2>'+address+'</h2><div class="mapboxgl-popup-button"></div>')
					.addTo(map);
			break;
			case 'natural-point-label':
				new mapboxgl.Popup()
					.setLngLat(lnglat)
					.setHTML('<h1>' + features[0].properties.name+'</h1><h2>'+address+'</h2><div class="mapboxgl-popup-button"></div>')
					.addTo(map);
			break;
			case 'data-driven-lines':
				new mapboxgl.Popup()
					.setLngLat(lnglat)
					.setHTML('<h1>' + features[0].properties.congestion+'</h1><h2>'+address+'</h2><div class="mapboxgl-popup-button"></div>')
					.addTo(map);
			break;
			case 'building-number-label':
				new mapboxgl.Popup()
					.setLngLat(lnglat)
					.setHTML('<h1>'+address+'</h1><div class="mapboxgl-popup-button"></div>')
					.addTo(map);
			break;
			case 'water':
				new mapboxgl.Popup()
					.setLngLat(lnglat)
					.setHTML('<h1>' + features[0].sourceLayer+'</h1><h2>'+address+'</h2><div class="mapboxgl-popup-button"></div>')
					.addTo(map);
			break;
			case 'land':
				new mapboxgl.Popup()
					.setLngLat(lnglat)
					.setHTML('<h1>' + features[0].properties+'</h1><h2>'+address+'</h2><div class="mapboxgl-popup-button"></div>')
					.addTo(map);
			break;
			case 'landuse':
				new mapboxgl.Popup()
					.setLngLat(lnglat)
					.setHTML('<h1>' + features[0].properties.type+'</h1><h2>'+address+'</h2><div class="mapboxgl-popup-button"></div>')
					.addTo(map);
			break;
		}
	}
}

export default HandleClick

// ! Gestion des click sur la map