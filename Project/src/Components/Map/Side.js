import Steps from "./Steps";
import Info from "./Info";
import Search from "./Search";
import CalcDist from "./CalcDist";
import CalcNav from "./CalcNav";

const Side = () => {

	return (
		<div className="p-2 mt-1 mx-3 rounded position-relative">
			<Steps />
			<Info />
			<Search />
			<div className="input position-absolute bottom-0">
				<CalcNav />
				<CalcDist />
			</div>
		</div>
	);
}
export default Side;