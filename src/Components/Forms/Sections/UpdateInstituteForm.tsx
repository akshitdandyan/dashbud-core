import { Address } from "../../../types/common";
import { Institute } from "../../../types/institution";
import * as Yup from "yup";
import { useFormik } from "formik";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
    Autocomplete,
    Button,
    Chip,
    Divider,
    Grid,
    Paper,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { uploadMedia } from "../../../RestApi/media";
import { IndianStates } from "../../../Utils/constants";
import IndianCities from "../../../Utils/IndianCities.json";
import { UPDATE_INSTITUTE_DETAILS } from "../../../GraphQL/Mutations/adminActions";
import { useMutation } from "@apollo/client";

type Props = {
    institute: Institute<Address>;
};

const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) + :not(style)": {
        marginTop: theme.spacing(5),
    },
}));

const UpdateInstituteForm: React.FC<Props> = ({ institute }) => {
    const typedIndiaCities: {
        [key: string]: string[];
    } = IndianCities;
    const [logoUploading, setLogoUploading] = useState(false);
    const [logoError, setLogoError] = useState("");

    const [updateDetails] = useMutation(UPDATE_INSTITUTE_DETAILS);

    const instituteFormSchema = Yup.object().shape({
        instituteName: Yup.string().required("Please fill your institute name"),
        instituteType: Yup.string().required("Required"),
        institutePhone: Yup.string().required(
            "Please provide institute's phone number"
        ),
        instituteTagline: Yup.string().required(
            "Fill institute's slogan or tagline"
        ),
        instituteLogoUrl: Yup.string().url().required("Required"),
    });

    const addressFormSchema = Yup.object().shape({
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        details: Yup.string().required(
            "Enter details like landmark, home no., etc."
        ),
        zipcode: Yup.string().required("Zipcode is required"),
    });

    const instituteFormik = useFormik<Institute<null>>({
        initialValues: { ...institute, instituteAddress: null },
        validationSchema: instituteFormSchema,
        onSubmit: (data) => {
            console.log("updated institute data", data);
        },
    });

    const addressFormik = useFormik<Address>({
        initialValues: institute.instituteAddress ?? {
            city: "",
            state: "",
            details: "",
            zipcode: "",
            town: "",
            village: "",
        },
        validationSchema: addressFormSchema,
        onSubmit: (data) => {
            console.log("updated address data", data);
        },
    });

    const { errors, touched, setFieldValue } = instituteFormik;

    const handleSubmit = async () => {
        console.log("updated data", instituteFormik.values);
        console.log("updated address data", addressFormik.values);
        const r = await updateDetails({
            variables: {
                ...instituteFormik.values,
                ...addressFormik.values,
            },
        });
        console.log("r", r);
    };

    return (
        <Grid item>
            <Paper elevation={4}>
                <Container maxWidth="xs">
                    <Box
                        component="form"
                        sx={{
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
                            <Grid item xs={12}>
                                <TextField
                                    name="instituteName"
                                    id="instituteName"
                                    required
                                    fullWidth
                                    label="Institute Name"
                                    autoFocus
                                    value={instituteFormik.values.instituteName}
                                    onChange={instituteFormik.handleChange}
                                    error={Boolean(
                                        touched.instituteName &&
                                            errors.instituteName
                                    )}
                                    helperText={
                                        touched.instituteName &&
                                        errors.instituteName
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="instituteTagline"
                                    id="instituteTagline"
                                    required
                                    fullWidth
                                    label="Tagline or Slogan"
                                    autoFocus
                                    value={
                                        instituteFormik.values.instituteTagline
                                    }
                                    onChange={instituteFormik.handleChange}
                                    error={Boolean(
                                        touched.instituteTagline &&
                                            errors.instituteTagline
                                    )}
                                    helperText={
                                        touched.instituteTagline &&
                                        errors.instituteTagline
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="institutePhone"
                                    id="institutePhone"
                                    required
                                    fullWidth
                                    InputProps={{ inputMode: "numeric" }}
                                    label="Contact Number"
                                    autoFocus
                                    value={
                                        instituteFormik.values.institutePhone
                                    }
                                    onChange={instituteFormik.handleChange}
                                    error={Boolean(
                                        touched.institutePhone &&
                                            errors.institutePhone
                                    )}
                                    helperText={
                                        touched.institutePhone &&
                                        errors.institutePhone
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    Institute Logo
                                </Typography>
                                {/* <br /> */}
                                <LoadingButton
                                    variant="contained"
                                    component="label"
                                    loading={logoUploading}
                                >
                                    Upload File
                                    <input
                                        type="file"
                                        hidden
                                        multiple={false}
                                        onChange={async (e) => {
                                            if (!e.target.files?.length) {
                                                return;
                                            }
                                            const file = e.target.files[0];
                                            if (file.size > 5000000) {
                                                return setLogoError(
                                                    "Logo image size should be less than 5MB"
                                                );
                                            }
                                            setLogoUploading(true);
                                            const { data, error } =
                                                await uploadMedia({
                                                    file,
                                                });
                                            setLogoUploading(false);
                                            if (error) {
                                                return setLogoError(error);
                                            }
                                            if (data?.logoUrl) {
                                                setLogoError("");
                                                setFieldValue(
                                                    "instituteLogoUrl",
                                                    data.logoUrl
                                                );
                                            }
                                        }}
                                    />
                                </LoadingButton>
                                {logoError && (
                                    <Typography variant="subtitle2" color="red">
                                        {logoError}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        <Root sx={{ marginTop: 4 }}>
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
                                    onSelect={addressFormik.handleChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            value={addressFormik.values.state}
                                            error={Boolean(
                                                addressFormik.touched?.state &&
                                                    addressFormik.errors?.state
                                            )}
                                            helperText={
                                                addressFormik.touched?.state &&
                                                addressFormik.errors?.state
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
                                        addressFormik.values.city
                                            ? typedIndiaCities[
                                                  addressFormik.values.city
                                              ]
                                            : []
                                    }
                                    onSelect={addressFormik.handleChange}
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            value={addressFormik.values.city}
                                            required
                                            error={Boolean(
                                                addressFormik.touched?.city &&
                                                    addressFormik.errors?.city
                                            )}
                                            helperText={
                                                addressFormik.touched?.city &&
                                                addressFormik.errors?.city
                                            }
                                            label="City"
                                            name="city"
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
                                    value={addressFormik.values.zipcode}
                                    onChange={addressFormik.handleChange}
                                    error={Boolean(
                                        addressFormik.touched?.zipcode &&
                                            addressFormik.errors?.zipcode
                                    )}
                                    helperText={
                                        addressFormik.touched?.zipcode &&
                                        addressFormik.errors?.zipcode
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
                                    value={addressFormik.values.details}
                                    onChange={addressFormik.handleChange}
                                    rows={4}
                                    error={Boolean(
                                        addressFormik.touched?.details &&
                                            addressFormik.errors?.details
                                    )}
                                    helperText={
                                        addressFormik.touched?.details &&
                                        addressFormik.errors?.details
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
                                    value={addressFormik.values.town}
                                    onChange={addressFormik.handleChange}
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
                                    value={addressFormik.values.village}
                                    onChange={addressFormik.handleChange}
                                    rows={4}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            onClick={() => handleSubmit()}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            endIcon={<CheckCircleOutlineIcon />}
                        >
                            Update
                        </Button>
                    </Box>
                </Container>
            </Paper>
        </Grid>
    );
};

export default UpdateInstituteForm;
