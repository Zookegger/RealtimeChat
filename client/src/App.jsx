import "./App.css";
import { UserLayout } from "./components/User/UserLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Shared/HomePage";
import { NotFound } from "./pages/Shared/NotFound";
import { useState } from "react";
import { GuestLayout } from "./components/Guest/GuestLayout";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/Shared/ProtectedRoute";

const App = () => {
	return (
		<div className="App">
			<Routes>
				{/* Shared routes between the actors */}
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFound />} />
				
				{/* <Route element={<GuestLayout />}>

				</Route>
				<Route element={<UserLayout />}>
				
				</Route> */}
			</Routes>
		</div>
	);
};

export default App;
