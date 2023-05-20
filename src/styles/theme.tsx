import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f9fafc",
    },
    primary: {
      main: "#000000",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#656DF6",
    }
  },
  typography: {
    fontFamily: "Barlow, sans-serif",
    fontWeightBold: 900,
    fontSize: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          color: "#fff",
          backgroundColor: "#656DF6",
          borderColor: "#656DF6",
          fontSize: "1.125rem",
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: ".375rem",
          "&:hover": {
            backgroundColor: "#7c83f7",
            borderColor: "#747cf7",
          },
          "&:focus": {
            boxShadow: "0 0 0 0.25rem rgba(86, 93, 209, 0.5)",
          },
          "&:active": {
            backgroundColor: "#848af8",
            borderColor: "#747cf7",
            boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)",
          },
          "&:disabled": {
            color: "#000",
            backgroundColor: "#656DF6",
            borderColor: "#656DF6",
            opacity: 0.65,
          },
        },
      },
    },
  },
});

export default theme;
