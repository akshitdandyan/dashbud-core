import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import UpdateInstituteForm from "../Components/Forms/Sections/UpdateInstituteForm";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { useQuery } from "@apollo/client";
import { GET_INSTITUTE_DETAILS } from "../GraphQL/Queries/institute";

const settingsPageLinks = [
    {
        name: "Update Institute",
        link: "/dashboard/settings/update-institute",
        icon: <BusinessIcon />,
    },
    {
        name: "Update User",
        link: "/dashboard/settings/update-user",
        icon: <AccountCircleIcon />,
    },
    {
        name: "My Profile",
        link: "/dashboard/settings/my-profile",
        icon: <SettingsApplicationsIcon />,
    },
];

const Settings: React.FC = () => {
    const { data, error, loading } = useQuery(GET_INSTITUTE_DETAILS);
    console.log("data", data?.getInstituteDetails?.institute);
    console.log("error", error);

    if (loading) return <Typography variant="h5">Loading...</Typography>;
    return (
        <Box sx={{ display: "flex" }}>
            <Box>
                <List>
                    {settingsPageLinks.map(({ link, name, icon }, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <Link to={link}>
                                    <ListItemText primary={name} />
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
                <Routes>
                    <Route path="/" element={<div>Settings</div>} />
                    <Route
                        path="/update-institute"
                        element={
                            data?.getInstituteDetails?.institute ? (
                                <UpdateInstituteForm
                                    institute={
                                        data.getInstituteDetails.institute
                                    }
                                />
                            ) : (
                                "loading..."
                            )
                        }
                    />
                </Routes>
            </Box>
        </Box>
    );
};

export default Settings;
