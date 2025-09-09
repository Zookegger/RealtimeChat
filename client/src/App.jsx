import "./App.css";
import { UserLayout } from "./components/User/UserLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Shared/HomePage";
import { NotFound } from "./pages/Shared/NotFound";
import { useState } from "react";
import { GuestLayout } from "./components/Guest/GuestLayout";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/Shared/ProtectedRoute";
import { PrivacyPolicy } from "./pages/Shared/PrivacyPolicy";
import { About } from "./pages/Shared/About";
import { Login } from "./pages/Guest/Login";
import { Register } from "./pages/Guest/Register";
import { EnvDebugger } from "./pages/Shared/EnvDebugger";

const App = () => {
	return (
		<div className="App">
			<Routes>
				{/* Shared routes between the actors */}
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFound />} />

				{/* Guest's Routes */}
				<Route element={<GuestLayout />}>
					<Route path="/privacy" element={<PrivacyPolicy />} />
					<Route path="/about" element={<About />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/env-debug" element={<EnvDebugger />} />
				</Route>

				{/* User's Routes */}
				<Route element={<UserLayout />}>
					<Route path="/setting" />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
