import { UserHeader as Header } from "./UserHeader";
import { UserFooter as Footer } from "./UserFooter";
import Sidebar from "./UserSidebar";
import "./UserLayout.css";
import { Outlet } from "react-router-dom";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Box } from "@mui/material";

export const UserLayout = ({ children, user }) => {
	return (
		<Box className="layout-container">
			{/* <Header /> */}
			<PanelGroup
				className="layout-body"
				direction="horizontal"
				style={{ flex: 1 }}
			>
				<Panel minSize={10} defaultSize={25} order={1}>
					<Sidebar />
				</Panel>
				<PanelResizeHandle
					style={{ width: "0.25rem", backgroundColor: "#000000" }}
				/>
				<Panel order={2} minSize={65}>
					<Box component="main" className="main-content">
						{/* Render children if provided, otherwise render Outlet for nested routes */}
						{children || <Outlet />}
					</Box>
				</Panel>
			</PanelGroup>
			{/* <Footer /> */}
		</Box>
	);
};
