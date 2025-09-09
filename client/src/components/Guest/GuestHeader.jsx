import logo from "../../logo.svg";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Drawer,
	Button,
	Box,
	Divider,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Login, PersonAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

export const GuestHeader = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center", overflow: "hidden", bgcolor: "primary.main" }}>
			<Button color="inherit"></Button>
			<List sx={{ bgcolor: "primary.main", height: "100vh" }} >
				{navItems.map((item) => (
					<ListItem
						key={item}
						disablePadding
						sx={{ bgcolor: "ButtonShadow" }}
					>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText primary={item} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Box component="header" sx={{ minHeight: "64px !important" }}>
			<AppBar component={"nav"}>
				<Toolbar sx={{ display: "flex", minHeight: "64px !important" }}>
					<IconButton
						color="inherit"
						edge={"start"}
						onClick={handleDrawerToggle}
						sx={{ display: { md: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{
							textAlign: {
								xs: "center",
								sm: "center",
								md: "start",
							},
							flexGrow: { xs: 1, sm: 1, md: 0 },
							marginRight: { md: 4, xl: 4, xxl: 4 },
						}}
					>
						Realtime-Chat
					</Typography>

					<Box
						sx={{
							display: { xs: "none", sm: "none", md: "flex" },
							flexGrow: { xs: 0, sm: 0, md: 1 },
							gap: 2,
						}}
						color="inherit"
					>
						<Button color="inherit" component={Link} to="/">
							Home
						</Button>
						<Button color="inherit" component={Link} to="/privacy">
							Privacy Policy
						</Button>
						<Button color="inherit" component={Link} to="/about">
							About
						</Button>
					</Box>

					<Button color="inherit" component={Link} to="/login">
						Login
					</Button>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: {
							xs: "block",
							sm: "block",
							md: "none",
							xl: "none",
							xxl: "none",
						},
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
			</nav>
		</Box>
	);
};
