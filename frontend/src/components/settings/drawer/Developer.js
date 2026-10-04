import { Box, Stack, Typography } from "@mui/material";

import PakistanFlag from "../../../assets/icons/flags/flag_pk.svg";

export default function Developer() {
  return (
    <Box
      width={"100%"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Stack direction={"column"} alignItems={"center"} spacing={2}>
        <Box
          component="img"
          src={PakistanFlag}
          alt="Pakistan flag"
          sx={{
            width: 90,
            height: 60,
            objectFit: "cover",
            pointerEvents: "none",
          }}
        />
        <Typography
          variant="caption"
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          PakChat
        </Typography>
      </Stack>
    </Box>
  );
}
