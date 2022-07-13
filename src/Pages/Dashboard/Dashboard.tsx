import {
    Box,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import AddNewStaff from "../../Sections/AddNewStaff";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${240}px)`,
        marginLeft: `${240}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Dashboard: React.FC = () => {
    const [openSideBar, setOpenSideBar] = useState<boolean>(false);

    const theme = useTheme();
    const handleSidebarToggle = () => {
        setOpenSideBar((s) => !s);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={openSideBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleSidebarToggle}
                        edge="start"
                        sx={{ mr: 2, ...(openSideBar && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashbud
                    </Typography>
                </Toolbar>
            </AppBar>
            <Sidebar
                open={openSideBar}
                handleSidebarToggle={handleSidebarToggle}
            />
            <Box
                component="main"
                sx={{ flexGrow: 1, paddingTop: 10, paddingLeft: 4 }}
            >
                <Routes>
                    <Route path="/" element={<div>Dashboard</div>} />
                    <Route path="/add-new-staff" element={<AddNewStaff />} />
                    <Route path="/settings" element={<div>Settings</div>} />
                </Routes>
            </Box>
        </Box>
    );
};

export default Dashboard;
