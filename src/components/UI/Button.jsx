import { Button as MuiButton } from "@mui/material";
import React from "react";

const Button = ({ type = "button", children, onClick, ...rest }) => {
  return (
    <MuiButton type={type} onClick={onClick} {...rest}>
      {children}
    </MuiButton>
  );
};

export default Button;
