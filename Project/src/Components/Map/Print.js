import {forwardRef} from "react";

const Print = forwardRef((props, mapContainer) => (
	
	<div ref={mapContainer} className="border border-5 border-success m-5 rounded-3" style={{width: "100%", minHeight: "700px", height: "700px"}} />

));
export default Print;