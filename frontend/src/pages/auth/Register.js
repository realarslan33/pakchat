import { Box, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useSettings from "../../hooks/useSettings";
import PakistanFlag from "../../assets/icons/flags/flag_pk.svg";

import RegisterForm from "../../sections/auth/RegisterForm";
import AuthSocial from "../../sections/auth/AuthSocial";

const Register = () => {
  const { setColor, themeMode } = useSettings();
  const isDarkMode = themeMode === "dark";

  return (
    <Box className={`auth-page auth-page-register${isDarkMode ? " auth-page-dark" : ""}`} sx={{ color: "var(--auth-ink)", "--auth-orb-start": setColor.light, "--auth-orb-end": setColor.main, "--auth-page-tint": setColor.lighter }}>
      <Box className="auth-orb auth-orb-top" />
      <Box className="auth-orb auth-orb-bottom" />
      <Stack className="auth-content" spacing={3}>
        <Stack className="auth-brand" direction="row" alignItems="center" spacing={1}>
          <Box component="img" className="auth-brand-mark" src={PakistanFlag} alt="Pakistan flag" />
          <Typography fontWeight={800} letterSpacing="-0.04em">PakChat</Typography>
        </Stack>
        <Typography component="h1" className="auth-title">Create your account</Typography>
        <Box className="auth-card">
          <RegisterForm />
          <AuthSocial />
          <Typography className="auth-terms">
            By creating an account, you agree to our{" "}
            <Link to="/docs/tnc" component={RouterLink} underline="hover">Terms and Conditions</Link>.
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={0.75} sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">Already have an account?</Typography>
            <Link to="/auth/login" component={RouterLink} variant="body2">Sign in</Link>
          </Stack>
        </Box>
        <Typography className="auth-caption">Start conversations that bring people closer.</Typography>
      </Stack>
    </Box>
  );
};

export default Register;
