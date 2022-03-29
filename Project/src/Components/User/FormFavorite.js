import {useContext} from "react";

import useFetch from "./../../Hook/useFetch";

import {ProfileContext} from "./Profile";
import {AppContext} from "./../../App";

import {ApiPerso} from "./../Global/Data";

const FormFavorite = () => {
	
	const {data, error, loading, refresh} = useFetch();
		
	const {coord} = useContext(ProfileContext);
	const {user} = useContext(AppContext);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		
		let lat = coord.lat.toString().replaceAll(".","{dot}");
		let lng = coord.lng.toString().replaceAll(".","{dot}");
		
		let form = document.querySelector("#favorite");
		let Color = form.querySelector('#color').value.substr(-6);
		let Titre = form.querySelector('#titre').value;
		let Desc = form.querySelector('#desc').value;
		
		let Url = ApiPerso+"/AddFavorite";
		Url += "_Lat="+lat+"_Lng="+lng+"_Color="+Color+"_Titre="+Titre+"_Desc="+Desc+"_User="+user.UserName;
		
		refresh(Url);
		
		console.table(user);
	}
	
	return (
		<form id="favorite" className="text-center" onSubmit={handleSubmit}>
			<input id="titre" type="text" placeholder="Titre" className="form-control mb-3" /> 
			<textarea id="desc" placeholder="Description" className="form-control mb-3" />
			<input id="color" type="color" className="form-control form-control-color w-100 mb-3" defaultValue="#3A0057" />
			<button type="submit" className="btn btn-success w-100" data-bs-dismiss="modal">Submit</button>
		</form>
	);
}
export default FormFavorite;
