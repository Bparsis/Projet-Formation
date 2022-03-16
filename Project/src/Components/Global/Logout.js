import {useContext} from "react";
import { useNavigate } from "react-router-dom";

import {AppContext} from "./../../App";

const Logout = () => {
	
	const {setUser, setLogged} = useContext(AppContext);
	
	const navigate = useNavigate();
	
	const handleLogout = () => {
		setLogged(false);
		setUser({});
		navigate("/")
	}
	
	return (
		<div className="text-center">
			<button className="btn border-2 border-primary rounded m-3" onClick={handleLogout}>Logout</button>
		</div>
	);
}

export default Logout;