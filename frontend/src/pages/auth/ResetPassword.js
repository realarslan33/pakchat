import { Box, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useSettings from "../../hooks/useSettings";
import PakistanFlag from "../../assets/icons/flags/flag_pk.svg";

import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setColor, themeMode } = useSettings();
  const isDarkMode = themeMode === "dark";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.get("code")) {
      navigate("/auth/forgot-password", { replace: true });
    }
  }, [location.search, navigate]);

  return (
    <Box
      className={`auth-page${isDarkMode ? " auth-page-dark" : ""}`}
      sx={{
        "--auth-orb-start": setColor.light,
        "--auth-orb-end": setColor.main,
        "--auth-page-tint": setColor.lighter,
      }}
    >
      <Box className="auth-orb auth-orb-top" />
      <Box className="auth-orb auth-orb-bottom" />
      <Stack className="auth-content" spacing={3}>
        <Stack className="auth-brand" direction="row" alignItems="center" spacing={1}>
          <Box component="img" className="auth-brand-mark" src={PakistanFlag} alt="Pakistan flag" />
          <Typography fontWeight={800} letterSpacing="-0.04em">
            PakChat
          </Typography>
        </Stack>
        <Box className="auth-card">
          <Stack spacing={1} sx={{ mb: 3, textAlign: "center" }}>
            <Typography component="h1" className="auth-title">
              Create a new password
            </Typography>
            <Typography className="auth-description">
              Choose a strong password you have not used before.
            </Typography>
          </Stack>
          <ResetPasswordForm />
          <Link
            component={RouterLink}
            to="/auth/login"
            className="auth-back-link"
            underline="hover"
          >
            Back to sign in
          </Link>
        </Box>
        <Typography className="auth-caption">
          Keep your account secure with a unique password.
        </Typography>
      </Stack>
    </Box>
  );
};

export default ResetPassword;
