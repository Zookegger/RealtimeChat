import {
	Box,
	Card,
	CardContent,
	Container,
	Link,
	List,
	ListItem,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Chip,
	Divider,
	Paper,
	Grid,
} from "@mui/material";
import {
	Security,
	PrivacyTip,
	DataUsage,
	Person,
	AccessTime,
	Cookie,
	Devices,
	Storage,
	ExpandMore,
	Email,
} from "@mui/icons-material";

export const PrivacyPolicy = () => {
	return (
		<Container maxWidth="md" sx={{}}>
			<Box sx={{ py: 6 }}>
				<Typography variant="h3" fontWeight={"bold"} gutterBottom>
					<Security sx={{ fontSize: 40 }} /> Privacy Policy
				</Typography>
				<Chip
					icon={<AccessTime />}
					label={`Last updated: ${new Date().toLocaleDateString()}`}
					variant="outlined"
					color="primary"
				/>
			</Box>

			{/* Our commitment to your privacy */}
			<Paper elevation={3} sx={{ mb: 4, borderRadius: 3, p: 4 }}>
				<Box
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					mb={3}
				>
					<PrivacyTip color="primary" sx={{ mr: 1 }} />
					<Typography variant="h5" fontWeight={600} component="h2">
						Our commitment to your privacy
					</Typography>
				</Box>
				<Typography variant="body1" paragraph>
					At Realtime-Chat, we take your privacy seriously. This
					policy explains how we collect, use, and protect your
					personal information when you use our services.
				</Typography>
				<Typography variant="body1">
					By using our services, you agree to the terms outlined in
					this Privacy Policy.
				</Typography>
			</Paper>

			{/* Information we collect */}
			<Paper elevation={3} sx={{ mb: 4, borderRadius: 3, p: 4 }}>
				<Box
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					mb={2}
				>
					<DataUsage color="action" sx={{ mr: 1 }} />
					<Typography variant="h5" fontWeight={600} component={"h2"}>
						Information We Collect
					</Typography>
				</Box>
				<Typography variant="body1" gutterBottom>
					We collect different types of information to provide and
					improve our services:
				</Typography>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexWrap: "wrap",
						gap: 1,
						my: 2,
					}}
				>
					<Chip
						icon={<Person />}
						label="Account Information"
						color="primary"
						variant="outlined"
					></Chip>
					<Chip
						icon={<Storage />}
						label="Usage data"
						color="primary"
						variant="outlined"
					></Chip>
					<Chip
						icon={<Cookie />}
						label="Cookies"
						color="primary"
						variant="outlined"
					></Chip>
					<Chip
						icon={<Devices />}
						label="Device Information"
						color="primary"
						variant="outlined"
					></Chip>
				</Box>

				<Accordion>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Typography sx={{ fontWeight: 600 }}>Personal Information</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography variant="body1">
							We collect personal information that you provide
							when registering or using our services. This
							information helps us create your account,
							personalize your experience, and ensure secure
							access.
						</Typography>
						<List
							sx={{
								listStyleType: "disc",
								pl: 4,
								"& .MuiListItem-root": { display: "list-item" },
							}}
						>
							<ListItem>
								<Typography variant="body2">
									<strong>Name and email address</strong> for
									account creation and communication
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="body2">
									<strong>Account credentials</strong> such as
									username and password for secure login
								</Typography>
							</ListItem>
						</List>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Typography sx={{ fontWeight: 600 }}>Usage Data</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography variant="body1">
							We automatically collect usage data to improve our
							services and provide a better user experience. This
							data helps us understand how you interact with our
							platform and identify areas for enhancement.
						</Typography>
						<List
							sx={{
								listStyleType: "disc",
								pl: 4,
								"& .MuiListItem-root": { display: "list-item" },
							}}
						>
							<ListItem>
								<Typography variant="body2">
									<strong>Browser type</strong> and version to
									optimize compatibility
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="body2">
									<strong>Time spent</strong> on our services
									to improve performance
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="body2">
									<strong>Pages visited</strong> and features
									used to analyze engagement
								</Typography>
							</ListItem>
						</List>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Typography sx={{ fontWeight: 600 }}>Cookies</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography variant="body1">
							We use cookies and similar tracking technologies to
							track activity on our service and hold certain
							information.
						</Typography>
						<List
							sx={{
								listStyleType: "disc",
								pl: 4,
								"& .MuiListItem-root": { display: "list-item" },
							}}
						>
							<ListItem>
								<Typography variant="body2">
									<strong>Session cookies</strong> to keep you
									logged in during your visit
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="body2">
									<strong>Preference cookies</strong> to
									remember your settings and preferences
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="body2">
									<strong>Security cookies</strong> for
									authentication and protection
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="body2">
									<strong>Analytics cookies</strong> to
									understand how you use our service
								</Typography>
							</ListItem>
						</List>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Typography sx={{ fontWeight: 600 }}>Device Information</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography variant="body1">
							We collect information about the devices you use to
							access our services, which helps us optimize
							performance and compatibility.
						</Typography>
						<List
							sx={{
								listStyleType: "disc",
								pl: 4,
								"& .MuiListItem-root": { display: "list-item" },
							}}
						>
							<ListItem>
								<Typography variant="body2">
									<strong>Device type</strong> (phone, tablet,
									computer)
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="body2">
									<strong>Operating system</strong> and
									version
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="body2">
									<strong>Browser type</strong> and version
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="body2">
									<strong>IP address</strong> for security and
									regional customization
								</Typography>
							</ListItem>
							<ListItem>
								<Typography variant="body2">
									<strong>Screen resolution</strong> and
									browser window size
								</Typography>
							</ListItem>
						</List>
					</AccordionDetails>
				</Accordion>
			</Paper>

			{/* How we use your information */}
			<Paper elevation={3} sx={{ mb: 4, borderRadius: 3, p: 4 }}>
				<Box sx={{ mb: 2 }}>
					<Typography
						variant="h5"
						fontWeight={600}
						component="h2"
					>
						How We Use Your Data
					</Typography>
				</Box>

				<Grid container spacing={3}>
					<Grid size={{ sm: 6, md: "grow" }}>
						<Card variant="outlined" sx={{ height: "100%" }}>
							<CardContent>
								<Typography
									variant="h6"
									gutterBottom
									color="primary"
								>
									<strong>Service Provision</strong>
								</Typography>
								<Typography variant="body2">
									We use your information to create and
									maintain your account and provide customer
									support.
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid size={{ sm: 6, md: "grow" }}>
						<Card variant="outlined" sx={{ height: "100%" }}>
							<CardContent>
								<Typography
									variant="h6"
									gutterBottom
									color="primary"
								>
									<strong>Communications</strong>
								</Typography>
								<Typography variant="body2">
									We may contact you with service-related
									announcements, updates, offers, and
									promotional materials.
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid size={{ sm: 6, md: "grow" }}>
						<Card variant="outlined" sx={{ height: "100%" }}>
							<CardContent>
								<Typography
									variant="h6"
									gutterBottom
									color="primary"
								>
									<strong>Analytics & Improvement</strong>
								</Typography>
								<Typography variant="body2">
									We analyze usage patterns to improve our
									services, develop new features, and enhance
									user experience.
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					<Grid size={{ sm: 6, md: "grow" }}>
						<Card variant="outlined" sx={{ height: "100%" }}>
							<CardContent>
								<Typography
									variant="h6"
									gutterBottom
									color="primary"
								>
									<strong>Security</strong>
								</Typography>
								<Typography variant="body2">
									We use information to protect our services,
									detect and prevent fraud, and address
									security issues.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Paper>

			<Divider sx={{mb: 3}} />

			{/* Contact Information */}
			<Paper elevation={3} sx={{ mb: 4, borderRadius: 3, p: 4 }}>
				<Email sx={{ fontSize: 40, color: "primary.dark", mb: 2 }} />
				<Typography variant="h6" gutterBottom>
					Questions About Our Privacy Policy?
				</Typography>
				<Typography variant="body1" paragraph>
					Contact our privacy team at{" "}
					<Link
						href="mailto:privacy@realtime-chat.com"
						color="primary.dark"
						fontWeight="bold"
					>
						privacy@realtime-chat.com
					</Link>
				</Typography>
				<Chip
					label="We typically respond within 24 hours"
					variant="filled"
					color="primary"
				/>
			</Paper>
		</Container>
	);
};
