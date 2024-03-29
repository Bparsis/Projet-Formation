import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import LayoutPage from "./../Page/LayoutPage";
import HomePage from "./../Page/HomePage";
import NotPage from "./../Page/NotPage";
import LoginPage from "./../Page/LoginPage";
import LogoutPage from "./../Page/LogoutPage";
import SignupPage from "./../Page/SignupPage";

import NeedAdmin from "./Global/NeedAdmin";

import MapPage from "./../Page/MapPage";
import ProfilePage from "./../Page/ProfilePage";

const Router = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LayoutPage />}>
					<Route index element={<HomePage />} />
					<Route path="MapPage" element={<MapPage />} />
					<Route path="LoginPage" element={<LoginPage />} />
					<Route path="SignupPage" element={<SignupPage />} />
					<Route path="LogoutPage" element={<LogoutPage />} />
					<Route path="ProfilePage" element={<ProfilePage />} />
					<Route path="*" element={<NotPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;