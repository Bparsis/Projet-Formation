import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {AppContext} from "./../../App";

import useFetch from "./../../Hook/useFetch";

import {ApiPerso} from "./Data";

const Signup = () => {
	
	const [cPasswordError, setCPasswordError] = useState();
	
	const {refresh, data, loading, error} = useFetch();
	
	const {setUser, setLogged} = useContext(AppContext);
	
	const navigate = useNavigate();
	
	const handleCPassword = (value) => {
		let password = document.getElementsByName("Password");
		if (value != password.value){
			setCPasswordError("Vos mot de passe ne corresponde pas");
		}
	}
	
	// const DATA = {tmp: "tmp", test: "test"}
	// const DATA = {tmp: "tmp"}
	// const DATA = {}
	const handleSignup = (e) => {
		
		//getValue
		
		const Url = ApiPerso+"/SignUp&tmp=tmp&test=test";
		e.preventDefault();
		// for(let i in DATA){
			// Url.searchParams.append(i, DATA[i]);
		// };
		console.log(Url);
		refresh(Url);
		
		// navigate("/");
		
	}
	
	return (
		<div className="text-center">
			<form onSubmit={handleSignup}>
				<fieldset className="m-3">
					<label htmlFor="UserName">
						<input className="form-control w-100 " type="text" name="UserName" placeholder="Nom d'utilisateur"/>
					</label>
				</fieldset>
				<fieldset className="m-3">
					<label htmlFor="Password">
						<input className="form-control w-100" type="password" name="Password" placeholder="Mot De Passe"/>
					</label>
					<br/>
					<label htmlFor="Cpassword">
						<input className="form-control" type="password" name="Cpassword" placeholder="Confirmation du Mot De Passe" onChange={(e)=>{handleCPassword(e.target.value)}}/>
						{cPasswordError && 
							<div id="CpasswordError" className="form-text text-warning">{cPasswordError}</div>
						}
					</label>
				</fieldset>
				<fieldset className="m-3">
					<label htmlFor="Mail">
						<input className="form-control w-100" type="text" name="Mail" placeholder="Mail"/>
					</label>
					<br/>
					<label htmlFor="Phone">
						<input className="form-control w-100" type="text" name="Phone" placeholder="Numero de Telephone"/>
					</label>
				</fieldset>
				<fieldset className="m-3">
					<label htmlFor="Transport">
						<select className="form-select" name="Transport">
							<option value="driving">Driving</option>
							<option value="cycling">Cycling</option>
							<option value="walking">Walking</option>
						</select>
					</label>
				</fieldset>
				<fieldset className="m-3">
					<input className="btn btn-outline-primary " type="submit"/>
				</fieldset>
			</form>
		</div>
	);
}

export default Signup;