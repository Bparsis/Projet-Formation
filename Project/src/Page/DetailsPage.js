import Details from "./../Components/Details/Details";

import { useParams } from "react-router-dom";

const DetailsPage = () => {
	
	let {coords} = useParams();
	coords = coords.split(',');
	
  return (
    <>
      <Details lng={coords[0]} lat={coords[1]}/>
    </>
  )
};

export default DetailsPage;