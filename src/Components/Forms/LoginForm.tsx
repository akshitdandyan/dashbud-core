import { useLazyQuery } from "@apollo/client";
import { Google, Sms, Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Button,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import Logo from "../../Components/Media/Logo";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { LOGIN_USER } from "../../GraphQL/Queries/user";

const LoginForm = () => {
    const theme = useTheme();
    let isSm = useMediaQuery(theme.breakpoints.down("sm"));

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const [loginUser] = useLazyQuery(LOGIN_USER);

    const formik = useFormik({
        initialValues: {
            identifier: "",
            password: "",
        },
        onSubmit: async (formData) => {
            const a = await loginUser({
                variables: {
                    identifier: formData.identifier,
                    password: formData.password,
                },
            });
            console.log(a);
            if (a?.data?.loginUser?.jwtToken) {
                localStorage.setItem("userToken", a.data.loginUser.jwtToken);
                navigate("/dashboard");
            }
        },
    });

    const { errors, touched, handleSubmit, getFieldProps } = formik;
    return (
        <div>
            <Paper
                sx={{
                    padding: { xs: "15px", sm: "40px" },
                    borderRadius: { sm: "0px", md: "3px" },
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Stack direction="row">
                    <Logo
                        height={isSm ? 60 : 120}
                        width={isSm ? 60 : 120}
                        title="Simon School of Art"
                        tagline="Color your life!"
                        imgUrl="https://ik.imagekit.io/iiry8n8p3/institutionLogo/simon_art_school_TW-DqO-Jx.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1654004427914"
                    />
                    <Logo height={isSm ? 60 : 120} width={isSm ? 60 : 120} />
                </Stack>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                style={{ borderRadius: "24px" }}
                                autoComplete="username"
                                type="email"
                                label="Email address"
                                {...getFieldProps("email")}
                                sx={{ width: { xs: "300px", sm: "400px" } }}
                                error={Boolean(
                                    touched.identifier && errors.identifier
                                )}
                                helperText={
                                    touched.identifier && errors.identifier
                                }
                                onChange={formik.handleChange}
                                name="identifier"
                                id="identifier"
                            />
                            <TextField
                                style={{ borderRadius: "24px" }}
                                sx={{ width: { xs: "300px", sm: "400px" } }}
                                autoComplete="current-password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                {...getFieldProps("password")}
                                error={Boolean(
                                    touched.password && errors.password
                                )}
                                helperText={touched.password && errors.password}
                                onChange={formik.handleChange}
                                name="password"
                                id="password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword((s) => !s)
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                variant="contained"
                                disableElevation
                                sx={{ width: { xs: "300px", sm: "400px" } }}
                                onClick={() => formik.handleSubmit()}
                            >
                                Login
                            </Button>
                        </Stack>
                    </Form>
                </FormikProvider>
                <Stack spacing={2} marginTop={2}>
                    <Button
                        endIcon={<Google />}
                        variant="outlined"
                        color="info"
                        sx={{ width: { xs: "300px", sm: "400px" } }}
                    >
                        Login with Google
                    </Button>
                    <Button
                        endIcon={<Sms />}
                        variant="outlined"
                        color="info"
                        sx={{ width: { xs: "300px", sm: "400px" } }}
                    >
                        Login with OTP
                    </Button>
                </Stack>
            </Paper>
        </div>
    );
};

export default LoginForm;
