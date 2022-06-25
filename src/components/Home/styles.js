import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  textField: {
    margin: `${theme.spacing(1)} !important`,
  },

  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem !important",
    display: "flex !important",
    padding: "16px !important",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem !important",
    padding: "16px !important",
  },

  searchButton: {
    margin: `${theme.spacing(1)} !important`,
    marginBottom: "10px",
  },

  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse !important",
    },
  },
}));
