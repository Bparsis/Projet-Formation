const Loading = () => {
	
	return (
		<div className="d-flex m-5">
			<h2 className="text-warning me-4">Loading</h2>
			<div className="spinner-border text-warning">
				<div className="spinner-border text-warning">
					<div className="spinner-border text-warning">
						<div className="spinner-border text-warning">
							<div className="spinner-grow text-warning">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Loading;

// ! composant loading pour un retour le temps de communication avec le API