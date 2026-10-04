import { Box, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useSettings from "../../hooks/useSettings";
import PakistanFlag from "../../assets/icons/flags/flag_pk.svg";

import VerifyForm, { EmailForm } from "../../sections/auth/VerifyForm";

const Verify = () => {
  const { setColor, themeMode } = useSettings();
  const isDarkMode = themeMode === "dark";

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
          <Typography fontWeight={800} letterSpacing="-0.04em">PakChat</Typography>
        </Stack>
        <Box className="auth-card">
          <Stack spacing={1} sx={{ mb: 3, textAlign: "center" }}>
            <Typography component="h1" className="auth-title">
              Verify your email
            </Typography>
            <Typography className="auth-description">
              Add your email, then enter the six-digit code we send you.
            </Typography>
          </Stack>
          <Stack spacing={2.5}>
            <EmailForm />
            <VerifyForm />
          </Stack>
          <Link
            component={RouterLink}
            to="/auth/login"
            className="auth-back-link"
            underline="hover"
          >
            Already verified? Sign in
          </Link>
        </Box>
        <Typography className="auth-caption">
          One quick step to secure your PakChat account.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Verify;
