import {useState, useEffect} from "react";

export default function useFetch(Url, Params=null){
	
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);
	
	useEffect(() => {console.log("loading :",loading)},[loading]);
	useEffect(() => {console.log("data :",data)},[data]);
	useEffect(() => {console.log("error :",error)},[error]);
	useEffect(() => {console.log("-----------------")},[loading, data, error]);
	
	const refresh = (Url, Params) => {
		setLoading(true);
		fetch(Url, Params)
			.then((res) => res.json())
			.then((res) => setData(res))
			.catch((error) => {console.log(error);setError(error)})
			.finally((loading) => {setLoading(false)})
	}
	
	useEffect(()=>{
		refresh(Url, Params)
	},[Url, Params])
	
	return {loading, data, error, refresh};
}