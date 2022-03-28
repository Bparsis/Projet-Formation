import {useContext} from "react";
import {MapContext} from "./Map";

const Steps = () => {
	
	const {steps} = useContext(MapContext)
	
	return (
		<>
			{steps.length > 0 && 
				<div className="sidebar text-white px-2 py-1 mx-3 my-2 rounded opacity-75" style={{fontFamily: "monospace", backgroundColor: "var(--bs-teal)"}}>
					<ol>
						{steps.map((step, key) => {
							return <li key={key}>{step.maneuver.instruction}</li>
						})}
					</ol>
				</div>
			}
		</>
	);
}
export default Steps;

// affichage des etape pour la conduite Bug d'affichage