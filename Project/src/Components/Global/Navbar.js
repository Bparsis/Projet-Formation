import { Link } from "react-router-dom";
import {useContext} from "react";

import {AppContext} from "./../../App";

import Form from "./Form";

const Navbar = () => {

	const {user, logged} = useContext(AppContext)

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-success">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Navbar</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="MapPage">Map</Link>
						</li>
						{ logged ?
							<li className="nav-item">
								<Link className="nav-link" to="LogoutPage">LogoutPage</Link>
							</li>
						:
							<li className="nav-item">
								<Link className="nav-link" to="LoginPage">LoginPage</Link>
							</li>
						}
					</ul>
					<h1 className="text-light mx-5">{logged ? user.name : "Deconnecté" }</h1>
					<Form />
				</div>
			</div>
		</nav>
	);
}

export default Navbar;