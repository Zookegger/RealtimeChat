import { GuestHeader as Header } from "./GuestHeader";
import { GuestFooter as Footer } from "./GuestFooter";
import "./GuestLayout.css";
import { Outlet } from "react-router-dom";

export const GuestLayout = ({ children }) => {
	return (
		<div className="layout-container">
			<Header />
			<div className="layout-body">
				<main className="main-content">
                    {/* Render children if provided, otherwise render Outlet for nested routes */}
					{children || <Outlet />}
				</main>
			</div>
			<Footer />
		</div>
	);
};
