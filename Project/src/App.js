import './App.css';
import {useState, createContext, useEffect} from "react";

import Router from './Components/Router';

import 'bootstrap/dist/css/bootstrap.min.css';

const AppContext = createContext();

function App() {
	
	const [logged, setLogged] = useState(false);
	const [user, setUser] = useState({});
	
	useEffect(() => {console.log("logged :",logged)},[logged]);
	useEffect(() => {console.log("user :",user)},[user]);
	useEffect(() => {console.log("-----------------")},[user, logged])
	
	return (
		<AppContext.Provider value={{logged, setLogged, user, setUser}}>
			<Router />
		</AppContext.Provider>
	);
}

export  {App, AppContext};
