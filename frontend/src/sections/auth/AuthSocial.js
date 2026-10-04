import { Button, Divider, Stack } from "@mui/material";
import { GoogleLogo } from "phosphor-react";
import { useGoogleLogin } from "@react-oauth/google";

import { useDispatch } from "react-redux";
import { GoogleLogin } from "../../redux/slices/actions/authActions";
import { ShowSnackbar } from "../../redux/slices/userSlice";

const AuthSocial = () => {
  const dispatch = useDispatch();

  // ---------- inner functions ----------

  const showSnackbar = (socialType) => {
    dispatch(
      ShowSnackbar({
        severity: "error",
        message: `Unable to login using ${socialType}`,
      })
    );
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(GoogleLogin(tokenResponse));
    },
    onError: (error) => {
      showSnackbar("google");
      console.log(error);
    },
  });

  // -------------------------------------

  return (
    <>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
        }}
      >
        OR
      </Divider>
      <Stack spacing={1.25}>
        <Button className="google-auth-button" variant="outlined" fullWidth startIcon={<GoogleLogo color="#4285F4" />} onClick={() => googleLogin()}>
          Continue with Google
        </Button>
      </Stack>
    </>
  );
};

export default AuthSocial;
