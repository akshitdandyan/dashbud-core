import {
    Button,
    Chip,
    Divider,
    Grid,
    Paper,
    styled,
    TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { NewInstituteFormStep } from "../../../types/forms";
import { InstituteRegistrant } from "../../../types/institution";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackwardIcon from "@mui/icons-material/ArrowBack";
import { Box, Container } from "@mui/system";
import { useZustandNewInstituteRegistration } from "../../../Store/newInstituteRegistration";
import { useMutation } from "@apollo/client";
import { REGISTER_NEW_INSTITUTE_AND_REGISTRANT } from "../../../GraphQL/Mutations/newRegister";
import * as Yup from "yup";

type Props = {
    setFormType: (step: NewInstituteFormStep) => void;
};

const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) + :not(style)": {
        marginTop: theme.spacing(5),
    },
}));

const RegistrantForm: React.FC<Props> = ({ setFormType }) => {
    const zusData = useZustandNewInstituteRegistration();
    const setDataInZustand = useZustandNewInstituteRegistration(
        (state) => state.setInstituteRegistrant
    );

    const [addInstituteAndRegistrant, status] = useMutation(
        REGISTER_NEW_INSTITUTE_AND_REGISTRANT
    );

    const registrantFormSchema = Yup.object().shape({
        firstname: Yup.string().required("First name is required"),
        lastname: Yup.string().required("Last name is required"),
        email: Yup.string().required("Email is required"),
        phone: Yup.string().required("Phone is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik<InstituteRegistrant>({
        initialValues:
            zusData.instituteRegistrant === null
                ? {
                      firstname: "",
                      lastname: "",
                      email: "",
                      phone: "",
                      password: "",
                  }
                : zusData.instituteRegistrant,
        validationSchema: registrantFormSchema,
        onSubmit: async (data) => {
            setDataInZustand(data);
            const r = await addInstituteAndRegistrant({
                variables: {
                    ...zusData.institute,
                    ...zusData.instituteAddress,
                    ...data,
                },
            });
            console.log("r", r);

            if (!r.errors && r.data) {
                const instituteId: string =
                    r.data.addNewInstituteAndRegistrant.institute._id;
                const registrantId: string =
                    r.data.addNewInstituteAndRegistrant.registrant._id;
                zusData.setInstituteAndRegistrantIds(instituteId, registrantId);
                if (r.data.addNewInstituteAndRegistrant.jwtToken) {
                    console.log(
                        "r.data.addNewInstituteAndRegistrant.jwtToken",
                        r.data.addNewInstituteAndRegistrant.jwtToken
                    );
                    document.cookie = `userToken=${r.data.addNewInstituteAndRegistrant.jwtToken}`;
                    localStorage.setItem(
                        "userToken",
                        r.data.addNewInstituteAndRegistrant.jwtToken
                    );
                }
            }
            setFormType("verification_3");
        },
    });

    const { touched, errors } = formik;
    return (
        <Grid item>
            <Paper elevation={4}>
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
                                    label="Basic Details"
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
                                    helperText={
                                        touched.lastname && errors.lastname
                                    }
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
                                    error={Boolean(
                                        touched.email && errors.email
                                    )}
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
                                    error={Boolean(
                                        touched.phone && errors.phone
                                    )}
                                    helperText={touched.phone && errors.phone}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="password"
                                    id="password"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    autoFocus
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={Boolean(
                                        touched.password && errors.password
                                    )}
                                    helperText={
                                        touched.password && errors.password
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    onClick={() =>
                                        setFormType("instituteAddress_1")
                                    }
                                    fullWidth
                                    variant="outlined"
                                    color="info"
                                    sx={{ mt: 3, mb: 2 }}
                                    startIcon={<ArrowBackwardIcon />}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    onClick={() => formik.handleSubmit()}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    endIcon={<ArrowForwardIcon />}
                                >
                                    Continue
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Paper>
        </Grid>
    );
};

export default RegistrantForm;
