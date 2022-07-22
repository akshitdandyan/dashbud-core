import { Typography } from "@mui/material";
import AddNewStaffForm from "../Components/Forms/Sections/AddNewStaffForm";

const AddNewStaff: React.FC = () => {
    return (
        <div>
            <Typography variant="h4">Add New Staff</Typography>
            <AddNewStaffForm />
        </div>
    );
};

export default AddNewStaff;
