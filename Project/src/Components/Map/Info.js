import {useContext} from "react";
import {MapContext} from "./Map"

const Info = () => {
	
	const {lng, lat, zoom} = useContext(MapContext)
	
	return (
		<div className="sidebar bg-success text-white px-2 py-1 mx-3 my-2 rounded opacity-75" style={{fontFamily: "monospace"}}>
			Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
		</div>
	);
}
export default Info;