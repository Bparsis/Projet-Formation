import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {AppContext} from "./../../App";

const Signup = () => {
	
	const {setUser, setLogged} = useContext(AppContext);
	
	const navigate = useNavigate();
	
	const handleSignup = (e) => {
		e.preventDefault();
		
		navigate("/");
	}
	
	return (
		<div className="text-center">
			<form onSubmit={handleSignup}>
				
			</form>
		</div>
	);
}

export default Signup;