import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const DocsLayout = () => {
  return (
    <Box className="auth-layout-content">
      <Outlet />
    </Box>
  );
};

export default DocsLayout;
