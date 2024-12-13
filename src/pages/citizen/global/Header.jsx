import { Typography, Box, useTheme } from "@mui/material"; 
import { tokens } from "../../../theme";
import WelcomeBanner from "../Dashboard/WelcomeBanner"; // Import the WelcomeBanner component

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      {title === "DASHBOARD" ? (
        // Show the three-frame WelcomeBanner if on the dashboard
        <WelcomeBanner />
      ) : (
        // Default title and subtitle for other pages
        <>
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            {title}
          </Typography>
          <Typography variant="h5" color={colors.greenAccent[400]}>
            {subtitle}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default Header;
