import FormDist from "./../Form/FormDist"

const ModalDist = ({calcDist}) => {
	
	return (
		<div className="modal fade" id="ModalDist" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">Calculer la zone accesible en un temp donnée</h5>
						<button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<FormDist calcDist={calcDist}/>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ModalDist;

// ! Affichage du form de parametrage
// * Meilleur titre a trouver