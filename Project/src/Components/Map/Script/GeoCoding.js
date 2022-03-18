import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import useState from "react";
import useFetch from "./../../../Hook/useFetch";

import useEffect from "react"



const ReverseGeocoding = (x, y, accessToken) => {
	
	let Url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+x+','+y+'.json?access_token='+accessToken;
	let value
	
    fetch(Url)
		.then(res => res.json())
		.then(json => json.features)
		.then(data => value = data)
		
	console.log("test");
	console.log(value);
}




const ForwardGeocoding = (shearchtext, accessToken) => {
	
	let Url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+shearchtext+'.json?limit=10&access_token='+accessToken;
	
	const {loading, data, error, refresh} = useFetch(Url);
	
	console.log(data);
	
	return {data};
}

export {ReverseGeocoding, ForwardGeocoding}