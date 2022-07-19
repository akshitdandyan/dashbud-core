import { useLazyQuery } from "@apollo/client";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { VERIFY_INVITATION } from "../../GraphQL/Queries/user";

const Invitation: React.FC = () => {
    const { verificationToken } = useParams();
    const [verifyInvitation, { loading, data, error }] =
        useLazyQuery(VERIFY_INVITATION);

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
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default Invitation;
