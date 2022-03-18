import {useState, useEffect} from "react";  //! W.I.P.

export default function useTraduction(str){
	
	const [lang, setLang] = useState("fr");
	
	useEffect(() => {console.log("lang :",lang)},[lang]);
	useEffect(() => {console.log("-----------------")},[lang]);
	
	const trad = (str) => {
		
		let tradDoc = "./../../public/Traduction/trad."+lang+".xml";
		
		console.log(str)
		
		fetch(tradDoc)
			.then((res) => {console.log(res)})
		
		// var xhttp = new XMLHttpRequest();
		// xhttp.onreadystatechange = function() {
			// if (this.readyState == 4 && this.status == 200) {
				// console.log(this.responseType)
				// console.log(this)
				// console.log(this.response)
				// console.log(this.responseURL)
			// }
		// };
		// xhttp.open("GET", tradDoc, true);
		// xhttp.send();
	}
	
	useEffect(()=>{
		trad(str)
	},[str])
	
	return {trad, setLang};
}