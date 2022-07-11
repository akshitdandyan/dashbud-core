import { colors, Grid } from "@mui/material";
import LoginForm from "../../Components/Forms/LoginForm";
import AuthPageIllustration from "../../Components/Media/AuthPageIllustration";

const Login: React.FC = () => {
  return (
    <div
      className="midbox"
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        background: colors.blue[500],
      }}
    >
      <Grid
        container
        className="midbox"
        style={{
          background: colors.blue[50],
          width: "max-content",
        }}
      >
        <Grid item>
          <AuthPageIllustration />
        </Grid>
        <Grid item>
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
