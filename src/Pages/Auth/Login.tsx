import { colors, Box } from "@mui/material";
import LoginForm from "../../Components/Forms/LoginForm";
import AuthPageIllustration from "../../Components/Media/AuthPageIllustration";

import { styled } from "@mui/system";

const FlexBox = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
});

const FlexItem = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border: "1px solid red",
});

const Login: React.FC = () => {
    return (
        <div
            className="midbox"
            style={{
                height: "100vh",
                width: "100vw",
                overflowY: "scroll",
                position: "fixed",
                top: 0,
                left: 0,
                background: colors.blue[500],
            }}
        >
            <FlexBox>
                <FlexItem sx={{ background: colors.blue[50] }}>
                    <AuthPageIllustration />
                </FlexItem>
                <FlexItem>
                    <LoginForm />
                </FlexItem>
            </FlexBox>
        </div>
    );
};

export default Login;
