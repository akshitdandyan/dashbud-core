import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useState } from "react";
import { SEND_OTP_TO_USER_PHONE } from "../../GraphQL/Mutations/user";
import * as Yup from "yup";

const OtpVerificationForm: React.FC = () => {
    const [verifyOtpButtonColor, setVerifyOtpButtonColor] = useState<
        "primary" | "success"
    >("primary");
    const [sendOtpToUserPhone, status] = useMutation(SEND_OTP_TO_USER_PHONE);

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
                },
            });
        },
    });

    return <div></div>;
};

export default OtpVerificationForm;
