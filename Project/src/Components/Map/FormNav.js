const FormNav = ({calcNav}) => {
	
	const handleSubmit = (e) => {
		e.preventDefault()
		let profile = e.target[0].value;
		calcNav(profile)
	}
	
	return (
		<form className="text-center" onSubmit={handleSubmit}>
			<select className="form-select">
				<option value="driving-traffic">Driving option 1</option>
				<option value="driving">Driving option 2</option>
				<option value="cycling">Cycling</option>
				<option value="walking">Walking</option>
			</select>
			<button type="submit" className="btn btn-success w-100 mt-3" data-bs-dismiss="modal">Submit</button>
		</form>
	);
}
export default FormNav;