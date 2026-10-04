import { Box, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useSettings from "../../hooks/useSettings";
import PakistanFlag from "../../assets/icons/flags/flag_pk.svg";

import LoginForm from "../../sections/auth/LoginForm";
import AuthSocial from "../../sections/auth/AuthSocial";

const Login = () => {
  const { setColor, themeMode } = useSettings();
  const isDarkMode = themeMode === "dark";

  return (
    <Box className={`auth-page${isDarkMode ? " auth-page-dark" : ""}`} sx={{ color: "var(--auth-ink)", "--auth-orb-start": setColor.light, "--auth-orb-end": setColor.main, "--auth-page-tint": setColor.lighter }}>
      <Box className="auth-orb auth-orb-top" />
      <Box className="auth-orb auth-orb-bottom" />
      <Stack className="auth-content" spacing={3}>
        <Stack className="auth-brand" direction="row" alignItems="center" spacing={1}>
          <Box component="img" className="auth-brand-mark" src={PakistanFlag} alt="Pakistan flag" />
          <Typography fontWeight={800} letterSpacing="-0.04em">PakChat</Typography>
        </Stack>
        <Typography component="h1" className="auth-title">Good to see you again</Typography>
        <Box className="auth-card">
          <LoginForm />
          <AuthSocial />
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
            <Link to="/auth/register" component={RouterLink} variant="body2">Create an account</Link>
            <Link to="/auth/forgot-password" component={RouterLink} variant="body2">Forgot password?</Link>
          </Stack>
        </Box>
        <Typography className="auth-caption">A friendly place to chat and connect in real time.</Typography>
      </Stack>
    </Box>
  );
};

export default Login;
