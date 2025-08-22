import logo from "../../logo.svg";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Menu,
	MenuItem,
	Button,
	Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Login, PersonAdd } from "@mui/icons-material";

export const UserHeader = () => {
	return (
		<header>
			<AppBar position="static">
				<Toolbar sx={{ display: "flex", flex: "1" }}>
					<Typography variant="h6">Realtime-Chat</Typography>
				</Toolbar>
			</AppBar>
		</header>
	);
}
