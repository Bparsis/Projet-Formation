import {useState, useEffect} from "react";

import useFetch from "./useFetch";

import { ApiMapbox, ApiMapboxAcessToken } from "./../Components/Global/Data";

export default function useReverseGeoCoding(Lng, Lat){
	
	const {loading, error, data, refresh} = useFetch();
	
	const [addressObject, setAddressObject] = useState({});
	
	const RGeoCode = (Lng, Lat) => {
		let Url = ApiMapbox + "geocoding/v5/mapbox.places/" + Lng + "," + Lat + ".json?access_token=" + ApiMapboxAcessToken;
		refresh(Url);
	}
	
	useEffect(()=>{
		RGeoCode(Lng, Lat)
	},[Lng, Lat])
	
	useEffect(()=>{
		// data?.features?.map(feature => {console.table(feature)})
		setAddressObject(data);
	},[data])
	
	return {addressObject, RGeoCode};
}

// ! Hook personaliser de reverse geocoding
// ? coords => address