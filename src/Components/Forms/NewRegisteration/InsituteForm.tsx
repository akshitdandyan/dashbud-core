import {
    Button,
    Chip,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useFormik } from "formik";
import { Institute } from "../../../types/institution";
import { NewInstituteFormStep } from "../../../types/forms";
import { useZustandNewInstituteRegistration } from "../../../Store/newInstituteRegistration";
import { uploadMedia } from "../../../RestApi/media";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

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

const InsituteForm: React.FC<Props> = ({ setFormType }) => {
    const [logoUploading, setLogoUploading] = useState(false);
    const [logoError, setLogoError] = useState("");

    const dataInZustand = useZustandNewInstituteRegistration(
        (state) => state.institute
    );
    const setDataInZustand = useZustandNewInstituteRegistration(
        (state) => state.setInstitute
    );

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

    const formik = useFormik<Institute<null>>({
        initialValues:
            dataInZustand === null
                ? {
                      instituteName: "",
                      institutePhone: "",
                      instituteType: "university",
                      instituteLogoUrl: "",
                      instituteTagline: "",
                      features: [],
                  }
                : dataInZustand,
        validationSchema: instituteFormSchema,
        onSubmit: (data) => {
            setDataInZustand(data);
            setFormType("instituteAddress_1");
        },
    });

    const { errors, touched, setFieldValue } = formik;

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
                            <Grid item xs={12}>
                                <TextField
                                    name="instituteName"
                                    id="instituteName"
                                    required
                                    fullWidth
                                    label="Institute Name"
                                    autoFocus
                                    value={formik.values.instituteName}
                                    onChange={formik.handleChange}
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
                                    value={formik.values.instituteTagline}
                                    onChange={formik.handleChange}
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
                                    value={formik.values.institutePhone}
                                    onChange={formik.handleChange}
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
                                <FormControl
                                    sx={{ minWidth: 120 }}
                                    size="small"
                                >
                                    <InputLabel id="instituteType">
                                        Institute Type
                                    </InputLabel>
                                    <Select
                                        labelId="instituteType"
                                        id="instituteType"
                                        name="instituteType"
                                        value={formik.values.instituteType}
                                        label="Institute Type"
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="school">
                                            School
                                        </MenuItem>
                                        <MenuItem value="college">
                                            College
                                        </MenuItem>
                                        <MenuItem value="university">
                                            University
                                        </MenuItem>
                                        <MenuItem value="tution">
                                            Tution/Private Coaching
                                        </MenuItem>
                                    </Select>
                                </FormControl>
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

                        <Button
                            onClick={() => formik.handleSubmit()}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            endIcon={<ArrowForwardIcon />}
                        >
                            Continue
                        </Button>
                    </Box>
                </Container>
            </Paper>
        </Grid>
    );
};

export default InsituteForm;
