import FormFavorite from "./FormFavorite";

const ModalFavorite = () => {
	return (
		<div className="modal fade" id="ModalFavorite" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">Ajouter aux favoris</h5>
						<button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<FormFavorite />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalFavorite;