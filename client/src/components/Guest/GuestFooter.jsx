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
} from "@mui/icons-material";

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
				<Grid container direction={"row"} spacing={4}>
					<Grid item size={{ xs: 12, md: 4 }}></Grid>

					{/* About */}
					<Grid item size={{ xs: 12, md: 4 }}>
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
					<Grid item size={{ xs: 12, md: 4 }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								mb: 1,
							}}
						>
							<ContactSupport sx={{ mr: 1 }} />
							<Typography variant="h6">Support</Typography>
						</Box>
						<List dense disablePadding>
							<ListItem disableGutters>
								<ListItemIcon
									sx={{ minWidth: 30, color: "inherit" }}
								>
									<Email fontSize="small" />
								</ListItemIcon>
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
								/>
							</ListItem>
							<ListItem disableGutters>
								<ListItemIcon
									sx={{ minWidth: 30, color: "inherit" }}
								>
									<Phone fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="+84 123456789" />
							</ListItem>
							<ListItem disableGutters>
								<ListItemIcon
									sx={{ minWidth: 30, color: "inherit" }}
								>
									<LocationOn fontSize="small" />
								</ListItemIcon>
								<ListItemText primary="Based in Internet" />
							</ListItem>
						</List>
					</Grid>
				</Grid>
			</Container>
		</Paper>
	);
};
