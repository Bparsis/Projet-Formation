import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {AppContext} from "./../../App";

import useFetch from "./../../Hook/useFetch";
import useForwardGeoCoding from "./../../Hook/useForwardGeoCoding";

import {ApiPerso} from "./Data";

const Signup = () => {
	
	const {coordsObject, FGeoCode} = useForwardGeoCoding("France");
	
	const [cPasswordError, setCPasswordError] = useState();
	
	const {refresh, data, loading, error} = useFetch();
	
	const {setUser, setLogged} = useContext(AppContext);
	
	const navigate = useNavigate();
	
	useEffect(()=>{
		if(!data?.error && data?.error != undefined){
			setLogged(true);
			let User = {UserName: data.UserName, Transport: data.Transport, Address: {Lng: data.Address[0], Lat: data.Address[1]}};
			setUser(User);
			navigate("/mapPage");
		}
	},[data])
	
	const handleCPassword = () => {		// Fonction de affichage des password non-identique
		
		let password = document.getElementsByName("Password")[0];
		let Cpassword = document.getElementsByName("Cpassword")[0];
		
		if (Cpassword?.value != password?.value){
			setCPasswordError("Vos mot de passe ne corresponde pas");
		} else setCPasswordError("");
	}
	
	const handleAddress = (value) => {
		console.log(value);
		FGeoCode(value);
	}
	
	const handleSignup = (e) => {		// Passage des parametre a l'API Perso (symfony)		
		e.preventDefault();
		let valid = true;
		// ↓ Recuperation des parametre ↓
		let Form = document.getElementById("FormSignUp");
	
		let mail = Form.getElementsByClassName("Mail")[0].value;
		let phone = Form.getElementsByClassName("Phone")[0].value;
		let address = Form.getElementsByClassName("Address")[0].value;
		let userName = Form.getElementsByClassName("UserName")[0].value;
		let password = Form.getElementsByClassName("Password")[0].value;
		let cpassword = Form.getElementsByClassName("Cpassword")[0].value;
		let transport = Form.getElementsByClassName("Transport")[0].value;
			
		
		let regexPassword = /^[\w@\"'-]{9,50}$/;
		let regexUserName = /^[\w "'-]{1,50}$/u;
		let regexPhoneNumber = /^(0|\+33)([\d]{9})$/; 

		if(!regexPassword.test(password)){
			valid = false;
		}

		if(!regexUserName.test(userName)){
			valid = false;
		}

		if(!regexPhoneNumber.test(phone) && phone != ""){
			valid = false;
		}
		
		if (password != cpassword){		// Si password non-identique
			return
		}

		if (valid) {
			// ↓ remplacement des . en {dot} car problematique lors des fetch ! Egalement problematique & ? W.I.P ↓
			mail = mail.replaceAll(".","{dot}").replaceAll("&","{and}").replaceAll("?", "{question}");
			phone = phone.replaceAll(".","{dot}").replaceAll("&","{and}").replaceAll("?", "{question}");
			userName = userName.replaceAll(".","{dot}").replaceAll("&","{and}").replaceAll("?", "{question}");
			password = password.replaceAll(".","{dot}").replaceAll("&","{and}").replaceAll("?", "{question}");
			transport = transport.replaceAll(".","{dot}").replaceAll("&","{and}").replaceAll("?", "{question}");
			address = address?.replaceAll(".","{dot}")?.replaceAll("&","{and}")?.replaceAll("?", "{question}");

			var Url = ApiPerso+"/SignUp";
			Url += "_userName="+userName+"_password="+password+"_mail="+mail+"_phone="+phone+"_transport="+transport+"_address="+address;
		
			refresh(Url);
		} else {
			console.log("error");
			return;
		}	
	}
	
	return (
		<div className="text-center">
			<form onSubmit={handleSignup} id="FormSignUp">
				<fieldset className="m-3">
					<label htmlFor="UserName">
						<input className="form-control w-100 UserName" type="text" name="UserName" placeholder="Nom d'utilisateur"/>
					</label>
				</fieldset>
				<fieldset className="m-3">
					<label htmlFor="Password">
						<input className="form-control w-100 mb-1 Password" type="password" name="Password" placeholder="Mot De Passe" onChange={handleCPassword} required/>
					</label>
					<br/>
					<label htmlFor="Cpassword">
						<input className="form-control Cpassword" type="password" name="Cpassword" placeholder="Confirmation du Mot De Passe" onChange={handleCPassword} required/>
						{cPasswordError && 
							<div id="CpasswordError" className="form-text text-warning">{cPasswordError}</div>
						}
					</label>
				</fieldset>
				<fieldset className="m-3">
					<label htmlFor="coords">
						<input onChange={(e) => handleAddress(e.target.value)} className="form-control w-100 coords" type="text" name="coords" placeholder="1 rue de l'impro" required/>
					</label>
					<br />
						{ coordsObject.features?.length != 0 &&
							<label htmlFor="Address">
								<select className="form-select mt-3 Address" name="Address">
									{coordsObject?.features?.map((feature, i) => 
										<option key={i} value={feature.center[0]+","+feature.center[1]}>{feature.place_name}</option>
									)}
								</select>
							</label>
						}
				</fieldset>
				<fieldset className="m-3">
					<label htmlFor="Mail">
						<input className="form-control w-100 mb-1 Mail" type="text" name="Mail" placeholder="Mail"/>
					</label>
					<br/>
					<label htmlFor="Phone">
						<input className="form-control w-100 Phone" type="text" name="Phone" placeholder="Numero de Telephone"/>
					</label>
				</fieldset>
				<fieldset className="m-3">
					<label htmlFor="Transport">
						<select className="form-select Transport" name="Transport">
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

// ! Gestion du signUp coter front