import { Box, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { NewRegistrationSteps } from "../../Utils/constants";
import InstituteForm from "../../Components/Forms/NewRegisteration/InsituteForm";
import { NewInstituteFormStep } from "../../types/forms";
import AddressForm from "../../Components/Forms/NewRegisteration/AddressForm";
import RegistrantForm from "../../Components/Forms/NewRegisteration/RegistrantForm";
import VerificationForm from "../../Components/Forms/NewRegisteration/VerificationForm";

const Register: React.FC = () => {
    const [formType, setFormType] =
        useState<NewInstituteFormStep>("instituteDetails_0");

    return (
        <Box style={{ paddingTop: 42 }}>
            <Container>
                <Stepper
                    activeStep={Number(formType.split("_")[1])}
                    alternativeLabel
                >
                    {NewRegistrationSteps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Grid container>
                    {formType === "instituteDetails_0" ? (
                        <InstituteForm {...{ setFormType }} />
                    ) : formType === "instituteAddress_1" ? (
                        <AddressForm {...{ setFormType }} />
                    ) : formType === "registrantDetails_2" ? (
                        <RegistrantForm {...{ setFormType }} />
                    ) : formType === "verification_3" ? (
                        <VerificationForm {...{ setFormType }} />
                    ) : null}
                </Grid>
            </Container>
        </Box>
    );
};

export default Register;
