import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";

export default function Sidebar() {
	return (
		<Box>
			<List sx>
				{[...Array(5)].map((_, i) => (
					<ListItemButton key={i} sx={{ px: 3 }}>
						Sidebar {i + 1}
					</ListItemButton>
				))}

				{/* Get user's chat sessions */}
			</List>
		</Box>
	);
}
