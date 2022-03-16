import {useState, useEffect, useContext} from "react";

import useFetch from "./../../Hook/useFetch"

import AddMarker from "./AddMarker"

import {MapContext} from "./Map"

const Search = () => {
	
	const [result, setResult] = useState([])
	
	const {data, error, loading, refresh} = useFetch()
	
	const {map, mapboxgl, marker, setMarker} = useContext(MapContext)
	
	useEffect(()=>{console.log("result :", result)},[result])
	
	useEffect( () => {
		if(data?.features != undefined){
			setResult(data?.features);
		}
	},[data])
	
	const HandleSearch = (value="") => {
		let Url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+value+'.json?limit=5&access_token='+mapboxgl.accessToken;
		refresh(Url);
	}
	
	return (
		<div className="mt-3">
			<div className="search-bar">
				<input type="Text" onChange={(e) => HandleSearch(e.target.value)} className="form-control rounded" placeholder="Chercher une adresse" />
			</div>
			<div className="search-result list-group m-3">
				{result.map((item, key) => {
					return  <button onClick={() => {AddMarker(item.center[0], item.center[1], map, mapboxgl, marker, setMarker)}} className="list-group-item list-group-item-action" key={key}>{item.place_name}</button>
				})}
			</div>
		</div>
	);
}
export default Search;