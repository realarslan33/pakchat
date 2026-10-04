import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Lottie from "react-lottie";
import useSettings from "../hooks/useSettings";

import Cat404 from "../assets/Illustration/Animations/Cat404.json";

const Page404 = () => {
  const { setColor, themeMode } = useSettings();
  const isDarkMode = themeMode === "dark";

  return (
    <Box
      className={`not-found-page${isDarkMode ? " not-found-page-dark" : ""}`}
      sx={{ "--not-found-tint": setColor.lighter, "--not-found-accent": setColor.main }}
    >
      <Stack className="not-found-card" spacing={1.5} alignItems="center">
        <Box className="not-found-illustration">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: Cat404,
              rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
            }}
            isClickToPauseDisabled
          />
        </Box>
        <Typography className="not-found-code">404</Typography>
        <Typography component="h1" variant="h5" fontWeight={700}>
          Page not found
        </Typography>
        <Typography className="not-found-description">
          We couldn’t find the page you were looking for.
        </Typography>
        <Button
          component={RouterLink}
          to="/app"
          variant="contained"
          sx={{ mt: 1, bgcolor: "#111", color: "#fff", borderRadius: 2, "&:hover": { bgcolor: "#303030" } }}
        >
          Back to chats
        </Button>
      </Stack>
    </Box>
  );
};

export default Page404;
