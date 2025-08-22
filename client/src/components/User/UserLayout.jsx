import { UserHeader as Header } from "./UserHeader";
import { UserFooter as Footer } from "./UserFooter";
import Sidebar from "./UserSidebar";
import "./UserLayout.css";
import { Outlet } from "react-router-dom";

export const UserLayout = ({ children, user }) => {
	return (
		<div className="layout-container">
			{/* <Header /> */}
			<div className="layout-body">
				<Sidebar />
				<main className="main-content">
					{/* Render children if provided, otherwise render Outlet for nested routes */}
					{children || <Outlet />}
				</main>
			</div>
			{/* <Footer /> */}
		</div>
	);
};
