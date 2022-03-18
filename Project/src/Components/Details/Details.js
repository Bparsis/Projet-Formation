import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import useFetch from "./../../Hook/useFetch";

import {useEffect, useRef} from "react"

import Loading from "./../Global/Loading";

const Details = ({lng, lat}) => {
	
	let Url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+lat+','+lng+'.json?access_token='+mapboxgl.accessToken;
	
	const {loading, data, error, refresh} = useFetch(Url)
	
	// if (loading) {return <Loading />}
	var firstData = useRef()
	let flag = useRef("geocode");
	
	useEffect(()=>{
		if(data?.features){
			switch (flag.current){
				case "geocode":
					flag.current = "data";
					firstData.current = data.features;
					Url = "https://www.wikidata.org/wiki/Special:EntityData/Q42.json";
					refresh(Url);
				break;
				case "data":
					console.log("tmp");
					console.log(data)
					flag.current = "done";
				break;
			}
		}
	},[data])
	useEffect(() => {console.log("firstData",firstData)},[firstData])
	useEffect(() => {console.log("flag",flag.current)},[flag])
	return (
		<>
			{firstData.current &&
				<>
					<h1>BUGGED Disconect</h1>
					<h1>{firstData.current[0].place_name}</h1>
					<h3>{firstData.current[0].place_type[0]}</h3>
				</>
			}
		</>
	);
}
export default Details;