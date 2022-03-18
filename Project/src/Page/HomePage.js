import useTraduction from "./../Hook/useTraduction";

const Home = () => {
	
	const {trad} = useTraduction("test");

	
	return (
		<>
			<h1>Bienvenue!</h1>
		</>
	)
};

export default Home;