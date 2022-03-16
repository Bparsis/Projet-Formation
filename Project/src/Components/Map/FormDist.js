const FormDist = ({calcDist}) => {
	
	const handleSubmit = (e) => {
		e.preventDefault()
		let profile = e.target[0].value;
		let time = e.target[1].value;
		calcDist(profile, time)
	}
	
	return (
		<form className="text-center" onSubmit={handleSubmit}>
			<select className="form-select">
				<option value="driving">Driving</option>
				<option value="cycling">Cycling</option>
				<option value="walking">Walking</option>
			</select>
			<select className="form-select mt-3">
				<option value="05">05 min</option>
				<option value="10">10 min</option>
				<option value="15">15 min</option>
				<option value="20">20 min</option>
				<option value="25">25 min</option>
				<option value="30">30 min</option>
				<option value="35">35 min</option>
				<option value="40">40 min</option>
				<option value="45">45 min</option>
				<option value="50">50 min</option>
				<option value="55">55 min</option>
				<option value="60">60 min</option>
				<option disabled></option>
				<option value="05%2C10%2C15%2C20">05 min increment ( 05 / 10 / 15 / 20 )</option>
				<option value="10%2C20%2C30%2C40">10 min increment ( 10 / 20 / 30 / 40 )</option>
				<option value="15%2C30%2C45%2C60">15 min increment ( 15 / 30 / 45 / 60 )</option>
			</select>
			<button type="submit" className="btn btn-success w-100 mt-3" data-bs-dismiss="modal">Submit</button>
		</form>
	);
}
export default FormDist;