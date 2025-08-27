import { LoginOutlined, PersonAdd } from "@mui/icons-material";
import {
	Box,
	Button,
	Checkbox,
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

export const Login = () => {
	const [remember_me, setRememberMe] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ username: "", password: "" });

	const validateForm = () => {
		let isValid = true;
		const newErrors = { username: "", password: "" };

		if (!username) {
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

						validateForm();
						alert("Yeah, it's working");
						// Login API logic here
					}}
				>
					<Box display={"flex"} flexDirection={"column"} gap={2}>
						<FormControl variant="standard">
							<InputLabel size="medium" sx={{ fontSize: 18 }}>
								Username or Email
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
						>
							Register
						</Button>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};
