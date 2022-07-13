import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Components/Media/Logo";
import { LOGIN_USER } from "../../GraphQL/Queries/user";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const [loginUser, { loading, data, error, called }] =
        useLazyQuery(LOGIN_USER);

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
            <Paper style={{ padding: 50 }}>
                <Stack direction="row">
                    <Logo
                        height={120}
                        width={120}
                        title="Simon School of Art"
                        tagline="Color your life!"
                        imgUrl="https://ik.imagekit.io/iiry8n8p3/institutionLogo/simon_art_school_TW-DqO-Jx.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1654004427914"
                    />
                    <Logo height={120} width={120} />
                </Stack>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                style={{ borderRadius: "24px" }}
                                autoComplete="username"
                                label="Email or Phone Number"
                                {...getFieldProps("email")}
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
                                autoComplete="current-password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                {...getFieldProps("password")}
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
                                error={Boolean(
                                    touched.password && errors.password
                                )}
                                helperText={touched.password && errors.password}
                            />
                            <Button
                                onClick={() => handleSubmit()}
                                variant="contained"
                                disableElevation
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
                    >
                        Login with Google
                    </Button>
                    <Button endIcon={<Sms />} variant="outlined" color="info">
                        Login with OTP
                    </Button>
                </Stack>
            </Paper>
        </div>
    );
};

export default LoginForm;
