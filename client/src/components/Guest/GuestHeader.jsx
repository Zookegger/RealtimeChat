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
import { Link } from "react-router-dom";

export const GuestHeader = () => {
	return (
		<Box component="header" sx={{ minHeight: "64px !important" }}>
			<AppBar position="static">
				<Toolbar sx={{ display: "flex", minHeight: "64px !important" }}>
					<IconButton
						color="inherit"
						sx={{ display: { md: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{
							textAlign: { xs: "center", sm: "center", md: "start" },
							flexGrow: { xs: 1, sm: 1, md: 0 },
							marginRight: { md: 4, xl: 4, xxl: 4 }
						}}
					>
						Realtime-Chat
					</Typography>
					
					<Box sx={{ display: { xs: "none", sm: "none", md: "flex" }, flexGrow: { xs: 0, sm: 0, md: 1 }, gap: 2 }} color="inherit">
						<Button color="inherit" component={Link} to="/">Home</Button>
						<Button color="inherit" component={Link} to="/privacy">Privacy Policy</Button>
						<Button color="inherit" component={Link} to="/about">About</Button>
					</Box>

					<Button color="inherit" component={Link} to="/login">Login</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
