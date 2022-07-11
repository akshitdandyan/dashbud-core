import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Paper,
    TextField,
    styled,
    Autocomplete,
} from "@mui/material";
import { useFormik } from "formik";
import { Address } from "../../../types/common";
import { NewInstituteFormStep } from "../../../types/forms";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackwardIcon from "@mui/icons-material/ArrowBack";
import { IndianStates } from "../../../Utils/constants";
import IndianCities from "../../../Utils/IndianCities.json";
import { useZustandNewInstituteRegistration } from "../../../Store/newInstituteRegistration";
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

const AddressForm: React.FC<Props> = ({ setFormType }) => {
    const typedIndiaCities: {
        [key: string]: string[];
    } = IndianCities;
    const dataInZustand = useZustandNewInstituteRegistration(
        (state) => state.instituteAddress
    );

    const setDataInZustand = useZustandNewInstituteRegistration(
        (state) => state.setInstituteAddress
    );
    const addressFormSchema = Yup.object().shape({
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        details: Yup.string().required(
            "Enter details like landmark, home no., etc."
        ),
        zipcode: Yup.string().required("Zipcode is required"),
    });

    const formik = useFormik<Address>({
        initialValues:
            dataInZustand === null
                ? {
                      city: "",
                      state: "",
                      details: "",
                      zipcode: "",
                      town: "",
                      village: "",
                  }
                : dataInZustand,
        validationSchema: addressFormSchema,
        onSubmit: (data) => {
            setDataInZustand(data);
            setFormType("registrantDetails_2");
        },
    });

    const { errors, touched } = formik;

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
                                    label="Address of Institute"
                                    color="primary"
                                    style={{ cursor: "pointer" }}
                                />
                            </Divider>
                        </Root>

                        <Grid container spacing={2} sx={{ marginTop: "12px" }}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="state"
                                    fullWidth
                                    options={IndianStates}
                                    onSelect={formik.handleChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={Boolean(
                                                touched.state && errors.state
                                            )}
                                            helperText={
                                                touched.state && errors.state
                                            }
                                            required
                                            label="State"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="city"
                                    options={
                                        formik.values.state
                                            ? typedIndiaCities[
                                                  formik.values.state
                                              ]
                                            : []
                                    }
                                    onSelect={formik.handleChange}
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            error={Boolean(
                                                touched.city && errors.city
                                            )}
                                            helperText={
                                                touched.city && errors.city
                                            }
                                            label="City"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="zipcode"
                                    id="zipcode"
                                    required
                                    fullWidth
                                    InputProps={{ inputMode: "numeric" }}
                                    label="Zipcode"
                                    autoFocus
                                    value={formik.values.zipcode}
                                    onChange={formik.handleChange}
                                    error={Boolean(
                                        touched.zipcode && errors.zipcode
                                    )}
                                    helperText={
                                        touched.zipcode && errors.zipcode
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="details"
                                    id="details"
                                    required
                                    fullWidth
                                    label="Area Details"
                                    autoFocus
                                    value={formik.values.details}
                                    onChange={formik.handleChange}
                                    rows={4}
                                    error={Boolean(
                                        touched.details && errors.details
                                    )}
                                    helperText={
                                        touched.details && errors.details
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="town"
                                    id="town"
                                    fullWidth
                                    label="Town (Optional)"
                                    autoFocus
                                    value={formik.values.town}
                                    onChange={formik.handleChange}
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="village"
                                    id="village"
                                    fullWidth
                                    label="Village (Optional)"
                                    autoFocus
                                    value={formik.values.village}
                                    onChange={formik.handleChange}
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    onClick={() =>
                                        setFormType("instituteDetails_0")
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

export default AddressForm;
