import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from "../../redux/slices/actions/authActions";

import FormProvider, { RHFTextField } from "../../components/hook-form";

const ForgotPasswordForm = () => {
  // from redux
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const recaptchaRef = useRef(null);

  //  Login Schema
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required("Email Required").email("Invalid Email"),
  });

  //   Labels
  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      // reset-password api call using redux
      dispatch(ForgotPassword({ ...data, recaptchaRef }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField
          name="email"
          label="Email address"
          placeholder="you@example.com"
        />

        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT}
          theme="dark"
        />

        <LoadingButton
          loading={isLoading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{ mt: 1, bgcolor: "#111", color: "#fff", borderRadius: 2, "&:hover": { bgcolor: "#303030" } }}
        >
          Send reset link
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
