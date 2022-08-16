import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { SEND_OTP_TO_USER_PHONE } from "../../GraphQL/Mutations/user";
import * as Yup from "yup";
import { TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const NewPasswordForm: React.FC = () => {
    const [setUserNewPassword] = useMutation(SEND_OTP_TO_USER_PHONE);

    const newPasswordFormSchema = Yup.object().shape({
        newPassword: Yup.string().required("Choose a valid password"),
        confirmPassword: Yup.string().required("Confirm your password"),
    });

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: newPasswordFormSchema,
        onSubmit: async (values) => {
            if (values.newPassword !== values.confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            setUserNewPassword({
                variables: {
                    userId: "",
                    newPassword: values.newPassword,
                    confirmPassword: values.confirmPassword,
                },
            });
        },
    });

    return (
        <div>
            <Typography variant="subtitle2" sx={{ marginTop: "1rem" }}>
                Choose a password for your dashbud account
            </Typography>
            <TextField
                name="newPassword"
                id="newPassword"
                required
                fullWidth
                label="Choose new password"
                autoFocus
                type="password"
                sx={{ marginTop: "0.4rem" }}
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={Boolean(
                    formik.touched.newPassword && formik.errors.newPassword
                )}
                helperText={
                    formik.touched.newPassword && formik.errors.newPassword
                }
            />
            <TextField
                name="confirmPassword"
                id="confirmPassword"
                required
                fullWidth
                label="Confirm new password"
                autoFocus
                type="password"
                sx={{ marginTop: "1rem" }}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={Boolean(
                    formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                )}
                helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                }
            />
            <LoadingButton sx={{ marginTop: "1rem" }} variant="contained">
                Reset Password
            </LoadingButton>
        </div>
    );
};

export default NewPasswordForm;
