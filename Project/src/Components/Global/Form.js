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