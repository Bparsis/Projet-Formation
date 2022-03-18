import {useContext, useEffect} from "react";

import {MapContext} from "./../Map";

import useFetch from "./../../../Hook/useFetch";

import ModalDist from "./../Modal/ModalDist";

const CalcDist = () => {
	
	const {data, error, loading, refresh} = useFetch()
	
	const {map, lng, lat, mapboxgl, marker} = useContext(MapContext)
	
	useEffect(() => {
		if (data?.features != undefined){
			
			if (map.current.getSource('Time0') && map.current.getSource('Time1') && map.current.getSource('Time2') && map.current.getSource('Time3') ){
				for(let i = 1; i < 4; i++){
					map.current.removeLayer('TimeFill'+i)
					map.current.removeLayer('TimeLine'+i)
					map.current.removeSource('Time'+i)
				}
			}
			if (map.current.getSource('Time0')){
				map.current.removeLayer('TimeFill0')
				map.current.removeLayer('TimeLine0')
				map.current.removeSource('Time0')
			}
			
			data.features.map((feature, key) => {
				
				if (map.current.getSource('Time'+key)){
					map.current.getSource('Time'+key).setData(feature.geometry);	
				} else {
					map.current.addSource('Time'+key, {
						'type': 'geojson',
						'data': feature.geometry
					});
					map.current.addLayer({
						'id': 'TimeFill'+key,
						'type': 'fill',
						'source': 'Time'+key,
						'layout': {},
						'paint': {
							'fill-color': feature.properties.fillColor,
							'fill-opacity': feature.properties.fillOpacity,
							'fill-outline-color': feature.properties.fillColor,
						}
					});
					map.current.addLayer({
						'id': 'TimeLine'+key,
						'type': 'line',
						'source': 'Time'+key,
						'layout': {},
						'paint': {
							'line-width': 5,
							'line-color': feature.properties.color,
						}
					});
					console.log('TimeLine'+key);
					console.log('TimeFill'+key);
					console.log('Time'+key);
					console.log(map.current)
				}
			})
		}
	},[data])
	
	const calcDist = (profile = "driving", time = "15") => {
		
		let color = "";
		if(time.length<=2) color = "&contours_colors=00FF00"
		
		let Url = "https://api.mapbox.com/isochrone/v1/mapbox/"+profile+"/"+lng+"%2C"+lat+"?contours_minutes="+time+"&polygons=true"+color+"&denoise=1&generalize=0&access_token="+mapboxgl.accessToken;

		if(marker?.second)
		{
			let Lng = marker.second._lngLat.lng;
			let Lat = marker.second._lngLat.lat;
			Url = "https://api.mapbox.com/isochrone/v1/mapbox/"+profile+"/"+Lng+"%2C"+Lat+"?contours_minutes="+time+"&polygons=true"+color+"&denoise=1&generalize=0&access_token="+mapboxgl.accessToken;
		} 
		else if (marker?.premier)
		{
			let Lng = marker.premier._lngLat.lng;
			let Lat = marker.premier._lngLat.lat;
			Url = "https://api.mapbox.com/isochrone/v1/mapbox/"+profile+"/"+Lng+"%2C"+Lat+"?contours_minutes="+time+"&polygons=true"+color+"&denoise=1&generalize=0&access_token="+mapboxgl.accessToken;

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