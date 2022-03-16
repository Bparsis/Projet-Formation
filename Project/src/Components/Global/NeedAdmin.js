import {useLocation, Navigate} from "react-router-dom";
import {useContext} from "react";

import {AppContext} from "./../../App";

export default function NeedAuth({children}){
	
	const {user} = useContext(AppContext);
	
	let location = useLocation();
	
	if( user?.role == 'admin' ){
		return children
	} else {
		return <Navigate to="/FilterableProductTablePage" state={{from: location}} />
	}
	
}