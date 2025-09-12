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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [remember_me, setRememberMe] = useState(false);
	const [is_loading, setIsLoading] = useState(false);
	const [usernameOrEmail, setUsernameOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ username: "", password: "" });
	const [form_error, setFormError] = useState(null);

	const validateForm = () => {
		let isValid = true;
		const newErrors = { username: "", password: "" };

		if (!usernameOrEmail.trim()) {
			isValid = false;
			newErrors.username = "Username or email is invalid";
		}

		if (!password.trim()) {
			isValid = false;
			newErrors.password = "Password is invalid";
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError(null);

		setErrors({ username: "", password: "" });

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);

		try {
			const credentials = {
				login: usernameOrEmail.trim(),
				password: password.trim(),
			}
			
			const result = await login(credentials);
			
			console.log("Login successful:", result);

			// Do something after logging in
			navigate("/")

		} catch (error) {
			console.error(`Network error: ${error.message}`);
			if (error.errors && Array.isArray(error.errors)) {
				// Validation errors from server
				setFormError(error.errors[0]?.msg || "Login failed");
			} else if (error.error?.message) {
				// General error message
				setFormError(error.error.message);
			} else if (error.message) {
				// Network or other errors
				setFormError(error.message);
			} else {
				setFormError("An unexpected error occurred. Please try again.");
			}
		} finally {
			setIsLoading(false);
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
				<Box component="form" onSubmit={handleSubmit}>
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
									checked={remember_me}
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
