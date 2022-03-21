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
	
	const handleCPassword = () => {
		
		let password = document.getElementsByName("Password")[0];
		let Cpassword = document.getElementsByName("Cpassword")[0];
		
		// console.log(Cpassword, password)
		// console.log(Cpassword?.value, password?.value, Cpassword?.value != password?.value)
		
		if (Cpassword?.value != password?.value){
			setCPasswordError("Vos mot de passe ne corresponde pas");
		} else setCPasswordError("");
	}
	
	// const DATA = {tmp: "tmp", test: "test"}
	// const DATA = {tmp: "tmp"}
	// const DATA = {}
	const handleSignup = (e) => {
		
		//getValue
		
		var Url = ApiPerso+"/SignUp";
		e.preventDefault();
		
		let userName = e.target[1].value;
		let password = e.target[3].value;
		let cpassword = e.target[4].value;
		let mail = e.target[8].value;
		let phone = e.target[9].value;
		let transport = e.target[11].value;
		
		if (password != cpassword){
			return
		}
		
		Url += "/userName="+userName+"/password="+password+"/mail="+mail+"/phone="+phone+"/transport="+transport;
		
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
						<input className="form-control w-100" type="password" name="Password" placeholder="Mot De Passe" onChange={handleCPassword} required/>
					</label>
					<br/>
					<label htmlFor="Cpassword">
						<input className="form-control" type="password" name="Cpassword" placeholder="Confirmation du Mot De Passe" onChange={handleCPassword} required/>
						{cPasswordError && 
							<div id="CpasswordError" className="form-text text-warning">{cPasswordError}</div>
						}
					</label>
				</fieldset>
				<fieldset className="m-3">
					<label htmlFor="coords">
						<input className="form-control w-100" type="text" name="coords" placeholder="1 rue de l'impro" />
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