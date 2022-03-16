const AddMarker = (x, y, map, mapboxgl, marker, setMarker) => {
	
	if (marker?.premier == undefined)
	{
		let marker1 = new mapboxgl
			.Marker({
				color: "#00FF00",
			})
			.setLngLat([x,y])
			.addTo(map.current);
		
		let NewMarker = {"premier": marker1};
		
		setMarker({...marker, ...NewMarker})
	}
	else if(marker?.second == undefined)
	{
		let marker2 = new mapboxgl
			.Marker({
				color: "#00FF00",
			})
			.setLngLat([x,y])
			.addTo(map.current);
			
		let NewMarker = {"second": marker2};
		
		setMarker({...marker, ...NewMarker})
	}
	else 
	{	
		marker.premier.remove();
		let marker1 = marker.second;
		let marker2 = new mapboxgl
			.Marker({
				color: "#00FF00",
			})
			.setLngLat([x,y])
			.addTo(map.current);
			
		let NewMarker = {"premier": marker1, "second": marker2};
		
		setMarker({...marker, ...NewMarker})
	}

	map.current.flyTo({
		center: [x,y],
		essential: true,
	});
}

export default AddMarker