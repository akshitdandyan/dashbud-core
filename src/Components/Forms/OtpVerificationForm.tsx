import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useState } from "react";
import { SEND_OTP_TO_USER_PHONE } from "../../GraphQL/Mutations/user";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

type Props = {
    setShowNewPasswordForm: (showNewPasswordForm: boolean) => void;
    setShowOtpVerificationForm: (showOtpVerificationForm: boolean) => void;
    phone: string;
    userId: string;
    instituteId: string;
};

const OtpVerificationForm: React.FC<Props> = ({
    setShowNewPasswordForm,
    setShowOtpVerificationForm,
    phone,
    instituteId,
    userId,
}) => {
    const [verifyOtpButtonColor, setVerifyOtpButtonColor] = useState<
        "primary" | "success"
    >("primary");
    const [sendOtpToUserPhone, { loading, data, error }] = useMutation(
        SEND_OTP_TO_USER_PHONE
    );

    const otpVerificationFormSchema = Yup.object().shape({
        otp: Yup.string().required("Please enter the otp"),
    });

    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema: otpVerificationFormSchema,
        onSubmit: async (values) => {
            sendOtpToUserPhone({
                variables: {
                    otp: values.otp,
                    type: "verifyOtp",
                    userId,
                    phone,
                    instituteId,
                },
            }).then(() => {
                setVerifyOtpButtonColor("success");
                setShowNewPasswordForm(true);
                setShowOtpVerificationForm(false);
            });
        },
    });

    return (
        <div>
            <TextField
                name="otp"
                id="otp"
                required
                fullWidth
                label="Enter OTP Code"
                autoFocus
                value={formik.values.otp}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.otp && formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
            />
            <LoadingButton
                loading={loading}
                onClick={() => formik.handleSubmit()}
            >
                Verify
            </LoadingButton>
        </div>
    );
};

export default OtpVerificationForm;
