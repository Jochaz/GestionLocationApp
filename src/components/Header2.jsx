import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header2 = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h3"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "5px 0 0px 0", p:"0 5px -5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]} fontWeight="bold">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header2;
