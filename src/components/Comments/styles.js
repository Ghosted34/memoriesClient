import { makeStyles } from "@mui/styles";
export default makeStyles(() => ({
  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
  },

  commentsInnerContainer: {
    height: "200px",
    overflowY: "auto",
    marginRight: "30px",
    width: "75%",
  },
}));
