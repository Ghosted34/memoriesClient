import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@mui/material";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";

import { createNewPost, updatedPost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const posts = useSelector((state) =>
    currentId ? state.posts.post.find((post) => post._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (posts) setPostData(posts);
  }, [posts]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      if (!currentId) {
        dispatch(
          createNewPost({ ...postData, name: user?.result?.name }, navigate)
        );
      } else {
        dispatch(
          updatedPost(currentId, { ...postData, name: user?.result?.name })
        );
      }
      clear();
    } catch (error) {
      console.error(error);
    }
  };

  const classes = useStyles();

  //
  return user ? (
    <Paper className={classes.paper} width="2xl" elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
          }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          style={{ marginBottom: "10px" }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
        Please Sign In to create your Memories and interact with other memories.
      </Typography>
    </Paper>
  );
};

export default Form;
