import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import "./Layout.css";

export default function Layout({ children }) {
	return (
		<div className="layout-container">
			<Header />
            <div className="layout-body">
                <Sidebar />
                <main className="main-content">
                    {children}
                </main>
            </div>
            <Footer />
		</div>
	);
}
