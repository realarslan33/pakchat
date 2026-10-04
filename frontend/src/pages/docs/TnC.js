import { Box, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import useSettings from "../../hooks/useSettings";
import PakistanFlag from "../../assets/icons/flags/flag_pk.svg";

const TnC = () => {
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
          <Stack spacing={2}>
            <Typography component="h1" className="auth-title">
              Terms and Conditions
            </Typography>
            <Typography className="auth-description">
              The PakChat terms will be published here. Please check back soon.
            </Typography>
            <Link
              component={RouterLink}
              to="/auth/register"
              className="auth-back-link"
              underline="hover"
            >
              Return to account creation
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default TnC;
