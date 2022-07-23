import { useLazyQuery, useMutation } from "@apollo/client";
import { LoadingButton } from "@mui/lab";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewPasswordForm from "../../Components/Forms/NewPasswordForm";
import OtpVerificationForm from "../../Components/Forms/OtpVerificationForm";
import { SEND_OTP_TO_USER_PHONE } from "../../GraphQL/Mutations/user";
import { VERIFY_INVITATION } from "../../GraphQL/Queries/user";

const Invitation: React.FC = () => {
    const { verificationToken } = useParams();
    const [verifyInvitation, { loading, data, error }] =
        useLazyQuery(VERIFY_INVITATION);

    const [sendingOtp, setSendingOtp] = useState(false);
    const [showSendOtpButton, setShowSendOtpButton] = useState(true);
    const [showOtpVerificationForm, setShowOtpVerificationForm] =
        useState(false);
    const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
    const [sendOtpToUserPhone, status] = useMutation(SEND_OTP_TO_USER_PHONE);

    useEffect(() => {
        verifyInvitation({ variables: { verificationToken } });
    }, [verificationToken, verifyInvitation]);

    console.log("loading", loading);
    console.log("data", data);
    console.log("error", error);

    return (
        <div>
            {loading && (
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                    <LinearProgress color="primary" />
                </Stack>
            )}
            <Box className="midbox" sx={{ width: "100vw", height: "100vh" }}>
                {loading ? (
                    <Typography variant="h5">
                        Verifying your invitation...
                    </Typography>
                ) : (
                    <Box className="midbox">
                        <img
                            src={
                                data?.verifyInvitation?.institute
                                    ?.instituteLogoUrl
                            }
                            alt={
                                data?.verifyInvitation?.institute.instituteName
                            }
                            height="180px"
                        />
                        <Typography variant="h5">
                            {data?.verifyInvitation?.institute.instituteName}
                        </Typography>
                        <Typography variant="caption" color="GrayText">
                            {data?.verifyInvitation?.institute.instituteTagline}
                        </Typography>
                        {showSendOtpButton && (
                            <LoadingButton
                                loading={sendingOtp}
                                onClick={() => {
                                    setSendingOtp(true);
                                    sendOtpToUserPhone({
                                        variables: {
                                            instituteId:
                                                data?.verifyInvitation
                                                    ?.institute._id,
                                            userId: data?.verifyInvitation?.user
                                                ._id,
                                            phone: data?.verifyInvitation?.user
                                                .phone,
                                            type: "sendOtp",
                                            otp: "null",
                                        },
                                    })
                                        .then((res) => {
                                            if (!res.errors) {
                                                setSendingOtp(false);
                                                setShowOtpVerificationForm(
                                                    true
                                                );
                                                setShowSendOtpButton(false);
                                                return;
                                            }
                                            console.log(res);
                                        })
                                        .catch((e) => {
                                            console.log(e);
                                        });
                                    setSendingOtp(true);
                                }}
                            >
                                Send OTP
                            </LoadingButton>
                        )}
                        {showOtpVerificationForm && (
                            <OtpVerificationForm
                                {...{
                                    setShowNewPasswordForm,
                                    setShowOtpVerificationForm,
                                    phone: data?.verifyInvitation?.user.phone,
                                    userId: data?.verifyInvitation?.user._id,
                                    instituteId:
                                        data?.verifyInvitation?.institute?._id,
                                }}
                            />
                        )}
                        {showNewPasswordForm && <NewPasswordForm />}
                    </Box>
                )}
            </Box>
        </div>
    );
};
export default Invitation;

// bring otp textfield in this component
