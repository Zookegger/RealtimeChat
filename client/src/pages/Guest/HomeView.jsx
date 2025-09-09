import {
	Box,
	Button,
	Container,
	Typography,
	Stack,
	Grid,
	Card,
	CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

const scrollToSection = (elementId) => {
	const element = document.getElementById(elementId);
	if (element) {
		const element_position = element.getBoundingClientRect().top;
		const offset_position = element_position + window.pageYOffset - 70;

		window.scrollTo({
			top: offset_position,
			behavior: "smooth",
		});
	}
};

const KeyFeatureGridItem = ({ title, description }) => {
	return (
		<Grid item xs={12} md={4}>
			<Card
				sx={{
					height: "100%",
					width: {
						xs: "calc(100vw - 100px)",
						sm: "calc(100vw - 150px)",
						md: 460,
					},
				}}
			>
				<CardContent>
					<Typography gutterBottom variant="h5">
						{title}
					</Typography>
					<Typography>{description}</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
};

export const GuestHomeView = () => {
	return (
		<Box sx={{}}>
			{/* Hero Section */}
			<Box
				sx={{
					position: "relative",
					backgroundImage: "url('/img/2x-guesthome-background.jpg')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					width: "100vw",
					minHeight: 400,
					height: { xs: 400, md: 500, lg: 600, xl: 700 },
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					"&::before": {
						content: '""',
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						zIndex: 1,
					},
				}}
			>
				<Container
					sx={{
						position: "relative",
						zIndex: 2,
						textAlign: "center",
						color: "white",
					}}
				>
					<Typography
						variant="h2"
						sx={{
							fontSize: { xs: "2rem", md: "3rem", lg: "4rem" },
							fontWeight: "bold",
							mb: 3,
							textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
						}}
					>
						RealtimeChat
					</Typography>
					<Typography
						variant="h5"
						sx={{
							fontSize: {
								xs: "1rem",
								md: "1.25rem",
								lg: "1.5rem",
							},
							mb: 4,
							maxWidth: 800,
							mx: "auto",
							lineHeight: 1.6,
						}}
					>
						Connect instantly with friends, family, or colleagues in
						a secure and modern chat environment.
					</Typography>
					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={2}
						justifyContent="center"
						alignItems="center"
					>
						<Button
							variant="contained"
							size="large"
							sx={{
								px: 4,
								py: 1.5,
								fontSize: "1.1rem",
								backgroundColor: "primary.main",
								"&:hover": {
									backgroundColor: "primary.dark",
								},
							}}
							component={Link}
							to={"/login"}
						>
							Start Chatting
						</Button>
						<Button
							variant="outlined"
							size="large"
							sx={{
								px: 4,
								py: 1.5,
								fontSize: "1.1rem",
								color: "white",
								borderColor: "white",
								"&:hover": {
									borderColor: "primary.light",
									backgroundColor: "rgba(255,255,255,0.1)",
								},
							}}
							// href="#learn-more"
							onClick={() => scrollToSection("learn-more")}
						>
							Learn More
						</Button>
					</Stack>
				</Container>
			</Box>

			{/* Features Section */}
			<Box sx={{ py: 7, bgcolor: "background.default" }}>
				<Container>
					<Typography
						variant="h3"
						id="learn-more"
						sx={{
							textAlign: "center",
							fontWeight: "bold",
							color: "primary.main",
						}}
						gutterBottom
					>
						Why Choose RealtimeChat?
					</Typography>
					<Typography
						variant="body1"
						sx={{
							fontSize: "1.25rem",
							lineHeight: 1.8,
							textAlign: "center",
							maxWidth: 800,
							mx: "auto",
							color: "text.secondary",
						}}
					>
						Enjoy real-time messaging, easy group creation, and a
						user-friendly interface—no registration required for
						guests. Start chatting now and experience seamless
						communication!
					</Typography>
				</Container>
			</Box>

			<Box sx={{ py: 6 }}>
				<Container>
					<Typography
						variant="h3"
						color="primary"
						fontWeight="bold"
						gutterBottom
					>
						Key Features
					</Typography>

					<Grid
						container
						gap={4}
						// spacing={4}
						direction={"row"}
						alignItems={"stretch"}
						justifyContent={"space-evenly"}
					>
						<KeyFeatureGridItem
							title="Real-time Messaging"
							description="Instantly connect with others through our messaging system"
						/>
						<KeyFeatureGridItem
							title="Secure & Private"
							description="All messages are encrypted and your data is protected"
						/>
						<KeyFeatureGridItem
							title="Media Sharing"
							description="Send images, files, and emojis to make conversations more fun"
						/>
						<KeyFeatureGridItem
							title="Notifications"
							description="Get instant alerts for new messages and mentions"
						/>
					</Grid>
				</Container>
			</Box>
		</Box>
	);
};
