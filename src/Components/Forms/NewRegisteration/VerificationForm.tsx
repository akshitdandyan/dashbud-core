import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Paper,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { NewInstituteFormStep } from "../../../types/forms";
import * as Yup from "yup";
import { useZustandNewInstituteRegistration } from "../../../Store/newInstituteRegistration";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_OTP_TO_REGISTRANT_PHONE } from "../../../GraphQL/Mutations/newRegister";
import { LoadingButton } from "@mui/lab";
import { ThumbUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

const VerificationForm: React.FC<Props> = ({ setFormType }) => {
    const navigate = useNavigate();
    const [verificationFormType, setVerificationFormType] = useState<
        "confirmPhone" | "updatePhone" | "otpForm"
    >("confirmPhone");
    const [verifyOtpButtonColor, setVerifyOtpButtonColor] = useState<
        "primary" | "success"
    >("primary");

    const data = useZustandNewInstituteRegistration();

    const [sendOtpToRegistrantPhone, status] = useMutation(
        SEND_OTP_TO_REGISTRANT_PHONE
    );

    const updatedMobileNumberFormSchema = Yup.object().shape({
        phoneOtp: Yup.string().required("OTP is required").min(6).max(6),
        updatedMobileNumber: Yup.string().required("Mobile is required"),
    });

    const updatedMobileNumberFormik = useFormik<{
        updatedMobileNumber: string;
    }>({
        initialValues: {
            updatedMobileNumber: "",
        },
        validationSchema: updatedMobileNumberFormSchema,
        onSubmit: (values) => {
            if (!data || !data.institute || !data.instituteRegistrant) {
                return;
            }
            sendOtpToRegistrantPhone({
                variables: {
                    instituteId: data.institute.id,
                    registrantId: data.instituteRegistrant.id,
                    phone: values.updatedMobileNumber,
                    type: "sendOtp",
                    otp: "null",
                },
            });
        },
    });

    const otpVerificationFormSchema = Yup.object().shape({
        phoneOtp: Yup.string().required("OTP is required").min(6).max(6),
    });

    const otpVerificationFormik = useFormik<{ phoneOtp: string }>({
        initialValues: {
            phoneOtp: "",
        },
        validationSchema: otpVerificationFormSchema,
        onSubmit: async (values) => {
            if (
                !data ||
                !data.institute ||
                !data.instituteRegistrant ||
                !values.phoneOtp
            ) {
                return;
            }
            const { data: graphData, errors } = await sendOtpToRegistrantPhone({
                variables: {
                    instituteId: data.institute.id,
                    registrantId: data.instituteRegistrant.id,
                    phone: data.instituteRegistrant.phone,
                    type: "verifyOtp",
                    otp: values.phoneOtp,
                },
            });
            if (graphData && !errors) {
                setVerifyOtpButtonColor("success");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            }
        },
    });

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
                                    label="OTP Verification"
                                    color="primary"
                                    style={{ cursor: "pointer" }}
                                />
                            </Divider>
                        </Root>

                        <Grid container spacing={2} sx={{ marginTop: "12px" }}>
                            {verificationFormType === "confirmPhone" ? (
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            {data.instituteRegistrant
                                                ? data.instituteRegistrant.phone
                                                : "Not found"}
                                        </Typography>
                                        <Typography variant="body2">
                                            Is this phone number correct ?
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            onClick={() =>
                                                setVerificationFormType(
                                                    "updatePhone"
                                                )
                                            }
                                            fullWidth
                                            variant="outlined"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={
                                                !updatedMobileNumberFormik.isValid
                                            }
                                        >
                                            Change
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            onClick={() => {
                                                if (
                                                    !data ||
                                                    !data.institute ||
                                                    !data.instituteRegistrant
                                                ) {
                                                    return;
                                                }
                                                sendOtpToRegistrantPhone({
                                                    variables: {
                                                        instituteId:
                                                            data.institute.id,
                                                        registrantId:
                                                            data
                                                                .instituteRegistrant
                                                                .id,
                                                        phone: data
                                                            .instituteRegistrant
                                                            .phone,
                                                        type: "sendOtp",
                                                        otp: "null",
                                                    },
                                                }).then(() =>
                                                    setVerificationFormType(
                                                        "otpForm"
                                                    )
                                                );
                                            }}
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={
                                                !updatedMobileNumberFormik.isValid
                                            }
                                        >
                                            Yes, send otp
                                        </Button>
                                    </Grid>
                                </>
                            ) : verificationFormType === "updatePhone" ? (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="updatedMobileNumber"
                                            id="updatedMobileNumber"
                                            required
                                            fullWidth
                                            label="Enter Mobile Number"
                                            autoFocus
                                            value={
                                                updatedMobileNumberFormik.values
                                                    .updatedMobileNumber
                                            }
                                            onChange={
                                                updatedMobileNumberFormik.handleChange
                                            }
                                            error={Boolean(
                                                updatedMobileNumberFormik
                                                    .touched
                                                    .updatedMobileNumber &&
                                                    updatedMobileNumberFormik
                                                        .errors
                                                        .updatedMobileNumber
                                            )}
                                            helperText={
                                                updatedMobileNumberFormik
                                                    .touched
                                                    .updatedMobileNumber &&
                                                updatedMobileNumberFormik.errors
                                                    .updatedMobileNumber
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <LoadingButton
                                            onClick={() =>
                                                updatedMobileNumberFormik.handleSubmit()
                                            }
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={
                                                !updatedMobileNumberFormik.isValid
                                            }
                                            loading={status.loading}
                                        >
                                            Send Otp
                                        </LoadingButton>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="phoneOtp"
                                            id="phoneOtp"
                                            required
                                            fullWidth
                                            label="Enter OTP Code"
                                            autoFocus
                                            value={
                                                otpVerificationFormik.values
                                                    .phoneOtp
                                            }
                                            onChange={
                                                otpVerificationFormik.handleChange
                                            }
                                            error={Boolean(
                                                otpVerificationFormik.touched
                                                    .phoneOtp &&
                                                    otpVerificationFormik.errors
                                                        .phoneOtp
                                            )}
                                            helperText={
                                                otpVerificationFormik.touched
                                                    .phoneOtp &&
                                                otpVerificationFormik.errors
                                                    .phoneOtp
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <LoadingButton
                                            onClick={() =>
                                                verifyOtpButtonColor ===
                                                "primary"
                                                    ? otpVerificationFormik.handleSubmit()
                                                    : null
                                            }
                                            fullWidth
                                            variant={
                                                verifyOtpButtonColor ===
                                                "success"
                                                    ? "outlined"
                                                    : "contained"
                                            }
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={
                                                !otpVerificationFormik.isValid
                                            }
                                            loading={status.loading}
                                            color={verifyOtpButtonColor}
                                            startIcon={
                                                verifyOtpButtonColor ===
                                                "success" ? (
                                                    <ThumbUp />
                                                ) : null
                                            }
                                        >
                                            {verifyOtpButtonColor === "success"
                                                ? "Verified"
                                                : "Verify"}
                                        </LoadingButton>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Box>
                </Container>
            </Paper>
        </Grid>
    );
};

export default VerificationForm;
