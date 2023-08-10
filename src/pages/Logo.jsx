import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box>
      <Link to="/">
        <Box component="img" src="/icon_logo.png" alt="logo" style={{width:"100px"}}/>
      </Link>
    </Box>
  );
};

export default Logo;
