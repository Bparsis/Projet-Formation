import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {AppContext} from "./../../App";

import useFetch from "./../../Hook/useFetch";

import {ApiPerso} from "./Data";

const Login = () => {
	
	const {setUser, setLogged} = useContext(AppContext);
	
	const navigate = useNavigate();
	
	const {refresh, data, loading, error} = useFetch();
	
	useEffect(()=>{
		if(data?.validity){
			setLogged(true);
			let User = {UserName: data.UserName, Transport: data.Transport, Address: {Lng: data.Address[0], Lat: data.Address[1]}};
			setUser(User);
			console.log(User.Address)
			navigate("/mapPage");
		}
	},[data])
	
	const handleLogin = (e) => {
		e.preventDefault();
		let valid = true;
		// ↓ Recuperation des parametre ↓
		let Form = document.getElementById("FormLogIn");
	
		let UserId = Form.getElementsByClassName("UserId")[0].value;
		let Password = Form.getElementsByClassName("Password")[0].value;
		
		UserId = UserId.replaceAll(".","{dot}").replaceAll("&","{and}").replaceAll("?", "{question}");
		Password = Password.replaceAll(".","{dot}").replaceAll("&","{and}").replaceAll("?", "{question}");
		
		let Url = ApiPerso+"/LogIn";
		Url += "_UserId="+UserId+"_Password="+Password;
		
		refresh(Url);
	}
	
	return (
		<div className="text-center">
			<form onSubmit={handleLogin} id="FormLogIn">
				<label htmlFor="UserName">
					<input className="form-control w-100 UserId" type="text" name="UserId" placeholder="Nom d'utilisateur, E-mail, Numero de telephone" required/>
				</label>
				<label htmlFor="Password">
					<input className="form-control w-100 mb-1 Password" type="password" name="Password" placeholder="Mot De Passe" required/>
				</label>
				<button className="btn border-2 border-primary rounded m-3" type="submit" >Login</button>
			</form>
		</div>
	);
}

export default Login;