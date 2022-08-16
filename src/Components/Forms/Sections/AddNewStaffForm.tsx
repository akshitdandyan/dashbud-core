import {
    Button,
    Chip,
    Divider,
    Grid,
    Paper,
    styled,
    TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import { Box, Container } from "@mui/system";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { User } from "../../../types/user";
import { ADD_NEW_STAFF_MEMBER } from "../../../GraphQL/Mutations/adminActions";

const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) + :not(style)": {
        marginTop: theme.spacing(5),
    },
}));

const AddNewStaffForm: React.FC = () => {
    const [addNewStaffMember] = useMutation(ADD_NEW_STAFF_MEMBER);

    const addNewStaffFormSchema = Yup.object().shape({
        firstname: Yup.string().required("First name is required"),
        lastname: Yup.string().required("Last name is required"),
        email: Yup.string().required("Email is required"),
        phone: Yup.string().required("Phone is required"),
        teacherClassId: Yup.string(),
    });

    const formik = useFormik<User>({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            teacherClassId: "",
        },
        validationSchema: addNewStaffFormSchema,
        onSubmit: async (data) => {
            console.log("sending data", data);
            const r = await addNewStaffMember({
                variables: data,
            });
            console.log("r", r);
        },
    });

    const { touched, errors } = formik;
    return (
        <Paper
            elevation={4}
            sx={{
                width: "max-content",
            }}
        >
            <Container maxWidth="xs">
                <Box
                    component="form"
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingTop: "12px",
                    }}
                >
                    <Root>
                        <Divider>
                            <Chip
                                label="Add User"
                                color="primary"
                                style={{ cursor: "pointer" }}
                            />
                        </Divider>
                    </Root>

                    <Grid container spacing={2} sx={{ marginTop: "12px" }}>
                        <Grid item xs={6}>
                            <TextField
                                name="firstname"
                                id="firstname"
                                required
                                fullWidth
                                label="First Name"
                                autoFocus
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                error={Boolean(
                                    touched.firstname && errors.firstname
                                )}
                                helperText={
                                    touched.firstname && errors.firstname
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="lastname"
                                id="lastname"
                                required
                                fullWidth
                                label="Last Name"
                                autoFocus
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                error={Boolean(
                                    touched.lastname && errors.lastname
                                )}
                                helperText={touched.lastname && errors.lastname}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                id="email"
                                required
                                fullWidth
                                label="Email"
                                autoFocus
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="phone"
                                id="phone"
                                required
                                fullWidth
                                label="Phone Number"
                                autoFocus
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={Boolean(touched.phone && errors.phone)}
                                helperText={touched.phone && errors.phone}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                onClick={() => formik.handleSubmit()}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                endIcon={<AddIcon />}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Paper>
    );
};

export default AddNewStaffForm;
