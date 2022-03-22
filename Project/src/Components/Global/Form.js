import { useNavigate } from "react-router-dom";

const Form = () => {
	const navigate = useNavigate();
	
	const handleSubmit = (e) => {
		e.preventDefault();
		let target = e.target.firstChild.value;
		navigate(target);
	}
	
	return (
		<form className="d-flex" onSubmit={handleSubmit}>
			<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
			<button className="btn btn-outline-success" type="submit">Search</button>
		</form>
	);
}

export default Form;

// ! bare de recherche de la nav bar permettent de naviquer aux url saissie
// ? W.I.P. elargie les recherche faite pour eviter l'exactitude