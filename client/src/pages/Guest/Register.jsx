import { LoginOutlined } from "@mui/icons-material";
import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Container,
	Divider,
	FormControl,
	Grid,
	Input,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const PASSWORD_LENGTH = 8;

export const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [fullname, setFullName] = useState("");
	const [birthday, setbirthday] = useState("");
	const [gender, setGender] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [errors, setErrors] = useState({ username: "", password: "" });

	const validateForm = () => {
		let isValid = true;
		const newErrors = { username: "", password: "" };

		if (!username) {
			isValid = false;
			newErrors.username = "Username or email is invalid";
		}

		if (!email) {
			isValid = false;
			newErrors.email = "Username or email is invalid";
		}

		if (!password || password.length < PASSWORD_LENGTH) {
			isValid = false;
			newErrors.password = "Invalid Password";
		}

		if (!confirmPassword || password !== confirmPassword) {
			isValid = false;
			newErrors.confirmPassword = "Mismatching Password";
		}

		if (!fullname) {
			isValid = false;
			newErrors.fullname = "Fullname is invalid";
		}

		if (!gender) {
			isValid = false;
			newErrors.gender = "Invalid gender";
		}

		if (
			!birthday ||
			!Date.parse(birthday) ||
			Date.parse(birthday) > Date.now()
		) {
			isValid = false;
			newErrors.birthday = "Invalid birthday";
		}

		setErrors(newErrors);
		return isValid;
	};

	const submitRegistration = async () => {
		const isValid = validateForm();

		if (isValid) {
			try {
				const API_BASE_URL = process.env.REACT_APP_API_URL;
				const REGISTER_ENDPOINT = "/users/register";
				const user_data = {
					username: username,
					password: password,
					email: email,
					fullname: fullname,
					gender: gender,
					birthday: birthday,
				};

				const response = await fetch(
					`${API_BASE_URL}${REGISTER_ENDPOINT}`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(user_data),
					}
				);

				const result = await response.json();
				if (response.ok) {
					console.log("Registration successful:", result);
				} else {
					console.error("Registration failed:", result);
					setErrors(
						result.errors?.[0]?.msg ||
							result.error.message ||
							"Login failed"
					);
				}
			} catch (error) {
				console.error(`Network error: ${error.message}`);
			}
		}
	};

	return (
		<Container maxWidth={"md"} sx={{ my: 5 }}>
			<Paper elevation={5} sx={{ p: 4 }}>
				<Typography
					variant="h5"
					component="h1"
					fontWeight={"bold"}
					gutterBottom
					align="center"
				>
					Create new account
				</Typography>
				<Box
					component="form"
					onSubmit={(e) => {
						e.preventDefault();
						setIsLoading(true);

						setTimeout(() => {
							submitRegistration();
							setIsLoading(false);
						}, 3000);
					}}
				>
					<Box my={3}>
						{/* Personal information */}
						<Grid container spacing={4} mb={3} direction={"row"}>
							<Grid size={{ xs: 12, md: 6 }}>
								<FormControl variant="standard" fullWidth>
									<InputLabel
										id="fullname-label"
										size="medium"
										sx={{ fontSize: 18 }}
									>
										Full name
									</InputLabel>
									<Input
										id="fullname"
										name="fullname"
										autoComplete="name"
										value={fullname}
										onChange={(e) => {
											setFullName(e.target.value);
										}}
										required
										placeholder="Enter your full name"
										error={!!errors.fullname}
									/>
								</FormControl>
							</Grid>
							<Grid size={{ xs: 6, md: 6 }}>
								<FormControl variant="standard" fullWidth>
									<InputLabel
										id="birthday-label"
										size="medium"
										sx={{ fontSize: 18 }}
										shrink
									>
										Date of birth
									</InputLabel>
									<Input
										id="birthday"
										name="birthday"
										autoComplete="bday"
										value={birthday}
										type="date"
										onChange={(e) => {
											setbirthday(e.target.value);
										}}
										required
										error={!!errors.birthday}
									/>
								</FormControl>
							</Grid>
							<Grid size={{ xs: 6, md: 6 }}>
								<FormControl variant="standard" fullWidth>
									<InputLabel
										id="gender-label"
										size="medium"
										sx={{ fontSize: 18 }}
									>
										Gender
									</InputLabel>

									<Select
										placeholder="Enter your gender"
										labelId="gender-label"
										sx={{ textAlign: "left" }}
										id="gender"
										name="gender"
										value={gender}
										label="Age"
										onChange={(e) => {
											setGender(e.target.value);
										}}
										required
										error={!!errors.gender}
									>
										<MenuItem value="male">Male</MenuItem>
										<MenuItem value="female">
											Female
										</MenuItem>
										<MenuItem value="other">Other</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>

						{/* Account information */}
						<Grid container spacing={4} mb={3}>
							<Grid size={{ xs: 12, md: 6 }}>
								<FormControl variant="standard" fullWidth>
									<InputLabel
										id="username-label"
										size="medium"
										sx={{ fontSize: 18 }}
									>
										Username
									</InputLabel>
									<Input
										id="username"
										name="username"
										autoComplete="username"
										value={username}
										onChange={(e) => {
											setUsername(e.target.value);
										}}
										required
										placeholder="Enter your username or email"
										error={!!errors.username}
									/>
								</FormControl>
							</Grid>
							<Grid size={{ xs: 12, md: 6 }}>
								<FormControl variant="standard" fullWidth>
									<InputLabel
										id="email-label"
										size="medium"
										sx={{ fontSize: 18 }}
									>
										Email
									</InputLabel>
									<Input
										id="email"
										name="email"
										autoComplete="email"
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										required
										placeholder="Enter your email"
										error={!!errors.email}
									/>
								</FormControl>
							</Grid>
							<Grid size={{ xs: 12, md: 6 }}>
								<FormControl variant="standard" fullWidth>
									<InputLabel
										id="password-label"
										size="medium"
										sx={{ fontSize: 18 }}
									>
										Password
									</InputLabel>
									<Input
										id="password"
										name="password"
										type="password"
										autoComplete="new-password"
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
										required
										placeholder="Enter your password"
										error={!!errors.password}
									/>
								</FormControl>
							</Grid>
							<Grid size={{ xs: 12, md: 6 }}>
								<FormControl variant="standard" fullWidth>
									<InputLabel
										id="confirm-password-label"
										size="medium"
										sx={{ fontSize: 18 }}
									>
										Confirm Password
									</InputLabel>
									<Input
										id="confirm-password"
										name="confirm-password"
										type="password"
										autoComplete="new-password"
										value={confirmPassword}
										onChange={(e) => {
											setConfirmPassword(e.target.value);
										}}
										required
										placeholder="Confirm your password"
										error={!!errors.confirmPassword}
									/>
								</FormControl>
							</Grid>
						</Grid>
					</Box>
					<Box mt={4}>
						<Button
							variant="contained"
							color="inherit"
							sx={{ fontWeight: "bold" }}
							type="submit"
						>
							Register
						</Button>
					</Box>
				</Box>

				<Divider sx={{ my: 4 }} />

				<Box>
					<Paper
						elevation={2}
						sx={{ p: 6, backgroundColor: "ButtonShadow" }}
					>
						<Typography
							variant="h5"
							fontWeight={"bold"}
							gutterBottom
						>
							Already have an account?
						</Typography>
						<Button
							fullWidth
							variant="contained"
							startIcon={<LoginOutlined />}
							component={Link}
							to="/login"
						>
							Login
						</Button>
					</Paper>
				</Box>
			</Paper>

			<Backdrop
				sx={(theme) => ({
					color: "#fff",
					zIndex: theme.zIndex.drawer + 1,
				})}
				open={isLoading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Container>
	);
};
