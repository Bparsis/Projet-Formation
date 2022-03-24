import {useState, useEffect} from "react";

import useFetch from "./useFetch";

import { ApiMapbox, ApiMapboxAcessToken } from "./../Components/Global/Data";

export default function useForwardGeoCoding(Text){
	
	const {loading, error, data, refresh} = useFetch();
	
	const [coordsObject, setCoordsObject] = useState({});
	
	const FGeoCode = (Text) => {
		let Url = ApiMapbox+'geocoding/v5/mapbox.places/'+Text+'.json?access_token='+ApiMapboxAcessToken;
		refresh(Url);
	}
	
	useEffect(()=>{
		FGeoCode(Text)
	},[Text])
	
	useEffect(()=>{
		// data?.features?.map(feature => {console.table(feature)})
		if (data?.features == []){
			return
		}
		setCoordsObject(data);
	},[data])
	
	return {coordsObject, FGeoCode};
}

// ! Hook personaliser de forward geocoding
// ? address => coords