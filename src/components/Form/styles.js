import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material";
const theme = createTheme();

export default makeStyles(() => ({
  root: {
    "& .MuiTextField-root": {
      margin: `${theme.spacing(1)} !important`,
      width: "100%",
    },
  },
  paper: {
    padding: `${theme.spacing(2)} !important`,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "100% !important",
    margin: "10px 0 !important",
  },
  buttonSubmit: {
    marginBottom: "10px",
  },
}));
