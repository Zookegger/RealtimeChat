import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";
const LOGIN_ENDPOINT = "/users/login";
const LOGOUT_ENDPOINT = "/users/logout";
const REGISTER_ENDPOINT = "/users/register";
const AUTHENTICATE_ENDPOINT = "/users/me";

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error(`useAuth must be used within an AuthProvider`);
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [is_logged_in, setIsLoggedIn] = useState(false);
	const [is_loading, setIsLoading] = useState(true);

	// Check session on mount
	useEffect(() => {
		checkAuthStatus();
	}, []);

	const login = async (credentials) => {
		try {
			const res = await fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					login: credentials.login,
					password: credentials.password,
				}),
			});

			const data = await res.json();

			// Throw the error data to be caught by the component
			if (!res.ok) throw data;

			setUser(data.user);
			setIsLoggedIn(true);
			return data;
		} catch (error) {
			// Re-throw to let the component handle the error
			throw error;
		}
	};

	const logout = async () => {
		try {
			await fetch(`${API_BASE_URL}${LOGOUT_ENDPOINT}`, {
				method: "POST",
				credentials: "include",
			});
		} catch (error) {
			console.error("Logout error:", error);
			alert("An error has occured while logging you out");
		} finally {
			setUser(null);
			setIsLoggedIn(false);
		}
	};

	const register = async (userData) => {
		try {
			const res = await fetch(`${API_BASE_URL}${REGISTER_ENDPOINT}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify(userData),
			});

			const data = await res.json();

			if (!res.ok) {
				throw data;
			}

			// If registration auto-logs in the user
			if (data.user) {
				setUser(data.user);
				setIsLoggedIn(true);
			}

			return data;
		} catch (error) {
			throw error;
		}
	};

	const checkAuthStatus = async () => {
		try {
			const res = await fetch(`${API_BASE_URL}${AUTHENTICATE_ENDPOINT}`, {
				credentials: "include",
			});

			if (res.ok) {
				const data = await res.json();
				setUser(data.user);
				setIsLoggedIn(true);
			} else {
				setUser(null);
				setIsLoggedIn(false);
			}
		} catch (error) {
			console.error("Error: Failed to authenticate user", error); // Just log it
			setUser(null);
			setIsLoggedIn(false);
		} finally {
			setTimeout(() => setIsLoading(false), 100);
		}
	};

	/**
	 * Context value object - contains all authentication state and functions
	 * that will be available to any component using the useAuth() hook.
	 *
	 * State properties:
	 * - user: Current user object (null if not authenticated)
	 * - is_logged_in: Boolean indicating if user is authenticated
	 * - is_loading: Boolean indicating if auth check is in progress
	 *
	 * Function properties:
	 * - login: Authenticates user with credentials and updates state
	 * - logout: Logs out user and clears state
	 * - register: Creates new user account and optionally logs them in
	 * - checkAuthStatus: Manually checks if user session is still valid
	 *
	 * This object is shared across the entire app through React Context,
	 * allowing any component to access auth state and functions without
	 * prop drilling.
	 */
	const value = {
		user,
		is_logged_in,
		is_loading,
		login,
		logout,
		register,
		checkAuthStatus,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
