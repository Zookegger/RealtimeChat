import {
	Box,
	Container,
	Grid,
	Typography,
	Link,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Paper,
} from "@mui/material";
import {
	Facebook,
	LinkedIn,
	Email,
	ContactSupport,
	Phone,
	LocationOn,
	LinkSharp,
} from "@mui/icons-material";
import { Link as NavLink } from "react-router-dom";

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

export const GuestFooter = () => {
	return (
		<Paper
			component="footer"
			sx={{
				py: { xs: 2, sm: 2, md: 5 },
				bgcolor: "primary.main",
				color: "white",
				borderRadius: 0,
			}}
		>
			<Container maxWidth="lg">
				<Grid
					container
					direction={"row"}
					spacing={4}
					sx={{
						display: {
							xs: "none",
							sm: "none",
							md: "flex",
							xl: "flex",
							xxl: "flex",
						},
					}}
				>
					{/* Navigation */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Box
							sx={{
								justifyContent: "left",
								display: "flex",
								alignItems: "center",
								mb: 1,
							}}
						>
							<Typography variant="h6">Quick Links</Typography>
							<LinkSharp sx={{ ml: 1 }} />
						</Box>

						<List sx={{ padding: 0, maxWidth: 60 }}>
							<ListItem
								sx={{
									padding: 0,
									color: "white",
								}}
							>
								<ListItemText
									component={NavLink}
									onClick={scrollToTop}
									to={"/"}
									sx={{
										":visited": {
											color: "White",
										},
										textDecoration: "none",
									}}
								>
									Home
								</ListItemText>
							</ListItem>
							<ListItem
								sx={{
									padding: 0,
									color: "white",
								}}
							>
								<ListItemText
									component={NavLink}
									onClick={scrollToTop}
									to={"/privacy"}
									sx={{
										":visited": {
											color: "White",
										},
										textDecoration: "none",
									}}
								>
									Privacy
								</ListItemText>
							</ListItem>
							<ListItem
								sx={{
									padding: 0,
									color: "white",
								}}
							>
								<ListItemText
									component={NavLink}
									onClick={scrollToTop}
									to={"/about"}
									sx={{
										":visited": {
											color: "White",
										},
										textDecoration: "none",
									}}
								>
									About
								</ListItemText>
							</ListItem>
						</List>
					</Grid>

					{/* About */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Typography variant="h6" gutterBottom>
							&copy; 2025 RealtimeChat
						</Typography>
						<Typography variant="body2">
							Connecting people through seamless and secure
							communication. A personal project built with passion
							for real-time technology.
						</Typography>
					</Grid>

					{/* Contact */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Box
							sx={{
								justifyContent: "right",
								display: "flex",
								alignItems: "center",
								mb: 1,
							}}
						>
							<Typography variant="h6">Support</Typography>
							<ContactSupport sx={{ ml: 1 }} />
						</Box>
						<List
							dense
							disablePadding
							sx={{ md: { textAlign: "right" } }}
						>
							<ListItem disableGutters>
								<ListItemText
									primary={
										<Link
											href="mailto:support@realtime-chat.com"
											color="inherit"
											underline="hover"
										>
											support@realtime-chat.com
										</Link>
									}
									sx={{ textAlign: "right" }}
								/>
								<ListItemIcon
									sx={{
										ml: 1,
										minWidth: 0,
										color: "inherit",
									}}
								>
									<Email fontSize="small" />
								</ListItemIcon>
							</ListItem>
							<ListItem disableGutters>
								<ListItemText
									primary="+84 123456789"
									sx={{ textAlign: "right" }}
								/>
								<ListItemIcon
									sx={{
										ml: 1,
										minWidth: 0,
										color: "inherit",
									}}
								>
									<Phone fontSize="small" />
								</ListItemIcon>
							</ListItem>
							{/* 
							<ListItem disableGutters>
								<ListItemText primary="Based in Internet" 
									sx={{ textAlign: "right" }}
								/>
								<ListItemIcon
									sx={{ ml: 1, minWidth: 0, color: "inherit" }}
								>
									<LocationOn fontSize="small" />
								</ListItemIcon>
							</ListItem> 
							*/}
						</List>
					</Grid>
				</Grid>

				<Grid
					container
					direction={"row"}
					spacing={4}
					sx={{
						display: { md: "none", xl: "none", xxl: "none" },
					}}
				>
					{/* About */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Typography variant="h6" gutterBottom>
							&copy; 2025 RealtimeChat
						</Typography>
						<Typography variant="body2">
							Connecting people through seamless and secure
							communication. A personal project built with passion
							for real-time technology.
						</Typography>
					</Grid>

					{/* Navigation */}
					<Grid size={{ xs: 6, md: 4 }}>
						<Box
							sx={{
								justifyContent: "left",
								display: "flex",
								alignItems: "center",
								mb: 1,
							}}
						>
							<Typography variant="h6">Quick Links</Typography>
							<LinkSharp sx={{ ml: 1 }} />
						</Box>

						<List sx={{ padding: 0 }}>
							<ListItem
								sx={{
									padding: 0,
									color: "white",
								}}
							>
								<ListItemText
									component={NavLink}
									onClick={scrollToTop}
									to={"/"}
									sx={{
										":visited": {
											color: "White",
										},
										textDecoration: "none",
									}}
								>
									Home
								</ListItemText>
							</ListItem>
							<ListItem
								sx={{
									padding: 0,
									color: "white",
								}}
							>
								<ListItemText
									component={NavLink}
									onClick={scrollToTop}
									to={"/privacy"}
									sx={{
										":visited": {
											color: "White",
										},
										textDecoration: "none",
									}}
								>
									Privacy
								</ListItemText>
							</ListItem>
							<ListItem
								sx={{
									padding: 0,
									color: "white",
								}}
							>
								<ListItemText
									component={NavLink}
									onClick={scrollToTop}
									to={"/about"}
									sx={{
										":visited": {
											color: "White",
										},
										textDecoration: "none",
									}}
								>
									About
								</ListItemText>
							</ListItem>
						</List>
					</Grid>

					{/* Contact */}
					<Grid size={{ xs: 6, md: 4 }}>
						<Box
							sx={{
								justifyContent: "right",
								display: "flex",
								alignItems: "center",
								mb: 1,
							}}
						>
							<Typography variant="h6">Support</Typography>
							<ContactSupport sx={{ ml: 1 }} />
						</Box>
						<List
							dense
							disablePadding
							sx={{ md: { textAlign: "right" } }}
						>
							<ListItem disableGutters>
								<ListItemText
									primary={
										<Link
											href="mailto:support@realtime-chat.com"
											color="inherit"
											underline="hover"
										>
											support@realtime-chat.com
										</Link>
									}
									sx={{ textAlign: "right" }}
								/>
								<ListItemIcon
									sx={{
										ml: 1,
										minWidth: 0,
										color: "inherit",
									}}
								>
									<Email fontSize="small" />
								</ListItemIcon>
							</ListItem>
							<ListItem disableGutters>
								<ListItemText
									primary="+84 123456789"
									sx={{ textAlign: "right" }}
								/>
								<ListItemIcon
									sx={{
										ml: 1,
										minWidth: 0,
										color: "inherit",
									}}
								>
									<Phone fontSize="small" />
								</ListItemIcon>
							</ListItem>
							{/* 
							<ListItem disableGutters>
								<ListItemText primary="Based in Internet" 
									sx={{ textAlign: "right" }}
								/>
								<ListItemIcon
									sx={{ ml: 1, minWidth: 0, color: "inherit" }}
								>
									<LocationOn fontSize="small" />
								</ListItemIcon>
							</ListItem> 
							*/}
						</List>
					</Grid>
				</Grid>
			</Container>
		</Paper>
	);
};
