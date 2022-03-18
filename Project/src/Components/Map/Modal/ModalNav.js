import FormNav from "./../Form/FormNav"

const ModalNav = ({calcNav}) => {
	
	return (
		<div className="modal fade" id="ModalNav" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
						<button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<FormNav calcNav={calcNav}/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ModalNav;