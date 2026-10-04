import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Eye, EyeSlash } from "phosphor-react";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/slices/actions/authActions";

import FormProvider, { RHFTextField } from "../../components/hook-form";

const LoginForm = () => {
  // dispatch from redux
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // hide and show password controller
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef(null);

  // Login Schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email Required").email("Invalid Email"),
    password: Yup.string()
      .required("Password Required")
      .min(8, "Password must be atleast 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });

  // Labels
  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(LoginUser({ ...data, recaptchaRef }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField name="email" label="Your email" placeholder="e.g. alex@example.com" />
        <RHFTextField
          name="password"
          label="Your password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
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
        sx={{
          mt: 3,
          bgcolor: "#111111",
          color: "common.white",
          borderRadius: 2,
          "&:hover": { bgcolor: "#303030" },
        }}
      >
        Sign in
      </LoadingButton>
    </FormProvider>
  );
};

export default LoginForm;
