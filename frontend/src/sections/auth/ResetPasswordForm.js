import * as Yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";
import { LoadingButton } from "@mui/lab";
import { useSearchParams } from "react-router-dom";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../../redux/slices/actions/authActions";

import FormProvider, { RHFTextField } from "../../components/hook-form";

const ResetPasswordForm = () => {
  // dispatch from redux
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // for getting token from url
  const [queryParameters] = useSearchParams();

  // hide and show password controller
  const [showPassword, setShowPassword] = useState(false);

  //  Login Schema
  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password Required")
      .min(8, "Password must be atleast 8 characters long")
      .max(16, "Password cannot be more that 16 characters")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),

    passwordConfirm: Yup.string()
      .required("Password Required")
      .oneOf([Yup.ref("password"), null], "Password does not match"),
  });

  //   Labels
  const defaultValues = {
    password: "",
    passwordConfirm: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      // api request to backend for new password using redux
      dispatch(ResetPassword({ ...data, token: queryParameters.get("code") }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField
          name="password"
          label="New password"
          placeholder="Enter a new password"
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
        <RHFTextField
          name="passwordConfirm"
          label="Confirm new password"
          placeholder="Re-enter your new password"
          type={showPassword ? "text" : "password"}
        />
        <LoadingButton
          loading={isLoading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{ mt: 1, bgcolor: "#111", color: "#fff", borderRadius: 2, "&:hover": { bgcolor: "#303030" } }}
        >
          Update password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
