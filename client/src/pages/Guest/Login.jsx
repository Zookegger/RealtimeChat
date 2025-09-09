import { LoginOutlined, PersonAdd } from "@mui/icons-material";
import {
	Alert,
	Backdrop,
	Box,
	Button,
	Checkbox,
	CircularProgress,
	Container,
	FormControl,
	FormControlLabel,
	FormGroup,
	Input,
	InputLabel,
	Paper,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
	const [remember_me, setRememberMe] = useState(false);
	const [is_loading, setIsLoading] = useState(false);
	const [usernameOrEmail, setUsernameOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ username: "", password: "" });
	const [form_error, setFormError] = useState(null);

	const validateForm = () => {
		let isValid = true;
		const newErrors = { username: "", password: "" };

		if (!usernameOrEmail) {
			isValid = false;
			newErrors.username = "Username or email is invalid";
		}

		if (!password) {
			isValid = false;
			newErrors.password = "Password is invalid";
		}

		setErrors(newErrors);
		return isValid;
	};

	const loginProcess = async () => {
		try {
			const API_BASE_URL = process.env.REACT_APP_API_URL;
			const LOGIN_ENDPOINT = "/users/login";

			const response = await fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					login: usernameOrEmail,
					password: password,
				}),
			});

			const data = await response.json();
			if (response.ok) {
				console.log(`Login successful:`, data);
			} else {
				console.error(`Login failed:`, data);
				setFormError(
					data.errors?.[0]?.msg ||
						data.error.message ||
						"Login failed"
				);
			}
		} catch (error) {
			console.error(`Network error: ${error.message}`);
		}
	};

	return (
		<Container maxWidth={"sm"} sx={{ my: 5 }}>
			<Paper elevation={5} sx={{ p: 4 }}>
				<Typography
					variant="h4"
					component="h1"
					fontWeight={"bold"}
					gutterBottom
					align="center"
				>
					Login
				</Typography>
				<Box
					component="form"
					onSubmit={(e) => {
						e.preventDefault();
						setFormError(null);

						setIsLoading(true);
						validateForm();
						loginProcess();
						setIsLoading(false);
					}}
				>
					{form_error !== null && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{form_error ??
								"An error occured while logging you in"}
						</Alert>
					)}
					{/* Username & Password */}
					<Box display={"flex"} flexDirection={"column"} gap={2}>
						<FormControl variant="standard">
							<InputLabel size="medium" sx={{ fontSize: 18 }}>
								Username or Email
							</InputLabel>
							<Input
								id="usernameOrEmail"
								name="usernameOrEmail"
								autoComplete="username"
								value={usernameOrEmail}
								onChange={(e) => {
									setUsernameOrEmail(e.target.value);
								}}
								required
								placeholder="Enter your username or email"
								error={!!errors.username}
							/>
						</FormControl>
						<FormControl variant="standard">
							<InputLabel size="medium" sx={{ fontSize: 18 }}>
								Password
							</InputLabel>
							<Input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								required
								placeholder="Enter your password"
								error={!!errors.password}
							/>
						</FormControl>
					</Box>

					{/* Forgot your password */}

					{/* Remember your password */}
					<FormGroup sx={{ my: 2 }}>
						<FormControlLabel
							control={
								<Checkbox
									value={remember_me}
									onChange={(e) => {
										setRememberMe(e.target.checked);
									}}
									color="primary"
								/>
							}
							label="Remember your password"
							sx={{ userSelect: "none" }}
						/>
					</FormGroup>

					{/* Button group */}
					<Box
						sx={{
							gap: { sm: 1 },
							display: "flex",
							flexDirection: {
								xs: "column",
								sm: "column",
								md: "row",
							},
							justifyContent: "center",
						}}
					>
						<Button
							fullWidth
							type="submit"
							variant="contained"
							startIcon={<LoginOutlined />}
						>
							Login
						</Button>
						<Button
							fullWidth
							variant="outlined"
							startIcon={<PersonAdd />}
							component={Link}
							to="/register"
						>
							Register
						</Button>
					</Box>
				</Box>
			</Paper>

			<Backdrop
				sx={(theme) => ({
					color: "#fff",
					zIndex: theme.zIndex.drawer + 1,
				})}
				open={is_loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Container>
	);
};
