import { Stack, Typography } from "@mui/material";

import RemoteWorker from "../../assets/Illustration/RemoteWorker";

const GroupChat = () => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        width: "100%",
        height: { xs: "calc(100vh - 65px)", md: "100vh" },
        px: 2,
        overflow: "hidden",
      }}
    >
      <RemoteWorker />
      <Typography
        component={"h1"}
        variant="subtitle2"
        sx={{ mt: 1, textAlign: "center", flexShrink: 0 }}
      >
        Group-Chat will be available soon.
      </Typography>
    </Stack>
  );
};
export default GroupChat;

