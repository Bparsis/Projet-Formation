import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {AppContext} from "./../../App";

const Login = () => {
	
	const {setUser, setLogged} = useContext(AppContext);
	
	const navigate = useNavigate();
	
	const handleLogin = (e) => {
		e.preventDefault();
		let User = e.target[0].value;
		setLogged(true);
		if(User == "User"){
			setUser({name: "User", role: "user"});
		} else if (User == "Admin") {
			setUser({name: "Admin", role: "admin"});
		}
		navigate("/");
	}
	
	return (
		<div className="text-center">
			<form onSubmit={handleLogin}>
			<select>
				<option value="User">User</option>
				<option value="Admin">Admin</option>
			</select>
			<button className="btn border-2 border-primary rounded m-3" type="submit" >Login</button>
			</form>
		</div>
	);
}

export default Login;